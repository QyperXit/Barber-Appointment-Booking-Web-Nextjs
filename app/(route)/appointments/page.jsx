import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import ScheduleList from "./_components/ScheduleList";

const Appointments = () => {
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
        <TabsContent value="expired">Change your expired here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Appointments;
