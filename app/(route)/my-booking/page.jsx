"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect, useState } from "react";
import { default as BookingList } from "./_components/BookingList";

const MyBooking = () => {
  const { user } = useKindeBrowserClient();
  const [bookingList, setBookigList] = useState([]);

  useEffect(() => {
    if (user) {
      getUserBookingList();
    }
  }, [user]);

  const getUserBookingList = () => {
    GlobalApi.getUserBookingList(user?.email).then((res) => {
      setBookigList(res.data.data);
    });
  };

  /**
   * Filter bookings
   * @param {*} type
   * @returns
   */
  const filterUserBooking = (type) => {
    const result = bookingList.filter((item) =>
      type == "upcoming"
        ? new Date(item.attributes.Date) >= new Date()
        : new Date(item.attributes.Date) <= new Date()
    );

    return result;
  };
  return (
    <div className=" px-4 sm:px-10 mt-10 h-full">
      <h2 className=" font-bold text-2xl">My Booking</h2>
      <Tabs defaultValue="upcoming" className="w-full mt-5">
        <TabsList className=" w-full justify-start">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <BookingList
            bookingList={filterUserBooking("upcoming")}
            updateRecord={() => getUserBookingList()}
            expired={false}
          />
        </TabsContent>
        <TabsContent value="expired">
          <BookingList
            bookingList={filterUserBooking("expired")}
            updateRecord={() => getUserBookingList()}
            expired={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default MyBooking;
