"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
// import {
//   Command,
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
//   CommandShortcut,
// } from "@/components/ui/command";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const CatergoryList = () => {
  const [catergoryList, setCatergoryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const prams = usePathname();
  const category = prams.split("/")[2];

  useEffect(() => {
    getCatergoryList();
  }, []);

  const getCatergoryList = () => {
    GlobalApi.getCatergory()
      .then((res) => {
        // const names = res.data.data.map((item) => item.attributes.Name);
        setCatergoryList(res.data.data);
        // console.log(names);
      })
      .catch((error) => {
        console.error("Error fetching category list:", error);
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCategoryList = catergoryList.filter((item) =>
    item.attributes.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log("Render Catergory List:", catergoryList); // Log the state before rendering

  return (
    <div className="h-screen mt-5 flex flex-col ">
      <input
        type="text"
        placeholder="Type a command or search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 border border-gray-300 rounded-md mb-4"
      />
      <div className="overflow-visible">
        {filteredCategoryList.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <ul>
            {filteredCategoryList.map((item, index) => (
              <li key={index}>
                <Link href={"/search/" + item?.attributes?.Name}>
                  <div
                    className={`flex items-center gap-2 text-[14px] text-blue-600 cursor-pointer rounded-md p-2 hover:bg-gray-100 ${
                      category == item.attributes.Name && "bg-blue-100"
                    } `}
                  >
                    <Image
                      src={item.attributes?.Icon?.data.attributes?.url}
                      alt="icon"
                      width={25}
                      height={25}
                    />
                    <span>{item.attributes.Name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CatergoryList;
