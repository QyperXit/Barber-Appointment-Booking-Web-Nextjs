"use client";
import { useState, useEffect } from 'react';
import moment from 'moment';
import GlobalApi from "@/app/_utils/GlobalApi";

export const useBookings = (user) => {
    const [bookingList, setBookingList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentDateBookings, setCurrentDateBookings] = useState([]);

    const getAppointments = () => {
        setIsLoading(true);
        GlobalApi.getAppointments()
            .then((res) => {
                setBookingList(res.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const filterCurrentDateBookings = () => {
        const currentWeekBookings = [];
        for (let i = 0; i < 7; i++) {
            const date = moment().add(i, "days").format("YYYY-MM-DD");
            const bookingsForDate = bookingList.filter(
                (booking) =>
                    moment(booking.attributes.Date).format("YYYY-MM-DD") === date
            );

            bookingsForDate.sort((a, b) => {
                const aTime = moment(
                    `${a.attributes.Date} ${a.attributes.Time}`,
                    "YYYY-MM-DD HH:mm"
                );
                const bTime = moment(
                    `${b.attributes.Date} ${b.attributes.Time}`,
                    "YYYY-MM-DD HH:mm"
                );
                return aTime.diff(bTime);
            });
            currentWeekBookings.push(bookingsForDate);
        }
        setCurrentDateBookings(currentWeekBookings);
    };

    useEffect(() => {
        user && getAppointments();
    }, [user]);

    useEffect(() => {
        filterCurrentDateBookings();
    }, [bookingList]);

    return {
        currentDateBookings,
        isLoading,
        getAppointments
    };
};