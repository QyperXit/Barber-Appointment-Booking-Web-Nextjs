import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, MapPin } from "lucide-react";
import moment from "moment/moment";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import CancelAppointment from "./CancelAppointment";

const BookingList = ({ bookingList, expired, updateRecord, isLoading }) => {
  const onDeleteBooking = (item) => {
    GlobalApi.DeleteBooking(item.id).then((res) => {
      if (res) {
        toast("Appointment Cancelled Successfully!");
        updateRecord();
      }
    });
  };

  const limitedBookingList = bookingList.slice(0, 5);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 p-5 m-3 overflow-y-auto text-white rounded-lg h-lvh">
        <div className="flex items-center space-x-4">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[450px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        </div>
        {/* Add more Skeleton components as needed */}
        <div className="flex items-center space-x-4">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[450px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-5 m-3 overflow-y-auto text-white rounded-lg h-lvh">
      {limitedBookingList &&
        limitedBookingList.map((item, index) => (
          <div key={index} className="flex items-center gap-4 p-5 border">
            {item?.attributes?.doctor?.data?.attributes?.Image?.data?.attributes
              ?.url && (
              <>
                <Image
                  src={
                    item.attributes.doctor.data.attributes.Image.data.attributes
                      .url
                  }
                  width={70}
                  height={70}
                  alt="barber-image"
                  className="object-cover rounded-full aspect-square"
                />
                <div className="flex flex-col w-full gap-2 ">
                  <h2 className="font-bold text-[18px] flex items-center justify-between ">
                    {item.attributes.doctor.data.attributes.Name}
                    {!expired && (
                      <CancelAppointment
                        onContinueClick={() => onDeleteBooking(item)}
                      />
                    )}
                  </h2>
                  <h2 className="flex gap-2 text-gray-500">
                    <MapPin className="w-5 h-5 text-primary" />{" "}
                    {item.attributes.doctor.data.attributes.Address}
                  </h2>
                  <h2 className="flex gap-2">
                    <Calendar className="w-5 h-5 text-primary" /> Appoint On:{" "}
                    {moment(item.attributes.Date).format("DD-MMM-YYYY")}
                  </h2>
                  <h2 className="flex gap-2">
                    <Clock className="w-5 h-5 text-primary" /> At Time:{" "}
                    <span className="text-green-400">
                      {item.attributes.Time}
                    </span>
                  </h2>
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default BookingList;
