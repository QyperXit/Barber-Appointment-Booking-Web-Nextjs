import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Note from "../app/(route)/details/[recordId]/_components/Note";

describe("Note Component", () => {
    let mockSetNote;

    beforeEach(() => {
        mockSetNote = jest.fn();
    });

    it("renders the 'Message' button and dialog is initially closed", () => {
        render(<Note note="" setNote={mockSetNote} />);

        // Verify button renders
        const messageButton = screen.getByRole("button", { name: /message/i });
        expect(messageButton).toBeInTheDocument();

        // Verify dialog content is not in the DOM initially
        expect(screen.queryByText(/Leave a note for your Barber/i)).not.toBeInTheDocument();
    });

    it("opens the dialog when the 'Message' button is clicked", () => {
        render(<Note note="" setNote={mockSetNote} />);

        // Click the message button
        const messageButton = screen.getByRole("button", { name: /message/i });
        fireEvent.click(messageButton);

        // Verify dialog opens
        expect(screen.getByText(/Leave a note for your Barber/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Leave a message for your barber so they know who you are/i)
        ).toBeInTheDocument();
    });

    it("allows entering and saving a note", () => {
        render(<Note note="" setNote={mockSetNote} />);

        // Open the dialog
        fireEvent.click(screen.getByRole("button", { name: /message/i }));

        // Enter a note
        const textarea = screen.getByRole("textbox");
        fireEvent.change(textarea, { target: { value: "Hello, Barber!" } });

        // Verify the note value is passed to setNote
        expect(mockSetNote).toHaveBeenCalledWith("Hello, Barber!");

        // Click 'Save changes' button
        const saveButton = screen.getByRole("button", { name: /save changes/i });
        fireEvent.click(saveButton);

        // Verify dialog closes
        expect(screen.queryByText(/Leave a note for your Barber/i)).not.toBeInTheDocument();
    });

    it("closes the dialog without saving when clicking outside the dialog", () => {
        render(<Note note="Existing note" setNote={mockSetNote} />);

        // Open the dialog
        fireEvent.click(screen.getByRole("button", { name: /message/i }));

        // Click 'Save changes' button
        fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

        // Verify dialog closes
        expect(screen.queryByText(/Leave a note for your Barber/i)).not.toBeInTheDocument();
    });
});
