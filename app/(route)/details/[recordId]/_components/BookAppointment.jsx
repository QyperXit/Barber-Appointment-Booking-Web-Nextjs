// components/BookAppointment.jsx
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
import { useUser } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";
import { CalendarDays, Clock, PhoneCallIcon, Loader2 } from "lucide-react";
import React from "react";
import Note from "@/app/(route)/details/[recordId]/_components/Note";
import { useBookingForm } from "./hooks/useBookingForm";
import timeSlotService from "./services/timeSlotService";

const BookAppointment = ({
                           barber,
                           buttonText = "Book Appointment",
                           className = "",
                         }) => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false); // Loading state


  const {
    date,
    setDate,
    timeSlot,
    selectedTimeSlot,
    setSelectedTimeSlot,
    fone,
    setFone,
    note,
    setNote,
    handleSubmit,
    getBookedAppointmentsForDate,
    isValidForm,
  } = useBookingForm(barber, user);

  const bookedAppointmentsForDate = getBookedAppointmentsForDate();


  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    try {
      await handleSubmit();
      setIsOpen(false);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className={`mt-3 rounded-full w-fit ${className}`}>
            {buttonText}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription asChild>
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
                      disabled={timeSlotService.isPastDay}
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
                              onClick={() => !isBooked && setSelectedTimeSlot(item.time)}
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
                  <Note setNote={setNote} note={note} />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <div className="flex gap-3 w-full">
              <DialogClose asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1 text-gray-600 border"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                  type="button"
                  disabled={!isValidForm || isSubmitting}
                  onClick={handleFormSubmit}
                  className={`flex-1 ${
                      isSubmitting ? "bg-green-600 hover:bg-green-700" : ""
                  }`}
              >
                {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </div>
                ) : (
                    "Submit"
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
};

export default BookAppointment;