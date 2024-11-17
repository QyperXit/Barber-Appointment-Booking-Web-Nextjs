"use client";

import { useAppointmentParams } from './_hooks/useAppointmentParams.jsx';
import { AppointmentService } from './_services/appointmentService.jsx';
import { AppointmentProvider, useAppointment } from './_components/AppointmentContext.jsx';

const AppointmentCard = () => {
  const { id } = useAppointmentParams();
  const { message, loading, setMessage, setLoading } = useAppointment();

  const handleAppointmentAction = async (action) => {
    if (!id) {
      setMessage("Error: Appointment ID not found.");
      return;
    }

    setLoading(true);
    try {
      if (action === "reject") {
        await AppointmentService.rejectAppointment(id);
        setMessage("Appointment rejected successfully.");
      } else {
        await AppointmentService.confirmAppointment(id);
        setMessage("Appointment confirmed successfully.");
      }

      setTimeout(() => {
        window.location.href = "/appointments";
      }, 2000);
    } catch (error) {
      console.error("Error updating appointment status:", error);
      setMessage(`Error ${action}ing appointment. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Appointment Confirmation
        </h1>
        <p className="mb-6 text-gray-600">
          {loading ? "Processing..." : message}
        </p>
        <div className="flex space-x-4">
          <button
              onClick={() => handleAppointmentAction("confirmed")}
              className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline"
          >
            Confirm
          </button>
          <button
              onClick={() => handleAppointmentAction("reject")}
              className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline"
          >
            Reject
          </button>
        </div>
      </div>
  );
};

const ConfirmAppointmentPage = () => {
  return (
      <AppointmentProvider>
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
          <AppointmentCard />
        </div>
      </AppointmentProvider>
  );
};

export default ConfirmAppointmentPage;