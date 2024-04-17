import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* md:px-20 lg:mx-auto */}
        <div className=" lg:mx-auto   max  min-h-screen">
          <Header />
          {children}
          <Toaster />
        </div>
        <Footer />
      </body>
    </html>
  );
}
