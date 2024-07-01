import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="relative w-full h-screen mt-2">
      <div className="absolute inset-0 z-10 bg-gray-900 border-4 border-white opacity-50"></div>
      <div className="relative bg-[url('https://plus.unsplash.com/premium_photo-1661964421770-6b60b1678d62?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center w-full h-full  border-4 border-white">
        <motion.div
          className="z-20 flex flex-col items-center justify-center h-full font-medium text-center text-white font-times"
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <h1 className="z-20 text-3xl md:text-4xl lg:text-5xl text-shadow-blue-700">
            Best Barber Shop in Town | Birmingham
          </h1>
          <h1 className="z-20 mt-10 text-xl fontse text-shadow-blue-700">
            Birmingham | BHX | Tesley
          </h1>
          <Link href={`/details/${7}`} className="z-20">
            <Button className="z-20 mt-20 font-semibold border ">
              BOOK AN APPOINTMENT
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
