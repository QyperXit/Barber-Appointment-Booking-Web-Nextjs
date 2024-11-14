"use client";
// import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
import BarberGallery from "./_components/BarberGallery";
import Hero from "./_components/Hero";
import GlobalApi from "./_utils/GlobalApi";

export default function Home() {
  const [barberList, setBarberList] = useState([]);

  useEffect(() => {
    getBarberList();
  }, []);

  const getBarberList = () => {
    GlobalApi.getBarberList().then((res) => {
      setBarberList(res.data.data);
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

          <BarberGallery barberList={barberList} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
