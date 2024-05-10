"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect, useState } from "react";

import ScheduleList from "./_components/ScheduleList";

const Appointments = () => {
  const { user } = useKindeBrowserClient();
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    user && getAppointments();
  }, [user]);

  const getAppointments = () => {
    GlobalApi.getAppointments().then((res) => {
      //   console.log(res.data);
      setBookingList(res.data);
    });
  };

  return (
    <div className=" px-4 sm:px-10 mt-10 h-full max-w-[85rem] mx-auto">
      <h2 className="text-2xl font-bold ">Up Coming Scheules</h2>
      <hr className="my-5" />
      <Tabs defaultValue="upcoming" className="w-full mt-5 ">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <ScheduleList
            bookingList={bookingList}
            updateRecord={() => getAppointments()}
          />
        </TabsContent>
        <TabsContent value="expired">
          <ScheduleList
            updateRecord={() => getAppointments()}
            bookingList={bookingList}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Appointments;
