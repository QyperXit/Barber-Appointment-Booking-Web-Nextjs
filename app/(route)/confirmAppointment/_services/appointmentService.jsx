import GlobalApi from "../../../_utils/GlobalApi";

export class AppointmentService {
    static async confirmAppointment(id) {
        const appointment = await GlobalApi.getAppointmentById(id);
        await GlobalApi.updateAppointmentStatus(id, 'confirmed');

        const emailData = {
            data: {
                Email: appointment?.data?.attributes?.Email,
                Username: appointment?.data?.attributes?.Username,
                Time: appointment?.data?.attributes?.Time,
                doctor: appointment?.data?.attributes?.doctor,
                Date: appointment?.data?.attributes?.Date,
                Number: appointment?.data?.attributes?.Number,
                status: "confirmed",
                id: id,
            },
        };

        await GlobalApi.sendEmail(emailData);
    }

    static async rejectAppointment(id) {
        await GlobalApi.DeleteBooking(id);
    }
}