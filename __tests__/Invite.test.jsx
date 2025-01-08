import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InvitationForm from '../app/(route)/invite/page';

// Mock the fetch function
global.fetch = jest.fn();

describe('InvitationForm Component', () => {
    // Reset all mocks before each test
    beforeEach(() => {
        fetch.mockClear();
        jest.clearAllMocks();
    });

    it('renders the invitation form with all elements', () => {
        render(<InvitationForm />);

        // Check for main elements
        expect(screen.getByRole('heading', { name: /invite a new user/i })).toBeInTheDocument();
        expect(screen.getByText(/send an invitation email to a new client/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /send invitation/i })).toBeInTheDocument();
    });

    it('allows entering an email address', () => {
        render(<InvitationForm />);

        const emailInput = screen.getByRole('textbox');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        expect(emailInput.value).toBe('test@example.com');
    });

    it('shows loading state when submitting', async () => {
        // Mock a delayed response
        fetch.mockImplementationOnce(() =>
            new Promise(resolve => setTimeout(() => resolve({
                ok: true,
                json: () => Promise.resolve({ message: 'Success' })
            }), 100))
        );

        render(<InvitationForm />);

        const emailInput = screen.getByRole('textbox');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        const submitButton = screen.getByRole('button');
        fireEvent.click(submitButton);

        // Check for loading state
        expect(screen.getByText(/sending/i)).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeDisabled();
    });

    it('handles successful submission', async () => {
        // Mock successful response
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: 'Success' })
            })
        );

        render(<InvitationForm />);

        const emailInput = screen.getByRole('textbox');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        const submitButton = screen.getByRole('button');
        fireEvent.click(submitButton);

        // Wait for success message
        await waitFor(() => {
            expect(screen.getByText(/invitation sent successfully!/i)).toBeInTheDocument();
        });

        // Check if email input was cleared
        expect(emailInput.value).toBe('');
    });

    it('handles submission error', async () => {
        const errorMessage = { error: 'Failed to send invitation' };

        // Mock error response
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve(errorMessage)
            })
        );

        render(<InvitationForm />);

        const emailInput = screen.getByRole('textbox');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        const submitButton = screen.getByRole('button');
        fireEvent.click(submitButton);

        // Wait for error message
        await waitFor(() => {
            expect(screen.getByText(JSON.stringify(errorMessage))).toBeInTheDocument();
        });
    });

    it('handles network error', async () => {
        const networkError = new Error('Network error');

        // Mock network error
        fetch.mockImplementationOnce(() => Promise.reject(networkError));

        render(<InvitationForm />);

        const emailInput = screen.getByRole('textbox');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        const submitButton = screen.getByRole('button');
        fireEvent.click(submitButton);

        // Wait for error message
        await waitFor(() => {
            expect(screen.getByText('Network error')).toBeInTheDocument();
        });
    });
});