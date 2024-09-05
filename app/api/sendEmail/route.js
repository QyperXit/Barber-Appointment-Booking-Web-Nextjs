import EmailTemplate from "@/emails";
import BarberTemplate from "@/emails/barberEmail";
import CancellationTemplate from "@/emails/CancellationEmail";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const response = await req.json();
  // console.log(response);

  try {
    const data = await resend.emails.send({
      from: "gbarbers@shotsbyvidz.com",
      to: [response.data.Email],
      subject: "Appointment Booking Confirmation",
      react: EmailTemplate({ response }),
    });

    let additionalEmailData = null;

    if (!response?.data?.data?.id) {
      additionalEmailData = await resend.emails.send({
        from: "gbarbers@shotsbyvidz.com",
        to: ["denisjazzy@yahoo.com"],
        subject: "New Appointment Booked",
        react: BarberTemplate({ response }),
      });
    } else if (response?.data?.data?.id) {
      additionalEmailData = await resend.emails.send({
        from: "gbarbers@shotsbyvidz.com",
        to: ["denisjazzy@yahoo.com"],
        subject: "Appointment Cancelled",
        react: CancellationTemplate({ response }),
      });
    }

    return NextResponse.json({ data, additionalEmailData });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
