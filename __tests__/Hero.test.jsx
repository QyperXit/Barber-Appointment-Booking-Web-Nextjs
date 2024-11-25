import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '../app/_components/Hero';

// Create a mock directory structure that matches your imports
jest.mock('@/components/ui/button', () => {
    return {
        Button: ({ children, className, ...props }) => (
            <button data-testid="mock-button" className={className} {...props}>
                {children}
            </button>
        ),
    };
});

// Mock next/link
jest.mock('next/link', () => {
    return {
        __esModule: true,
        default: ({ children, href }) => (
            <a href={href}>{children}</a>
        ),
    };
});

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, className, ...props }) => (
            <div className={className} {...props}>{children}</div>
        ),
    },
}));

describe('Hero Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<Hero />);
    });

    it('displays the main heading', () => {
        render(<Hero />);
        expect(screen.getByText('Best Barber Shop in Town | Birmingham')).toBeInTheDocument();
    });

    it('displays the location subheading', () => {
        render(<Hero />);
        expect(screen.getByText('Birmingham | BHX | Tesley')).toBeInTheDocument();
    });

    it('renders the booking button with correct text', () => {
        render(<Hero />);
        const button = screen.getByText('BOOK AN APPOINTMENT');
        expect(button).toBeInTheDocument();
    });

    it('contains a link to the details page with correct ID', () => {
        render(<Hero />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/details/7');
    });
});