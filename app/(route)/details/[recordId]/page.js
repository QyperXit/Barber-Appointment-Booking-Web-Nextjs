"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";
import DoctorDetail from "./_components/DoctorDetail";
import DoctorSugesstions from "./_components/DoctorSugesstions";

const Details = ({ params }) => {
  const [doctor, setDoctor] = useState();

  useEffect(() => {
    getDoctorById();
  }, []);

  const getDoctorById = () => {
    GlobalApi.getDoctorById(params.recordId).then((res) => {
      setDoctor(res.data);
      // console.log(res.data);
    });
  };
  return (
    <div className=" p-5 h-full md:px-10">
      <h2 className=" font-bold text-[22px]">Details</h2>
      <div className="grid  grid-cols-1  xl:grid-cols-4">
        {/* Doc Details */}
        <div className=" col-span-3 ">
          {doctor && <DoctorDetail doctor={doctor} />}
        </div>
        {/* doc sugesstions */}
        {/* <div></div> */}
        <div>{<DoctorSugesstions />}</div>
      </div>
    </div>
  );
};

export default Details;
