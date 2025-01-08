import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '../app/(auth)/invite-link/[[...invite-link]]/page';

// Mock the Clerk hooks
jest.mock('@clerk/nextjs', () => ({
    useSignUp: jest.fn(),
    useUser: jest.fn()
}));

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(),
    useRouter: jest.fn()
}));

// Import the mocked modules
import { useSignUp, useUser } from '@clerk/nextjs';
import { useSearchParams, useRouter } from 'next/navigation';

describe('Signup Page Component', () => {
    // Setup common mocks
    const mockPush = jest.fn();
    const mockSetActive = jest.fn();
    const mockSignUpCreate = jest.fn();

    beforeEach(() => {
        // Reset all mocks
        jest.clearAllMocks();

        // Mock router
        useRouter.mockImplementation(() => ({
            push: mockPush
        }));

        // Mock search params with a valid token
        useSearchParams.mockImplementation(() => ({
            get: jest.fn().mockReturnValue('mock-token')
        }));

        // Mock useUser hook
        useUser.mockImplementation(() => ({
            user: null,
            isLoaded: true
        }));

        // Mock useSignUp hook
        useSignUp.mockImplementation(() => ({
            isLoaded: true,
            signUp: {
                create: mockSignUpCreate
            },
            setActive: mockSetActive
        }));
    });

    it('renders the signup form when token is present', () => {
        render(<Page />);

        expect(screen.getByText(/create your account/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });

    it('shows error when token is missing', () => {
        useSearchParams.mockImplementation(() => ({
            get: jest.fn().mockReturnValue(null)
        }));

        render(<Page />);

        expect(screen.getByText(/no invitation token found/i)).toBeInTheDocument();
    });

    it('shows loading state when Clerk is not loaded', () => {
        useSignUp.mockImplementation(() => ({
            isLoaded: false
        }));

        render(<Page />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('redirects to home if user is already logged in', () => {
        // Mock window.location.href setter
        const oldWindowLocation = window.location;
        delete window.location;
        window.location = { href: '' };

        useUser.mockImplementation(() => ({
            user: { id: 'test-user-id' },
            isLoaded: true
        }));

        render(<Page />);

        expect(window.location.href).toBe('/');

        // Cleanup
        window.location = oldWindowLocation;
    });

    it('handles successful signup', async () => {
        mockSignUpCreate.mockResolvedValue({
            status: 'complete',
            createdSessionId: 'test-session-id'
        });

        render(<Page />);

        // Fill in the form
        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: 'testuser' }
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password123' }
        });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

        await waitFor(() => {
            expect(mockSignUpCreate).toHaveBeenCalledWith({
                strategy: 'ticket',
                ticket: 'mock-token',
                username: 'testuser',
                password: 'password123'
            });
        });

        expect(mockSetActive).toHaveBeenCalledWith({
            session: 'test-session-id'
        });
    });

    it('handles signup error', async () => {
        const errorMessage = 'Invalid credentials';
        mockSignUpCreate.mockRejectedValue(new Error(errorMessage));

        render(<Page />);

        // Fill in the form
        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: 'testuser' }
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password123' }
        });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    });

    it('validates required fields', async () => {
        render(<Page />);

        // Submit empty form
        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

        await waitFor(() => {
            expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
        });
    });

    it('disables form submission while submitting', async () => {
        // Mock a delayed signup response
        mockSignUpCreate.mockImplementation(() =>
            new Promise(resolve => setTimeout(resolve, 100))
        );

        render(<Page />);

        // Fill in the form
        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: 'testuser' }
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'password123' }
        });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

        // Check loading state
        expect(screen.getByRole('button', { name: /signing up/i })).toBeDisabled();
        expect(screen.getByLabelText(/username/i)).toBeDisabled();
        expect(screen.getByLabelText(/password/i)).toBeDisabled();
    });
});