"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import React from "react";
import ScheduleList from "./ScheduleList";
import BookAppointment from "../../details/[recordId]/_components/BookAppointment";
import { useBookings } from "./_hooks/useBookings";

const Admin = () => {
  const { user } = useUser();
  const { currentDateBookings, isLoading, getAppointments } = useBookings(user);

  return (
      <div className="px-4 sm:px-10 mt-10 h-full max-w-[85rem] mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white w-fit">
            Upcoming Schedule
          </h2>

          <BookAppointment
              doctor={{}}
              buttonText="Bookings"
              className="mt-0 rounded"
          />
        </div>
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