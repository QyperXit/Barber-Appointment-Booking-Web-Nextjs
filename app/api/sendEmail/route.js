import EmailTemplate from "@/emails";
import BarberTemplate from "@/emails/barberEmail";
import { NextResponse } from "next/server";
import { Resend } from "resend";
// import { Email } from "./email";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req) {
  const response = await req.json();
  // console.log(response.data.doctor.attributes);

  try {
    const data = await resend.emails.send({
      //   from: "onboarding@resend.dev",
      from: "gbarbers@shotsbyvidz.com",
      //   to: "chaun.online@gmail.com",
      to: [response.data.Email],
      subject: "Appointment Booking Confirmation",
      //   text: "it works!",
      react: EmailTemplate({ response }),
    });

    try {
      const anotherData = await resend.emails.send({
        from: "gbarbers@shotsbyvidz.com",
        to: ["chaun.online@gmail.com"], // The other email address
        subject: "New Appointment Booked",
        react: BarberTemplate({ response }), // Use the different template
      });

      return NextResponse.json({ data, anotherData });
    } catch (anotherError) {
      return NextResponse.json({ data, anotherError });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
