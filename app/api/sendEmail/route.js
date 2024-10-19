import EmailTemplate from "@/emails";
import BarberConfirmationTemplate from "@/emails/BarberConfirmationTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const response = await req.json();
    const bookingId = response?.data?.data?.id || null;
    const otherId = response?.bookingId || null;
    const emailData = response;

    console.log(
      "Before sending email - bookingId:",
      bookingId,
      "otherId:",
      otherId,
      "test",
      emailData.data
    );

    let emailResponse;

    if (emailData.data.status === "confirmed") {
      emailResponse = await resend.emails.send({
        from: "gbarbers@shotsbyvidz.com",
        to: [response.data.Email],
        subject: "Appointment Booking Confirmation",
        react: EmailTemplate({ response }),
      });
    } else {
      emailResponse = await resend.emails.send({
        from: "gbarbers@shotsbyvidz.com",
        to: [response.data.Email],
        subject: "Appointment Booking Confirmation",
        react: BarberConfirmationTemplate({
          response,
          bookingId,
          otherId,
        }),
      });
    }

    return NextResponse.json({ success: true, data: emailResponse });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}