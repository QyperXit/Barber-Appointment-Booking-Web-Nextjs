// hooks/useBookingForm.js
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

import bookingService from '../services/bookingService';
import timeSlotService from '../services/timeSlotService';
import moment from 'moment';

export const useBookingForm = (doctor, user) => {
    const [date, setDate] = useState(new Date());
    const [timeSlot, setTimeSlot] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState();
    const [fone, setFone] = useState("");
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [note, setNote] = useState("");
    const { toast } = useToast();

    useEffect(() => {
        updateTimeSlots();
        fetchBookedAppointments();
    }, [date]);

    const updateTimeSlots = () => {
        const slots = timeSlotService.generateTimeSlots(date);
        setTimeSlot(slots);
    };

    const fetchBookedAppointments = async () => {
        try {
            const appointments = await bookingService.getAppointments();
            setBookedAppointments(appointments);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error fetching appointments",
                description: "Please try again later",
            });
        }
    };

    const handleSubmit = async () => {
        const bookingData = {
            data: {
                Username: user.username,
                Email: user.emailAddresses[0]?.emailAddress,
                Time: selectedTimeSlot,
                Date: date,
                doctor: doctor.id,
                Number: fone,
                status: "pending",
                Note: note,
            },
        };

        try {
            const isTaken = bookingService.isBookingTaken(
                bookedAppointments,
                date,
                selectedTimeSlot
            );

            if (isTaken) {
                toast({
                    variant: "destructive",
                    title: "This time slot is already booked.",
                    description: "Try another slot",
                    action: <ToastAction altText="Try again">❕</ToastAction>,
                });
                return;
            }

            await bookingService.createBooking(bookingData);
            toast({
                title: "Booking Confirmation!",
                description: "Email sent!",
                action: <ToastAction altText="Thank you">✅</ToastAction>,
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error creating booking",
                description: "Please try again later",
            });
        }
    };

    const getBookedAppointmentsForDate = () => {
        const allBookedAppointments = bookedAppointments.flatMap(
            (appointment) => appointment.attributes
        );
        const formattedDate = moment(date).format("YYYY-MM-DD");
        return allBookedAppointments.filter(
            (booking) => moment(booking.Date).format("YYYY-MM-DD") === formattedDate
        );
    };

    const isValidForm = date && selectedTimeSlot && fone.length === 11 && note;

    return {
        date,
        setDate,
        timeSlot,
        selectedTimeSlot,
        setSelectedTimeSlot,
        fone,
        setFone,
        note,
        setNote,
        handleSubmit,
        getBookedAppointmentsForDate,
        isValidForm,
    };
};