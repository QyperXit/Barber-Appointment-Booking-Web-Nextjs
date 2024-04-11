import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { default as BookingList } from "./_components/BookingList";

const MyBooking = () => {
  return (
    <div className=" px-4 sm:px-10 mt-10 h-full">
      <h2 className=" font-bold text-2xl">My Booking</h2>
      <Tabs defaultValue="upcoming" className="w-full mt-5">
        <TabsList className=" w-full justify-start">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <BookingList />
        </TabsContent>
        <TabsContent value="expired">
          <BookingList />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default MyBooking;
