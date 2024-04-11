import { NextResponse } from "next/server";
import { Resend } from "resend";
import { Email } from "./email";

const resend = new Resend("re_123456789");
export async function POST(req) {
  const response = await req.son();

  try {
    const data = await resend.emails.send({
      from: "you@example.com",
      to: "user@gmail.com",
      subject: "hello world",
      react: <Email url="https://example.com" />,
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
