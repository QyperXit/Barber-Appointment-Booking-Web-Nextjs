"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import ScheduleList from "./ScheduleList";

import GlobalApi from "@/app/_utils/GlobalApi";

const Admin = () => {
  const { user } = useUser();

  const [bookingList, setBookingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDateBookings, setCurrentDateBookings] = useState([]);

  useEffect(() => {
    user && getAppointments();
  }, [user]);

  useEffect(() => {
    filterCurrentDateBookings();
  }, [bookingList]);

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
    const currentDate = moment().format("YYYY-MM-DD");
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

  return (
    <div className="px-4 sm:px-10 mt-10 h-full max-w-[85rem] mx-auto">
      <h2 className="text-2xl font-bold text-white">Upcoming Schedule</h2>
      <hr className="my-5" />
      <Tabs defaultValue={`day${0}`} className="w-full mt-5">
        <TabsList>
          {currentDateBookings.map((_, index) => (
            <TabsTrigger key={index} value={`day${index}`}>
              {moment().add(index, "days").format("ddd, MMM D")}
            </TabsTrigger>
          ))}
        </TabsList>
        {currentDateBookings.map((dayBookings, index) => (
          <TabsContent key={index} value={`day${index}`}>
            <ScheduleList
              bookingList={dayBookings}
              updateRecord={getAppointments}
              isLoading={isLoading}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Admin;
