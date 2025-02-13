import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";

const CancelAppointment = ({ onContinueClick }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className=" text-primary border-primary">
          Cancel <span className="hidden sm:block">&nbsp;Appointment</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Cancellation</AlertDialogTitle>
          <AlertDialogDescription>
            Please{" "}
            <span className="text-red-600 font-bold">
            contact your barber
          </span>{" "}
            to inform him about your cancellation. This action will only update your appointment status.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onContinueClick()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelAppointment;
