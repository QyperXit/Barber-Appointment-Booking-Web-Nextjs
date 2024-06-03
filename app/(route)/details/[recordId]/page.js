"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";
import BarberDetail from "./_components/BarberDetail";
import BarberSugesstions from "./_components/BarberSugesstions";

const Details = ({ params }) => {
  const [doctor, setDoctor] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDoctorById();
  }, []);

  const getDoctorById = () => {
    setIsLoading(true);
    GlobalApi.getDoctorById(params.recordId)
      .then((res) => {
        setDoctor(res.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className=" p-5 h-full md:px-10 max-w-[85rem] mx-auto">
      <h2 className=" font-bold text-[22px]">Details</h2>
      <div className="grid grid-cols-1 xl:grid-cols-4">
        {/* Doc Details */}
        <div className="col-span-3 ">
          {isLoading ? (
            <p className="text-white animate-pulse">Loading...</p>
          ) : (
            doctor && <BarberDetail doctor={doctor} isLoading={isLoading} />
          )}
        </div>
        {/* doc sugesstions */}
        {/* <div></div> */}
        <div>{<BarberSugesstions />}</div>
      </div>
    </div>
  );
};

export default Details;
