import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import moment from "moment/moment";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import CancelAppointment from "./CancelAppointment";

const BookingList = ({ bookingList, expired, updateRecord }) => {
  const onDeleteBooking = (item) => {
    GlobalApi.DeleteBooking(item.id).then((res) => {
      if (res) {
        toast("Appointment Cancelled Successfully!");
        updateRecord();
      }
    });
  };

  const limitedBookingList = bookingList.slice(0, 5);

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
                  width={100}
                  height={100}
                  alt="doctor-image"
                  className="rounded-full h-[70px] w-[70px] object-cover"
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
                    {item.attributes.Time}{" "}
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
