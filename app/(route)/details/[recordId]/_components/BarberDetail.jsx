import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import BookAppointment from "./BookAppointment";

const BarberDetail = ({ doctor, isLoading }) => {
  const socialMedaList = [
    { id: 1, icon: "/youtube.png", url: "" },
    { id: 2, icon: "/facebook.png", url: "" },
    { id: 3, icon: "/linkedin.png", url: "" },
    { id: 4, icon: "/x.png", url: "" },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 border-[4px] p-5 mt-5 ">
        {/* doc image */}
        <div>
          {isLoading ? (
            <Skeleton className="h-[280px] w-full" />
          ) : (
            <Image
              src={doctor.attributes?.Image?.data?.attributes?.url}
              width={200}
              height={200}
              alt="barber-image"
              className="h-[280px] w-full object-cover"
            />
          )}
        </div>
        {/* doc info */}
        <div className="flex flex-col col-span-2 gap-3 mt-5 md:px-10">
          {isLoading ? (
            <Skeleton className="w-1/2 h-6" />
          ) : (
            <h2 className="text-2xl font-bold text-white ">
              {doctor.attributes?.Name}
            </h2>
          )}
          <div className="flex gap-2">
            {isLoading ? (
              <Skeleton className="w-1/3 h-4" />
            ) : (
              <>
                <h2 className="flex gap-2 text-gray-500 text-md">
                  <Briefcase className="scale-95 " />
                  <span>
                    {doctor.attributes?.Years_of_experience} of experience
                  </span>
                </h2>
              </>
            )}
          </div>
          <div className="flex gap-2">
            {isLoading ? (
              <Skeleton className="w-1/2 h-4" />
            ) : (
              <>
                <h2 className="flex gap-2 text-gray-400 text-md">
                  <MapPin />
                  <span>{doctor.attributes.Address}</span>
                </h2>
              </>
            )}
          </div>
          {isLoading ? (
            <Skeleton className="w-1/4 h-4" />
          ) : (
            <h2 className="text-[10px] font-bold bg-white p-1 px-2 mt-2 text-black w-fit">
              {doctor.attributes?.catergories?.data[0]?.attributes?.Name}
            </h2>
          )}
          {/* <div className="flex gap-3">
            {socialMedaList.map((item, index) => (
              <Image
                width={30}
                height={30}
                alt="socials-icon"
                src={item.icon}
                key={index}
              />
            ))}
          </div> */}
          <BookAppointment doctor={doctor} />
        </div>
        {/* about */}
      </div>
      <div className=" p-3 border-[4px] mt-5">
        <h2 className=" font-bold text-[20px] text-white">About Me</h2>
        {isLoading ? (
          <Skeleton className="w-full h-12" />
        ) : (
          <p className="mt-2 tracking-wider text-gray-400 ">
            {doctor.attributes.About}
          </p>
        )}
      </div>
    </>
  );
};

export default BarberDetail;
