import EmailTemplate from "@/emails";
import { NextResponse } from "next/server";
import { Resend } from "resend";
// import { Email } from "./email";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req) {
  const response = await req.json();
  console.log(response.data.doctor.attributes);

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

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
