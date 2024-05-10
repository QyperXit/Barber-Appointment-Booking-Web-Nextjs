"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect } from "react";
import ScheduleList from "./_components/ScheduleList";

const Appointments = () => {
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    user && getAppointments();
  }, [user]);

  const getAppointments = () => {
    GlobalApi.getAppointments().then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="p-10 text-white ">
      <h2 className="text-2xl font-bold ">Up Coming Scheules</h2>
      <hr className="my-5" />
      <Tabs defaultValue="upcoming" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <ScheduleList />
        </TabsContent>
        <TabsContent value="expired">
          <ScheduleList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Appointments;
