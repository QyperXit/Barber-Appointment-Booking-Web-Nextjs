import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarDays } from "lucide-react";
import React, { useState } from "react";

const BookAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, SetTimeSlot] = useState();

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }

    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    SetTimeSlot(timeList);
  };

  return (
    <Dialog>
      <DialogTrigger className="flex">
        {" "}
        <Button className=" mt-3 rounded-full w-fit">Book Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            <div>
              <div className=" grid grid-cols-1 mt-5 md:grid-cols-2">
                {/* Calender */}
                <div className="flex flex-col gap-3 items-baseline">
                  <h2 className=" flex gap-2 items-center">
                    <CalendarDays className=" text-primary h-5 w-5" />
                    Select Date
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                {/* timeslot */}
                <div></div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointment;
