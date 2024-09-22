import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import moment from "moment";
import React from "react";

const BarberConfirmationTemplate = ({ response, bookingId, otherId }) => (
  console.log(
    "In BarberConfirmationTemplate - bookingId:",
    bookingId,
    "otherId:",
    otherId
  ),
  (
    <Html>
      <Head />
      <Preview>New appointment pending confirmation</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://barber-appointment-booking-web-nextjs.vercel.app/barber.png"
            width="50"
            height="50"
            alt="G|Barber's"
            style={logo}
          />
          <Text style={paragraph}>Hi Mark,</Text>
          <Text style={paragraph}>
            A new appointment is pending your confirmation:
            <br />
            <br />
            <strong>Client Details</strong>: <br /> <br />
            Name: {response?.data?.Username} <br />
            Mobile: {response?.data?.Number} <br />
            Date: {moment(response?.data?.Date).format("DD-MMM-YYYY")} <br />
            Time: {response?.data?.Time}
          </Text>
          <Section style={btnContainer}>
            {/* <Text style={paragraph}>
              Booking ID: {bookingId || "No ID found"}
              Booking ID: {otherId || "No  other ID found"}
            </Text> */}

            <Button
              style={button}
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/confirmAppointment?id=${otherId}&action=confirmed`}
            >
              Confirm Appointment
            </Button>
            <Button
              style={Object.assign({}, button, { backgroundColor: "#FF0000" })}
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/confirmAppointment?id=${otherId}&action=rejected`}
            >
              Reject Appointment
            </Button>
          </Section>
          <Text style={paragraph}>
            Best regards,
            <br />
            The G|barbers Team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            G|Barbers 401 Warwick Road Tesley Birmingham B11 2JR
          </Text>
        </Container>
      </Body>
    </Html>
  )
);

export default BarberConfirmationTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center",
};

const button = {
  backgroundColor: "#0C7DFF",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
