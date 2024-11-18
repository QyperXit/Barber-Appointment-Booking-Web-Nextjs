"use client";
import { useState, useEffect } from 'react';

export const useAppointmentParams = () => {
    const [params, setParams] = useState({ id: null, action: null });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setParams({
            id: urlParams.get("id"),
            action: urlParams.get("action")
        });
    }, []);

    return params;
};