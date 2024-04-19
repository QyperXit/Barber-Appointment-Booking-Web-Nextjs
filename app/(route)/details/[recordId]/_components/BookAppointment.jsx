import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { DialogClose } from "@radix-ui/react-dialog";
import { CalendarDays, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const BookAppointment = ({ doctor }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, SetTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  //gets user data from kinde
  const { user } = useKindeBrowserClient();

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

    for (let i = 1; i <= 8; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    SetTimeSlot(timeList);
  };

  const saveBooking = () => {
    const data = {
      data: {
        Username: user.given_name + " " + user.family_name,
        Email: user.email,
        Time: selectedTimeSlot,
        Date: date,
        doctor: doctor.id,
        // Note: note,
      },
    };

    GlobalApi.bookApointment(data).then((res) => {
      console.log(res);
      if (res) {
        // GlobalApi.sendEmail(data).then((res) => {});
        toast("Booking Confirmation Email sent!");
      }
    });
  };

  const isPastDay = (day) => {
    // return day < new Date();
    const today = new Date();
    // Set the time to midnight for both the current day and the provided day
    const todayMidnight = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const providedDayMidnight = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate()
    );
    // Check if the provided day is before today's midnight time
    return providedDayMidnight < todayMidnight;
  };

  return (
    <Dialog>
      <DialogTrigger className="flex">
        {" "}
        <Button className="mt-3 rounded-full w-fit">Book Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            <div>
              <div className="grid grid-cols-1 mt-5 md:grid-cols-2">
                {/* Calender */}
                <div className="flex flex-col items-baseline gap-3">
                  <h2 className="flex items-center gap-2 ">
                    <CalendarDays className="w-5 h-5 text-primary" />
                    Select Date
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={isPastDay}
                    className="border rounded-md"
                  />
                </div>
                {/* timeslot */}
                <div className="mt-3 md:mt-0">
                  <h2 className="flex items-center gap-2 mb-3 ">
                    <Clock className="w-5 h-5 text-primary" />
                    Select Time Slot
                  </h2>
                  <div className="grid grid-cols-3 gap-2 p-5 border rounded-lg">
                    {timeSlot?.map((item, index) => {
                      return (
                        <h2
                          key={item.id}
                          className={` p-2 border rounded-full text-center hover:bg-primary hover:text-white cursor-pointer ${
                            item.time == selectedTimeSlot &&
                            "bg-primary text-white"
                          }`}
                          onClick={() => setSelectedTimeSlot(item.time)}
                        >
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
        <DialogFooter className="flex-col-reverse gap-3 sm:justify-end sm:flex">
          <DialogClose asChild>
            <div className="flex gap-3 ">
              <Button
                type="button"
                className="text-gray-600 border "
                variant="outline"
                onClick={close}
              >
                Close
              </Button>
              <Button
                type="button"
                disabled={!(date && selectedTimeSlot)}
                onClick={() => saveBooking()}
              >
                Submit
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointment;
