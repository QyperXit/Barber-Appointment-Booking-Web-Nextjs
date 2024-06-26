import GlobalApi from "@/app/_utils/GlobalApi";
import { Calendar, Clock } from "lucide-react";
import moment from "moment/moment";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import barber from "../../../../public/barber.png";

import { Skeleton } from "@/components/ui/skeleton";
import CancelAppointment from "./CancelAppointment";

const ScheduleList = ({ bookingList, updateRecord, isLoading }) => {
  const onDeleteBooking = (item) => {
    GlobalApi.DeleteBooking(item.id).then((res) => {
      if (res) {
        toast("Appointment Cancelled Successfully!");
        updateRecord();
      }
    });
  };

  const isCurrentTime = (time) => {
    const now = moment();
    const appointmentTime = moment(time, "HH:mm");
    const timeDiff = appointmentTime.diff(now, "minutes");
    return timeDiff > 0 && timeDiff < 30;
  };

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
    <div className="flex flex-col gap-3 p-1 m-3 overflow-y-auto text-white rounded-lg md:p-5 h-lvh">
      {/* <h2 className="mb-3 text-xl font-bold">
        Slots Taken:&nbsp;
        <span className="text-lg font-normal ">
          {" "}
          22 / {bookingList.length}{" "}
        </span>
      </h2> */}
      {bookingList.length === 0 ? (
        <h2 className="mb-3 text-xl font-bold">No Slots Available</h2>
      ) : (
        <h2 className="mb-3 text-xl font-bold">
          Slots Booked:&nbsp;
          <span className="text-lg font-normal">
            {" "}
            22 / {bookingList.length}
          </span>
        </h2>
      )}
      {bookingList &&
        bookingList.map((item, index) => (
          <div
            key={index}
            // className="flex items-center w-full gap-5 p-3 border "
            className={`flex items-center w-full gap-5 p-3 border ${
              isCurrentTime(item.attributes.Time) ? "bg-gray-700" : ""
            }`}
          >
            <Image
              width={70}
              height={70}
              alt="logo-img"
              src={barber}
              className=" bg-slate-400  border-[1px] border-white  rounded-full h-[70px] w-[70px] "
            />

            <div className="flex flex-col w-full gap-2">
              <h2 className="font-bold text-[18px] flex  items-center justify-between ">
                {item.attributes.Username}
                <CancelAppointment
                  onContinueClick={() => onDeleteBooking(item)}
                />
              </h2>
              {item.attributes.Number && (
                <h2>
                  +44 {item.attributes.Number.slice(1, 4)}{" "}
                  {item.attributes.Number.slice(3, 7)}{" "}
                  {item.attributes.Number.slice(7, 10)}
                </h2>
              )}
              <h2 className=" text-[14px] text-gray-500">
                {item.attributes.Email}
              </h2>
              <h2 className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> Appoinment On:{" "}
                {moment(item.attributes.Date).format("DD-MMM-YYYY")}
              </h2>
              <h2 className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> At Time:{" "}
                <span className="text-green-400">{item.attributes.Time}</span>
              </h2>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ScheduleList;
