import EmailTemplate from "@/emails";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { Email } from "./email";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req) {
  const response = await req.json();
  //   console.log(response);

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "chaun.online@gmail.com",
      subject: "Appointment Booking Confirmation",
      react: EmailTemplate({ response }),
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
