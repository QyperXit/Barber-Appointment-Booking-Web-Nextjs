import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookAppointment from "../app/(route)/details/[recordId]/_components/BookAppointment";
import { useBookingForm } from "@/app/(route)/details/[recordId]/_components/hooks/useBookingForm";
import { useUser } from "@clerk/nextjs";

// Mock the hooks used by BookAppointment
jest.mock("../app/(route)/details/[recordId]/_components/hooks/useBookingForm", () => ({
    useBookingForm: jest.fn(),
}));

jest.mock("@clerk/nextjs", () => ({
    useUser: jest.fn(),
}));

describe("BookAppointment Component", () => {
    const mockBarber = { id: 1, name: "John Barber" };
    const mockUser = { id: "user_1", email: "test@example.com" };

    beforeEach(() => {
        useUser.mockReturnValue({ user: mockUser });

        useBookingForm.mockReturnValue({
            date: null,
            setDate: jest.fn(),
            timeSlot: [
                { time: "10:00 AM" },
                { time: "11:00 AM" },
                { time: "12:00 PM" },
            ],
            selectedTimeSlot: null,
            setSelectedTimeSlot: jest.fn(),
            fone: "",
            setFone: jest.fn(),
            note: "",
            setNote: jest.fn(),
            handleSubmit: jest.fn(),
            getBookedAppointmentsForDate: jest.fn(() => [{ Time: "11:00 AM" }]),
            isValidForm: true,
        });
    });

    it("renders the booking dialog with default props", () => {
        render(<BookAppointment barber={mockBarber} />);

        // Verify button renders
        const button = screen.getByText(/Book Appointment/i);
        expect(button).toBeInTheDocument();

        // Verify dialog is not visible initially
        const dialog = screen.queryByRole("dialog");
        expect(dialog).not.toBeInTheDocument();
    });

    it("opens the dialog when the button is clicked", () => {
        render(<BookAppointment barber={mockBarber} />);

        const button = screen.getByText(/Book Appointment/i);
        fireEvent.click(button);

        // Verify dialog opens
        const dialog = screen.getByRole("dialog");
        expect(dialog).toBeInTheDocument();

        // Check for date and time slot sections
        expect(screen.getByText(/Select Date/i)).toBeInTheDocument();
        expect(screen.getByText(/Select Time Slot/i)).toBeInTheDocument();
    });

    it("disables booked time slots and allows selecting available ones", () => {
        const mockSetSelectedTimeSlot = jest.fn();
        useBookingForm.mockReturnValueOnce({
            ...useBookingForm.mock.results[0].value,
            setSelectedTimeSlot: mockSetSelectedTimeSlot,
        });

        render(<BookAppointment barber={mockBarber} />);
        fireEvent.click(screen.getByText(/Book Appointment/i));

        // Verify time slots
        const availableSlot = screen.getByText("10:00 AM");
        const bookedSlot = screen.getByText("11:00 AM");

        // Booked time slot should not be clickable
        expect(bookedSlot).toHaveClass("cursor-not-allowed");
        fireEvent.click(bookedSlot);
        expect(mockSetSelectedTimeSlot).not.toHaveBeenCalled();

        // Available time slot should be clickable
        expect(availableSlot).not.toHaveClass("cursor-not-allowed");
        fireEvent.click(availableSlot);
        expect(mockSetSelectedTimeSlot).toHaveBeenCalledWith("10:00 AM");
    });

    it("validates the form and submits when valid", () => {
        const mockHandleSubmit = jest.fn();
        useBookingForm.mockReturnValueOnce({
            ...useBookingForm.mock.results[0].value,
            handleSubmit: mockHandleSubmit,
        });

        render(<BookAppointment barber={mockBarber} />);
        fireEvent.click(screen.getByText(/Book Appointment/i));

        // Click the submit button
        const submitButton = screen.getByText(/Submit/i);
        fireEvent.click(submitButton);

        // Ensure the form submit handler is called
        expect(mockHandleSubmit).toHaveBeenCalled();
    });
});
