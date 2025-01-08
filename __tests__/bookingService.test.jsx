import BookingService from "@/app/(route)/details/[recordId]/_components/services/bookingService";
import GlobalApi from "@/app/_utils/GlobalApi";

jest.mock("@/app/_utils/GlobalApi");

describe("BookingService", () => {
    describe("isBookingTaken", () => {
        it("should return true if the slot is taken", () => {
            const existingAppointments = [
                { attributes: { Date: "2025-01-06T12:00:00Z", Time: "10:00 AM" } },
            ];
            const selectedDate = new Date("2025-01-06T00:00:00Z");
            const selectedTime = "10:00 AM";
            expect(BookingService.isBookingTaken(existingAppointments, selectedDate, selectedTime)).toBe(true);
        });

        it("should return false if the slot is not taken", () => {
            const existingAppointments = [
                { attributes: { Date: "2025-01-06T12:00:00Z", Time: "10:00 AM" } },
            ];
            const selectedDate = new Date("2025-01-07T00:00:00Z");
            const selectedTime = "11:00 AM";
            expect(BookingService.isBookingTaken(existingAppointments, selectedDate, selectedTime)).toBe(false);
        });
    });

    describe("getAppointments", () => {
        it("should return appointment data on success", async () => {
            GlobalApi.getAppointments.mockResolvedValue({ data: [{ id: 1, name: "Test" }] });
            const result = await BookingService.getAppointments();
            expect(result).toEqual([{ id: 1, name: "Test" }]);
        });

        it("should throw an error on failure", async () => {
            GlobalApi.getAppointments.mockRejectedValue(new Error("API Error"));
            await expect(BookingService.getAppointments()).rejects.toThrow("API Error");
        });
    });

    describe("createBooking", () => {
        it("should create a booking and send email", async () => {
            const mockBookingData = { date: "2025-01-06", time: "10:00 AM" };
            GlobalApi.bookAppointment.mockResolvedValue({ data: { id: 123 } });
            GlobalApi.getAppointmentById.mockResolvedValue({ data: { id: 123, details: "Test" } });
            GlobalApi.sendEmail.mockResolvedValue({ success: true });

            const result = await BookingService.createBooking(mockBookingData);
            expect(GlobalApi.bookAppointment).toHaveBeenCalledWith(mockBookingData);
            expect(GlobalApi.sendEmail).toHaveBeenCalledWith({ ...mockBookingData, bookingId: 123 });
            expect(result).toEqual({ data: { id: 123, details: "Test" } });

        });

        it("should throw an error on failure", async () => {
            GlobalApi.bookAppointment.mockRejectedValue(new Error("Booking Error"));
            await expect(BookingService.createBooking({})).rejects.toThrow("Booking Error");
        });
    });
});
