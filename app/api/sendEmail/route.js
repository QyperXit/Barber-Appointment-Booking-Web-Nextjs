import EmailTemplate from "@/emails";
import BarberConfirmationTemplate from "@/emails/BarberConfirmationTemplate";
import BarberTemplate from "@/emails/barberEmail";
import CancellationTemplate from "@/emails/CancellationEmail";

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const response = await req.json();
  // console.log(response);

  try {
    const bookingId = response?.data?.data?.id || null;
    const otherId = response?.bookingId || null;
    console.log(
      "Before sending email - bookingId:",
      bookingId,
      "otherId:",
      otherId
    );

    const data = await resend.emails.send({
      from: "gbarbers@shotsbyvidz.com",
      to: [response.data.Email],
      subject: "Appointment Booking Confirmation",
      // react: EmailTemplate({ response }),
      react: BarberConfirmationTemplate({
        response,
        bookingId,
        otherId,
      }),
    });

    let additionalEmailData = null;

    if (!response?.data?.data?.id) {
      additionalEmailData = await resend.emails.send({
        // from: "gbarbers@shotsbyvidz.com",
        to: ["chaun.online@gmail.com"],
        subject: "New Appointment Booked",
        react: BarberTemplate({ response }),
      });
    } else if (response?.data?.data?.id) {
      additionalEmailData = await resend.emails.send({
        // from: "gbarbers@shotsbyvidz.com",
        to: ["chaun.online@gmail.com"],
        subject: "Appointment Cancelled",
        react: CancellationTemplate({ response }),
        // react: BarberConfirmationTemplate({ response }),
      });
    }

    return NextResponse.json({ data, additionalEmailData });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
