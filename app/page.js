"use client";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BarberList from "./_components/BarberList";
import CatergorySearch from "./_components/CatergorySearch";
import DoctorList from "./_components/DoctorList";
import Hero from "./_components/Hero";
import GlobalApi from "./_utils/GlobalApi";

export default function Home() {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList = () => {
    GlobalApi.getDoctorList().then((res) => {
      setDoctorList(res.data.data);
    });
  };

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
      transition: { duration: 0.5 }, // Adjust duration as needed
    },
    out: {
      opacity: 0,
      transition: { duration: 0.3 }, // Adjust duration as needed
    },
  };
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          // key={pageProps.url}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
        >
          <Hero />
          {/* <CatergorySearch /> */}
          {/* <DoctorList doctorList={doctorList} /> */}
          <BarberList doctorList={doctorList} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
