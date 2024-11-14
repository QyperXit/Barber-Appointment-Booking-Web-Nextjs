import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import Footer from "./_components/Footer";
import Header from "./_components/Header";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "G|Barbers",
  description: "Generated by Shaun",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* md:px-20 lg:mx-auto */}
          <div className="min-h-screen lg:mx-auto max">
            <Header />
            {children}
            <Toaster />
          </div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
