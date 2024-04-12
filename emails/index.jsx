// import {
//   Body,
//   Button,
//   Container,
//   Head,
//   Hr,
//   Html,
//   Img,
//   Preview,
//   Section,
//   Text,
// } from "@react-email/components";
// import * as React from "react";

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "http://localhost:3000"; // Removed redundant "https://"

// export const EmailTemplate = ({ userFirstname = "NEW USER" }) => (
//   <Html>
//     <Head />
//     <Preview>
//       The sales intelligence platform that helps you uncover qualified leads.
//     </Preview>
//     <Body style={main}>
//       <Container style={container}>
//         <Img
//           src={`${baseUrl}/logo.svg`}
//           width="170"
//           height="50"
//           alt="Koala"
//           style={logo}
//         />
//         <Text style={paragraph}>Hi {userFirstname},</Text>
//         <Text style={paragraph}>
//           Welcome to Koala, the sales intelligence platform that helps you
//           uncover qualified leads and close deals faster.
//         </Text>
//         <Section style={btnContainer}>
//           <Button style={button} href="https://getkoala.com">
//             Get started
//           </Button>
//         </Section>
//         <Text style={paragraph}>
//           Best,
//           <br />
//           The Koala team
//         </Text>
//         <Hr style={hr} />
//         <Text style={footer}>
//           470 Noor Ave STE B #1148, South San Francisco, CA 94080
//         </Text>
//       </Container>
//     </Body>
//   </Html>
// );

// export default EmailTemplate; // Export EmailTemplate as default

// const main = {
//   backgroundColor: "#ffffff",
//   fontFamily:
//     '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
// };

// const container = {
//   margin: "0 auto",
//   padding: "20px 0 48px",
// };

// const logo = {
//   margin: "0 auto",
// };

// const paragraph = {
//   fontSize: "16px",
//   lineHeight: "26px",
// };

// const btnContainer = {
//   textAlign: "center",
// };

// const button = {
//   backgroundColor: "#5F51E8",
//   borderRadius: "3px",
//   color: "#fff",
//   fontSize: "16px",
//   textDecoration: "none",
//   textAlign: "center",
//   display: "block", // Added comma after "textAlign: "center""
//   padding: "12px",
//   margin: "0 auto",
//   width: "fit-content",
// };

// const hr = {
//   borderColor: "#cccccc",
//   margin: "20px 0",
// };

// const footer = {
//   color: "#8898aa",
//   fontSize: "12px",
// };
