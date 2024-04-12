"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import {
  default as getCategory,
  default as GlobalApi,
} from "../_utils/GlobalApi";

const CatergorySearch = () => {
  const [catergoryList, setCatergoryList] = useState([]);

  useEffect(() => {
    getCatergoryList();
  }, []);

  const getCatergoryList = () => {
    GlobalApi.getCatergory().then((res) => {
      setCatergoryList(res.data.data);
    });
  };

  return (
    <div className=" mt-10 items-center flex flex-col gap-4">
      <h2 className=" text-4xl font-bold tracking-wider">Search</h2>
      <h2 className=" text-gray-500 text-xl">
        Search for Appointmnets in one click!
      </h2>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Search..." />
        <Button type="submit">
          {" "}
          <Search className=" h-4 w-4 mr-2" /> Search
        </Button>
      </div>
      {/* Display list of Cat */}
      <div className="grid  grid-cols-3  md:grid-cols-4 lg:grid-cols-6 mt-3">
        {catergoryList.length > 0
          ? catergoryList.map(
              (item, index) =>
                index < 6 && (
                  <Link
                    href={"/search/" + item.attributes.Name}
                    key={index}
                    className="flex flex-col text-center gap-2 items-center p-5 bg-blue-50 m-2  rounded-lg hover:scale-110  transition-all ease-in-out cursor-pointer"
                  >
                    <Image
                      src={item.attributes?.Icon?.data.attributes?.url}
                      alt="icon"
                      width={40}
                      height={40}
                    />
                    <label className=" text-blue-400 text-sm">
                      {item.attributes?.Name}
                    </label>
                  </Link>
                )
            )
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="w-[120px] m-2 h-[110px] bg-slate-200 animate-pulse rounded-lg"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default CatergorySearch;
