"use client";
import { createContext, useContext, useState } from 'react';

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
    const [message, setMessage] = useState("Please confirm or reject the appointment.");
    const [loading, setLoading] = useState(false);

    return (
        <AppointmentContext.Provider value={{ message, setMessage, loading, setLoading }}>
            {children}
        </AppointmentContext.Provider>
    );
};

export const useAppointment = () => useContext(AppointmentContext);