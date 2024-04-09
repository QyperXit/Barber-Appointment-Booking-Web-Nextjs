"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
      console.log(res.data.data);
      setDoctorList(res.data.data);
    });
  };
  return (
    <div>
      <Hero />
      <CatergorySearch />
      <DoctorList doctorList={doctorList} />
    </div>
  );
}
