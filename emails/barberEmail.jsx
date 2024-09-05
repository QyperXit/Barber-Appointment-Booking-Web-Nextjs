import moment from "moment/moment";

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
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://barber-appointment-booking-web-nextjs.vercel.app";

export const BarberTemplate = ({ response }) => (
  <Html>
    <Head />
    <Preview>The best Barber shop in Town.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="http://localhost:3000/barber.png"
          width="50"
          height="50"
          alt="G|Barber's"
          style={logo}
        />
        <Text style={paragraph}>Hi Mark,</Text>
        <Text style={paragraph}>
          We would like to inform you that a new appointment has been booked:
          <br />
          <br />
          <strong>Client Details</strong>: <br /> <br />
          Name: {response?.data?.Username} <br />
          Mobile: {response?.data?.Number} <br />
          Date: {moment(response?.data?.Date).format("DD-MMM-YYYY")} <br />
          Time: {response?.data?.Time}
          <br /> <br />
          <strong>Our address is</strong>:
          <br /> G|barbers
          <br /> 401 Warwick Road Tesley Birmingham B11 2JR
        </Text>
        <Section style={btnContainer}>
          <Button
            style={button}
            href="https://barber-appointment-booking-web-nextjs.vercel.app/"
          >
            Get started
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
);

export default BarberTemplate;

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
