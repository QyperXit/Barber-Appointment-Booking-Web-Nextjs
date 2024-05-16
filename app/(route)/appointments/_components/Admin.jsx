"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import ScheduleList from "./ScheduleList";

import GlobalApi from "@/app/_utils/GlobalApi";

const Admin = () => {
  const { user } = useKindeBrowserClient();
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
    const currentDateBookings = bookingList.filter(
      (booking) =>
        moment(booking.attributes.Date).format("YYYY-MM-DD") === currentDate
    );
    setCurrentDateBookings(currentDateBookings);
  };

  return (
    <div className=" px-4 sm:px-10 mt-10 h-full max-w-[85rem] mx-auto">
      <h2 className="text-2xl font-bold text-white ">Up Coming Schedule</h2>
      <hr className="my-5" />
      <Tabs defaultValue="upcoming" className="w-full mt-5 ">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <ScheduleList
            bookingList={currentDateBookings}
            updateRecord={() => getAppointments()}
            isLoading={isLoading}
          />
        </TabsContent>
        <TabsContent value="expired">
          <ScheduleList
            updateRecord={() => getAppointments()}
            bookingList={bookingList}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
