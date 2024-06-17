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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import moment from "moment/moment";

import { useUser } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";
import { CalendarDays, Clock, PhoneCallIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const BookAppointment = ({ doctor }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [fone, setFone] = useState("");
  const [bookedAppointments, setBookedAppointments] = useState([]);

  const { toast } = useToast();
  const { user } = useUser();

  useEffect(() => {
    getTime();
    fetchBookedAppointments();
  }, [date]);

  const getTime = () => {
    const timeList = [];
    const currentTime = new Date();
    const endTime = new Date();
    endTime.setHours(20); // Set the end time to 8:00 PM
    endTime.setMinutes(30); // Set the end time to 8:30 PM

    const selectedDate = new Date(date);
    const isNextDay = selectedDate > currentTime; // Check if selected date is after current date

    // If it's the next day or a future date, use the original time slots from 10:00 AM to 8:30 PM
    if (isNextDay) {
      for (let i = 10; i <= 20; i++) {
        timeList.push({ time: `${i.toString().padStart(2, "0")}:00` });
        timeList.push({ time: `${i.toString().padStart(2, "0")}:30` });
      }
    } else {
      // Find the next available time slot, starting from the next hour rounded up to the nearest half-hour mark
      const nextAvailableTime = new Date(currentTime);
      nextAvailableTime.setMinutes(
        nextAvailableTime.getMinutes() +
          (30 - (nextAvailableTime.getMinutes() % 30))
      );
      nextAvailableTime.setSeconds(0);
      nextAvailableTime.setMilliseconds(0);

      // Loop through each hour and minute until the end time, but only between 10:00 and 20:30
      for (
        let time = nextAvailableTime.getTime();
        time <= endTime.getTime() && new Date(time).getHours() >= 10;
        time += 30 * 60 * 1000
      ) {
        const formattedTime = new Date(time);
        timeList.push({
          time: formattedTime.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          }),
        });
      }
    }

    setTimeSlot(timeList);
  };

  const saveBooking = () => {
    const data = {
      data: {
        Username: user.username,
        Email: user.emailAddresses[0]?.emailAddress,
        Time: selectedTimeSlot,
        Date: date,
        doctor: doctor.id,
        Number: fone,
        // Note: note,
      },
    };

    GlobalApi.getAppointments().then((res) => {
      const existingAppointments = res.data;

      const isBookingTaken = existingAppointments.some((item) => {
        const existingDate = new Date(item.attributes.Date);
        const existingDateOnly = new Date(
          existingDate.getFullYear(),
          existingDate.getMonth(),
          existingDate.getDate()
        );

        const selectedDateOnly = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );

        return (
          existingDateOnly.getTime() === selectedDateOnly.getTime() &&
          item.attributes.Time === selectedTimeSlot
        );
      });

      if (isBookingTaken) {
        toast({
          variant: "destructive",
          title: "This time slot is already booked.",
          description: "Try another slot",
          action: <ToastAction altText="Try again">❕</ToastAction>,
        });
      } else {
        GlobalApi.bookApointment(data).then((res) => {
          if (res) {
            toast({
              title: "Booking Confirmation!",
              description: "Email sent!",
              action: <ToastAction altText="Thank you">✅</ToastAction>,
            });
          }
        });
      }
    });
  };

  const fetchBookedAppointments = async () => {
    try {
      const res = await GlobalApi.getAppointments();
      setBookedAppointments(res.data);
      if (res.error) {
        console.error("Error fetching booked appointments:", res.error);
      }
    } catch (error) {
      console.error("Error fetching booked appointments:", error);
    }
  };

  const allBookedAppointments = bookedAppointments.flatMap(
    (appointment) => appointment.attributes
  );
  const formattedDate = moment(date).format("YYYY-MM-DD");
  const bookedAppointmentsForDate = allBookedAppointments.filter(
    (booking) => moment(booking.Date).format("YYYY-MM-DD") === formattedDate
  );

  const isPastDay = (day) => {
    const today = new Date();
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
    return providedDayMidnight < todayMidnight;
  };

  return (
    <Dialog>
      <DialogTrigger className="flex">
        <Button className="mt-3 rounded-full w-fit">Book Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            <div>
              <div className="grid grid-cols-1 mt-5 md:grid-cols-2">
                <div className="flex flex-col items-baseline gap-3 max-xs:overflow-auto max-xs:h-[16em]">
                  <h2 className="flex items-center gap-2">
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
                <div className="mt-3 md:mt-0">
                  <h2 className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-primary" />
                    Select Time Slot
                  </h2>
                  <div className="grid grid-cols-3 gap-2 p-5 border rounded-lg max-sm:overflow-auto max-sm:h-[12em]">
                    {timeSlot?.map((item, index) => {
                      const isBooked = bookedAppointmentsForDate.some(
                        (booking) => booking.Time === item.time
                      );
                      return (
                        <h2
                          key={index}
                          className={`p-1 md:p-2 border rounded-full h-fit text-center cursor-pointer ${
                            isBooked
                              ? "bg-red-500 text-white cursor-not-allowed"
                              : item.time === selectedTimeSlot
                              ? "bg-primary text-white"
                              : "hover:bg-primary hover:text-white"
                          }`}
                          onClick={() =>
                            !isBooked && setSelectedTimeSlot(item.time)
                          }
                        >
                          {item.time}
                        </h2>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4 sm:mt-4 animate-pulse">
                  <PhoneCallIcon className="scale-75 text-primary" />
                  <input
                    type="text"
                    className="p-1 border rounded w-36 placeholder:text-primary placeholder:text-xs"
                    placeholder="Mobile Number"
                    inputMode="tel"
                    pattern="^\d{11}$"
                    title="Please enter exactly 11 digits"
                    maxLength="11"
                    value={fone}
                    required
                    onChange={(e) => setFone(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col-reverse gap-3 sm:justify-end sm:flex">
          <DialogClose asChild>
            <div className="flex gap-3">
              <Button
                type="button"
                className="text-gray-600 border"
                variant="outline"
                onClick={close}
              >
                Close
              </Button>
              <Button
                type="button"
                disabled={!(date && selectedTimeSlot && fone.length === 11)}
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
