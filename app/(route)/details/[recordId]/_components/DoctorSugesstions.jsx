import GlobalApi from "@/app/_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DoctorSugesstions = ({ doctor }) => {
  const [doctorList, setDoctorList] = useState([]);
  useEffect(() => {
    getDoctorsList();
  }, []);

  const getDoctorsList = () => {
    GlobalApi.getDoctorList().then((res) => {
      setDoctorList(res.data.data);
    });
  };

  return (
    <div className="border mt-5  xl:ml-5 rounded p-5 ">
      <h2 className=" font-bold text-[18px]">Sugesstions</h2>

      {doctorList.map((item, index) => (
        <Link
          href={"/details/" + item.id}
          className="flex gap-5 items-center mt-5  hover:bg-slate-100  cursor-pointer p-5 rounded-lg "
          key={item.id}
        >
          <div>
            <Image
              src={item.attributes?.Image?.data?.attributes?.url}
              width={70}
              height={70}
              alt="doctor-image"
              className="h-[70px] w-[70px]  object-cover  rounded-full"
            />
          </div>
          <div className=" flex flex-col gap-2">
            <h2 className="text-[10px] font-bold bg-blue-100 p-1 rounded-full px-2 text-primary  w-fit">
              {item.attributes?.catergories?.data[0]?.attributes?.Name}
            </h2>
            <h2 className=" font-bold text-md">{item.attributes?.Name}</h2>
            <h2 className=" flex text-primary  font-semibold gap-2 text-sm">
              {item.attributes?.Years_of_experience}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DoctorSugesstions;
