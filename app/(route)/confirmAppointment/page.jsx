"use client";

import { useEffect, useState } from "react";
import GlobalApi from "../../_utils/GlobalApi";

const ConfirmAppointment = () => {
  const [id, setId] = useState(null);
  const [action, setAction] = useState(null);
  const [message, setMessage] = useState(
    "Please confirm or reject the appointment."
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setId(urlParams.get("id"));
    setAction(urlParams.get("action"));
  }, []);

  const handleAppointmentAction = async (action) => {
    if (!id) {
      setMessage("Error: Appointment ID not found.");
      return;
    }

    try {
      if (action === "reject") {
        // Call the DeleteBooking function for rejection
        await GlobalApi.DeleteBooking(id);
        setMessage("Appointment rejected successfully.");
      } else {
        // Confirming the appointment
        await GlobalApi.updateAppointmentStatus(id, action);
        setMessage("Appointment confirmed successfully.");
      }
      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = "/my-booking";
      }, 2000);
    } catch (error) {
      console.error("Error updating appointment status:", error);
      setMessage(`Error ${action}ing appointment. Please try again.`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Appointment Confirmation
        </h1>
        <p className="mb-6 text-gray-600">{message}</p>
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
    </div>
  );
};

export default ConfirmAppointment;
