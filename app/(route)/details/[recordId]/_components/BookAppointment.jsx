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
import { CalendarDays, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";

const BookAppointment = () => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, SetTimeSlot] = useState();

  useEffect(() => {
    getTime();
  }, []);

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
                <div className=" mt-3 md:mt-0">
                  <h2 className=" flex  gap-2 items-center mb-3">
                    <Clock className=" text-primary h-5 w-5" />
                    Select Time Slot
                  </h2>
                  <div className="grid grid-cols-3 gap-2 border rounded-lg p-5">
                    {timeSlot.map((item, index) => {
                      return (
                        <h2 className=" p-2 border rounded-full text-center hover:bg-primary hover:text-white cursor-pointer">
                          {item.time}
                        </h2>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointment;
