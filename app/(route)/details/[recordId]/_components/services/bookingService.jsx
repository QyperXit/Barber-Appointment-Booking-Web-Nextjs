// services/bookingService.js
import GlobalApi from "@/app/_utils/GlobalApi";

export class BookingService {
    async getAppointments() {
        try {
            const response = await GlobalApi.getAppointments();
            return response.data;
        } catch (error) {
            console.error("Error fetching appointments:", error);
            throw error;
        }
    }

    async createBooking(bookingData) {
        try {
            const response = await GlobalApi.bookApointment(bookingData);
            if (response) {
                const bookingDetails = await GlobalApi.getAppointmentById(response.data.id);
                await GlobalApi.sendEmail({ ...bookingData, bookingId: bookingDetails.data.id });
                return bookingDetails;
            }
        } catch (error) {
            console.error("Error creating booking:", error);
            throw error;
        }
    }

    isBookingTaken(existingAppointments, selectedDate, selectedTime) {
        return existingAppointments.some((item) => {
            const existingDate = new Date(item.attributes.Date);
            const existingDateOnly = new Date(
                existingDate.getFullYear(),
                existingDate.getMonth(),
                existingDate.getDate()
            );

            const selectedDateOnly = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate()
            );

            return (
                existingDateOnly.getTime() === selectedDateOnly.getTime() &&
                item.attributes.Time === selectedTime
            );
        });
    }
}

export default new BookingService();