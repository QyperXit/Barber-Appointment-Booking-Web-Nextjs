"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect, useState } from "react";
import ScheduleList from "./ScheduleList";

import GlobalApi from "@/app/_utils/GlobalApi";

const Admin = () => {
  const { user } = useKindeBrowserClient();
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        // Fetch data on server-side
        const res = await GlobalApi.getAppointments();
        setBookingList(res.data);
      }
    };

    fetchData();
  }, [user]);

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

export default Admin;
