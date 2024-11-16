"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import BarberDetail from "./_components/BarberDetail";
import BarberSuggestions from "./_components/BarberSuggestions";

const Details = ({ params }) => {
  const [barber, setBarber] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBarberById();
  }, []);

  const getBarberById = () => {
    setIsLoading(true);
    GlobalApi.getBarberById(params.recordId)
      .then((res) => {
        setBarber(res.data);
      })
      .catch((error) => {
        console.error("Error fetching barber data:", error);
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
            <p className="flex gap-2 mb-4 text-white animate-pulse">
              {" "}
              <Loader className="text-white animate-spin" />
              Loading...
            </p>
          ) : (
            barber && <BarberDetail barber={barber} isLoading={isLoading} />
          )}
        </div>
        {/* doc sugesstions */}
        {/* <div></div> */}
        <div>{<BarberSuggestions />}</div>
      </div>
    </div>
  );
};

export default Details;
