"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect, useState } from "react";

import { redirect, useRouter } from "next/navigation";

import ScheduleList from "./_components/ScheduleList";

const Appointments = () => {
  const { user } = useKindeBrowserClient();
  const [bookingList, setBookingList] = useState([]);
  const router = useRouter();

  console.log();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        if (user && user.id !== process.env.NEXT_PUBLIC_ID) {
          router.push("/");
        }
        // Fetch data on server-side
        const res = await GlobalApi.getAppointments();
        setBookingList(res.data);

        // Check permission on server-side (optional)
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

export default Appointments;
