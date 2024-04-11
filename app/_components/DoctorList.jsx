import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DoctorList = ({ doctorList, heading = "Popular Doctors" }) => {
  return (
    <div className=" mb-10 mt-10 px-6">
      <h2 className=" font-bold text-xl">{heading}</h2>
      <div className=" grid grid-cols-2 gap-7 mt-4  md:grid-cols-3 lg:grid-cols-4">
        {doctorList.length > 0
          ? doctorList.map((doctor, index) => (
              <div
                key={index}
                className="border-[1px]  rounded-lg  p-3 cursor-pointer hover:border-primary hover:shadow-sm transition-all ease-in-out"
              >
                <Image
                  src={doctor.attributes?.Image?.data?.attributes?.url}
                  width={500}
                  height={200}
                  alt="doctor img"
                  className="h-[200px] w-full object-cover object-center  rounded-lg"
                />
                <div className=" mt-3 items-baseline flex  gap-2 flex-col">
                  <h2 className="text-[10px] font-bold bg-blue-100 p-1 rounded-full px-2 text-primary">
                    {doctor.attributes?.catergories?.data[0]?.attributes?.Name}
                  </h2>
                  <h2 className=" mt-2 font-bold">{doctor.attributes.Name}</h2>
                  <h2 className=" text-primary text-sm">
                    {doctor.attributes?.Years_of_experience}
                  </h2>
                  <h2 className="text-sm text-gray-500">
                    {doctor.attributes?.Address}
                  </h2>
                  <Link href={"/details/" + doctor?.id} className=" w-full">
                    <h2 className=" p-2 px-3 border-[1px] border-primary  text-primary rounded-full w-full text-center text-[11px] mt-2  cursor-pointer hover:bg-primary  hover:text-white ransition-all ease-in-out">
                      Book Now
                    </h2>
                  </Link>
                </div>
              </div>
            ))
          : // skeleton
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              // placeholder
              <div className=" h-[220px] bg-slate-200 w-full rounded-lg animate-pulse"></div>
            ))}
      </div>
    </div>
  );
};

export default DoctorList;
