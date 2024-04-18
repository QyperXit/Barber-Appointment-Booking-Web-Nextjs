import { Button } from "@/components/ui/button";
import { GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import BookAppointment from "./BookAppointment";

const DoctorDetail = ({ doctor }) => {
  const socialMedaList = [
    { id: 1, icon: "/youtube.png", url: "" },
    { id: 2, icon: "/facebook.png", url: "" },

    { id: 3, icon: "/linkedin.png", url: "" },

    { id: 4, icon: "/x.svg", url: "" },
  ];

  return (
    <>
      <div className="  grid grid-cols-1 md:grid-cols-3 border-[4px]  p-5 mt-5 ">
        {/* doc image */}
        <div>
          <Image
            src={doctor.attributes?.Image?.data?.attributes?.url}
            width={200}
            height={200}
            alt="doctor-image"
            className="h-[280px]  w-full rounded-lg object-cover"
          />
        </div>
        {/* doc info */}
        <div className=" col-span-2 mt-5 flex md:px-10 flex-col gap-3">
          <h2 className=" font-bold text-2xl  text-white">
            {doctor.attributes?.Name}
          </h2>
          <h2 className=" flex text-gray-500 gap-2 text-md">
            <GraduationCap />
            <span>{doctor.attributes?.Years_of_experience} of experience</span>
          </h2>
          <h2 className=" text-gray-400 text-md gap-2 flex">
            <MapPin />
            <span>{doctor.attributes.Address}</span>
          </h2>
          <h2 className="text-[10px] font-bold bg-blue-100 p-1 rounded-full px-2 text-primary  w-fit">
            {doctor.attributes?.catergories?.data[0]?.attributes?.Name}
          </h2>
          <div className="flex gap-3">
            {socialMedaList.map((item, index) => (
              <Image width={30} height={30} src={item.icon} key={index} />
            ))}
          </div>

          <BookAppointment doctor={doctor} />
        </div>

        {/* about */}
      </div>
      <div className=" p-3 border-[1px] rounded-lg mt-5">
        <h2 className=" font-bold text-[20px]">About Me</h2>
        <p className=" text-gray-400 tracking-wider mt-2">
          {doctor.attributes.About}
        </p>
      </div>
    </>
  );
};

export default DoctorDetail;
