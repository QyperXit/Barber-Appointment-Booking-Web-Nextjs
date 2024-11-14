import GlobalApi from "@/app/_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const BarberSuggestions = ({  }) => {
  const [barberList, setBarberList] = useState([]);
  useEffect(() => {
    getBarbersList();
  }, []);

  const getBarbersList = () => {
    GlobalApi.getBarberList().then((res) => {
      setBarberList(res.data.data);
    });
  };

  return (
    <div className="p-5 mt-5 border-4 xl:ml-5 lg:py-[3.80rem] ">
      <h2 className=" font-bold text-[18px] text-white">Suggestions</h2>

      {barberList.slice(0, 3).map((item) => (
        <Link
          href={"/details/" + item.id}
          className="flex items-center gap-5 p-5 mt-5 rounded-lg cursor-pointer hover:bg-slate-600 "
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
          <div className="flex flex-col gap-2 ">
            <h2 className="text-[10px] font-bold bg-white p-1  px-2 text-black  w-fit">
              {item.attributes?.catergories?.data[0]?.attributes?.Name}
            </h2>
            <h2 className="font-bold text-white text-md">
              {item.attributes?.Name}
            </h2>
            <h2 className="flex gap-2 text-sm font-semibold text-blue-200 ">
              {item.attributes?.Years_of_experience}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BarberSuggestions;
