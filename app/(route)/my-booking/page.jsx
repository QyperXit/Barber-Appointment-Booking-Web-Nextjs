"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@clerk/nextjs";

import React, { useEffect, useState } from "react";
import { default as BookingList } from "./_components/BookingList";

const MyBooking = () => {
  const { user } = useUser();

  const [bookingList, setBookigList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      getUserBookingList();
    }
  }, [user]);

  const getUserBookingList = () => {
    setIsLoading(true);
    GlobalApi.getUserBookingList(user.emailAddresses[0]?.emailAddress)
      .then((res) => {
        setBookigList(res.data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /**
   * Filter bookings
   * @param {*} type
   * @returns
   */
  const filterUserBooking = (type) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set current time to midnight
    const result = bookingList.filter((item) => {
      const bookingDate = new Date(item.attributes.Date);
      bookingDate.setHours(0, 0, 0, 0); // Set booking date time to midnight
      return type === "upcoming"
        ? bookingDate >= currentDate
        : bookingDate < currentDate;
    });

    return result;
  };
  return (
    <div className=" px-4 sm:px-10 mt-10 h-full max-w-[85rem] mx-auto">
      <h2 className="text-2xl font-bold ">My Booking</h2>
      <Tabs defaultValue="upcoming" className="w-full mt-5">
        <TabsList className="justify-start w-full ">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <BookingList
            bookingList={filterUserBooking("upcoming")}
            updateRecord={() => getUserBookingList()}
            expired={false}
            isLoading={isLoading}
          />
        </TabsContent>
        <TabsContent value="expired">
          <BookingList
            bookingList={filterUserBooking("expired")}
            updateRecord={() => getUserBookingList()}
            expired={true}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default MyBooking;
