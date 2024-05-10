import GlobalApi from "@/app/_utils/GlobalApi";
import { Calendar, Clock } from "lucide-react";
import moment from "moment/moment";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

import CancelAppointment from "./CancelAppointment";

const ScheduleList = ({ bookingList, updateRecord }) => {
  const onDeleteBooking = (item) => {
    GlobalApi.DeleteBooking(item.id).then((res) => {
      if (res) {
        toast("Appointment Cancelled Successfully!");
        updateRecord();
      }
    });
  };

  return (
    <div className="flex flex-col gap-3 p-5 m-3 overflow-y-auto text-white rounded-lg h-lvh">
      {bookingList &&
        bookingList.map((item, index) => (
          <div
            key={index}
            className="flex items-center w-full gap-5 p-3 border "
          >
            <Image
              width={70}
              height={70}
              //   alt="client-image"
              className=" bg-slate-400  border-[1px] border-white  rounded-full h-[70px] w-[70px] "
            />

            <div className="flex flex-col w-full gap-2">
              <h2 className="font-bold text-[18px] flex items-center justify-between ">
                {item.attributes.Username}
                <CancelAppointment
                  onContinueClick={() => onDeleteBooking(item)}
                />
              </h2>
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