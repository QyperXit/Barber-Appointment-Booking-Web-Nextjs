import EmailTemplate from "@/emails";
import BarberConfirmationTemplate from "@/emails/BarberConfirmationTemplate";
import CancellationTemplate from "@/emails/CancellationEmail";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const admin_email = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export async function POST(req) {
  try {
    const response = await req.json();
    const bookingId = response?.data?.data?.id || null;
    const otherId = response?.bookingId || null;
    const emailData = response;


    let emailResponse;

    if (emailData.data.status === "confirmed") {
      emailResponse = await resend.emails.send({
        from: "gbarbers@shotsbyvidz.com",
        to: [emailData.data.Email],
        subject: "Appointment Booking Confirmation",
        react: EmailTemplate({ response }),
      });
    } else if (emailData.delete) {
      emailResponse = await resend.emails.send({
        from: "gbarbers@shotsbyvidz.com",
        to: admin_email,
        subject: "Appointment Cancelled",
        react: CancellationTemplate({ response }),
      });
    } else if (!emailData.delete) {
      emailResponse = await resend.emails.send({
        from: "gbarbers@shotsbyvidz.com",
        to: admin_email,
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
