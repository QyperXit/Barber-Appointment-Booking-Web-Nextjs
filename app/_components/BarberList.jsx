import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";

const BarberList = ({ doctor }) => {
  const [barber, setBarber] = useState([]);
  const [Icon, setIcon] = useState([]);
  // useEffect(() => {
  //   getDoctorById();
  //   GetIcons();
  // }, []);

  // const getDoctorById = () => {
  //   GlobalApi.getDoctorById(7).then((res) => {
  //     // console.log(res.data.attributes.Image.data.attributes.url);
  //     setBarber(res.data?.attributes?.Image?.data?.attributes?.url);
  //   });
  // };
  // const GetIcons = () => {
  //   GlobalApi.GetIcons(1).then((res) => {
  //     console.log(res.data.data?.attributes?.img.data[2].attributes.url);
  //     // setBarber(res.data.attributes.Image.data.attributes.url);
  //     setIcon(res.data?.data?.attributes?.img?.data);
  //   });
  // };

  return (
    // <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto  mb-10">
    //   <div className="relative p-6 md:p-16">
    //     <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
    //       <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
    //         <h2 className="text-2xl text-gray-800 font-bold sm:text-3xl dark:text-gray-200">
    //           Tailored cuts, personalized for your style.
    //         </h2>

    //         <nav
    //           className="grid gap-4 mt-5 md:mt-10"
    //           aria-label="Tabs"
    //           role="tablist"
    //         >
    //           <div
    //             className="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-slate-900 dark:hover:bg-gray-700 active"
    //             id="tabs-with-card-item-1"
    //             data-hs-tab="#tabs-with-card-1"
    //             aria-controls="tabs-with-card-1"
    //             role="tab"
    //           >
    //             <span className="flex">
    //               {Icon && Icon.length > 0 && Icon[0]?.attributes?.url && (
    //                 <Image
    //                   src={Icon[0].attributes.url}
    //                   width={24}
    //                   height={24}
    //                   alt="scissors"
    //                   className="flex-shrink-0 mt-2 size-6 md:size-7 hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200"
    //                 />
    //               )}

    //               <span className="grow ms-6">
    //                 <span className="block text-lg font-semibold hs-tab-active:text-blue-600 text-gray-400 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
    //                   Coming Soon ....
    //                 </span>
    //                 <div className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-gray-200">
    //                   <Button disabled>Book Now!</Button>
    //                 </div>
    //               </span>
    //             </span>
    //           </div>

    //           <div
    //             type="button"
    //             className="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-slate-900 dark:hover:bg-gray-700"
    //             id="tabs-with-card-item-2"
    //             data-hs-tab="#tabs-with-card-2"
    //             aria-controls="tabs-with-card-2"
    //             role="tab"
    //           >
    //             <span className="flex">
    //               {/* <svg
    //                 className="flex-shrink-0 mt-2 size-6 md:size-7 hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="24"
    //                 height="24"
    //                 viewBox="0 0 24 24"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 strokeWidth="2"
    //                 stroke-linecap="round"
    //                 stroke-linejoin="round"
    //               > */}
    //               {Icon && Icon.length > 0 && Icon[1]?.attributes?.url && (
    //                 <Image
    //                   src={Icon[1].attributes.url}
    //                   width={24}
    //                   height={24}
    //                   alt="scissors"
    //                   className="flex-shrink-0 mt-2 size-6 md:size-7 hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200"
    //                 />
    //               )}
    //               {/* <path d="m12 14 4-4" />
    //                 <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    //               </svg> */}
    //               <span className="grow ms-6">
    //                 <span className="block text-lg font-semibold hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
    //                   Micheal
    //                 </span>
    //                 <Link
    //                   href={`/details/${7}`}
    //                   className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-gray-200"
    //                 >
    //                   <Button className="bg-amber-400">Book Now!</Button>
    //                 </Link>
    //               </span>
    //             </span>
    //           </div>

    //           <div
    //             type="button"
    //             className="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-slate-900 dark:hover:bg-gray-700"
    //             id="tabs-with-card-item-3"
    //             data-hs-tab="#tabs-with-card-3"
    //             aria-controls="tabs-with-card-3"
    //             role="tab"
    //           >
    //             <span className="flex">
    //               {Icon && Icon.length > 0 && Icon[2]?.attributes?.url && (
    //                 <Image
    //                   src={Icon[2].attributes.url}
    //                   width={24}
    //                   height={24}
    //                   alt="scissors"
    //                   className="flex-shrink-0 mt-2 size-6 md:size-7 hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200"
    //                 />
    //               )}
    //               <span className="grow ms-6">
    //                 <span className="block text-lg font-semibold hs-tab-active:text-blue-600 text-gray-400 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
    //                   Coming Soon...
    //                 </span>
    //                 <div className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-gray-200">
    //                   <Button disabled>Book Now!</Button>
    //                 </div>
    //               </span>
    //             </span>
    //           </div>
    //         </nav>
    //       </div>

    //       <div className="lg:col-span-6">
    //         <div className="relative">
    //           <div>
    //             <div
    //               id="tabs-with-card-1"
    //               role="tabpanel"
    //               aria-labelledby="tabs-with-card-item-1"
    //             >
    //               <img
    //                 className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/[.2]"
    //                 src={barber}
    //                 alt="Image Description"
    //               />
    //             </div>

    //             <div
    //               id="tabs-with-card-2"
    //               className="hidden"
    //               role="tabpanel"
    //               aria-labelledby="tabs-with-card-item-2"
    //             >
    //               {/* <img className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/[.2]" src="https://images.unsplash.com/photo-1665686306574-1ace09918530?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&h=1220&q=80" alt="Image Description"> */}
    //             </div>

    //             <div
    //               id="tabs-with-card-3"
    //               className="hidden"
    //               role="tabpanel"
    //               aria-labelledby="tabs-with-card-item-3"
    //             >
    //               {/* <img className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/[.2]" src="https://images.unsplash.com/photo-1598929213452-52d72f63e307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&h=1220&q=80" alt="Image Description"> */}
    //             </div>
    //           </div>

    //           <div className="hidden absolute top-0 end-0 translate-x-20 md:block lg:translate-x-20">
    //             {/* <svg
    //               className="w-16 h-auto text-amber-500"
    //               width="121"
    //               height="135"
    //               viewBox="0 0 121 135"
    //               fill="none"
    //               xmlns="http://www.w3.org/2000/svg"
    //             >
    //               <path
    //                 d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
    //                 stroke="currentColor"
    //                 strokeWidth="10"
    //                 stroke-linecap="round"
    //               />
    //               <path
    //                 d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
    //                 stroke="currentColor"
    //                 strokeWidth="10"
    //                 stroke-linecap="round"
    //               />
    //               <path
    //                 d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
    //                 stroke="currentColor"
    //                 strokeWidth="10"
    //                 stroke-linecap="round"
    //               />
    //             </svg> */}
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="absolute inset-0 grid grid-cols-12 size-full">
    //       <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-gray-100 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full dark:bg-white/[.075]"></div>
    //     </div>
    //   </div>
    // </div>
    <div className="md:max-w-4xl mx-auto mt-20 mb-10">
      <div className="grid grid-cols-2 sm:grid-cols-4  gap-2">
        <div className="space-y-2">
          <img
            className="w-full sm:size-40 lg:size-60 object-cover border-4"
            src="https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <img
            className="w-full sm:size-40 lg:size-60  object-cover border-4"
            src="/1barber.webp"
          />
          <img
            className="w-full sm:size-40 lg:size-60  object-cover border-4"
            src="https://images.unsplash.com/photo-1557349800-5b9b168f3f53?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGJhcmJlciUyMGNsaXBzfGVufDB8fDB8fHww"
            alt="Image Description"
          />
        </div>
        <div className="space-y-2">
          <img
            className="w-full sm:size-40 lg:size-60  object-cover border-4"
            src="https://images.unsplash.com/photo-1514336937476-a5b961020a5c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image Description"
          />
          <img
            className="w-full sm:size-40 lg:size-60  object-cover border-4"
            src="/3barber.webp"
            alt="Image Description"
          />
          <img
            className="w-full sm:size-40 lg:size-60  object-cover border-4"
            src="/2barber.jpg"
            alt="Image Description"
          />
        </div>
        <div className="space-y-2">
          <img
            className="w-full sm:size-40 lg:size-60  object-cover border-4"
            src="https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <img
            className="w-full sm:size-40 lg:size-60  object-cover border-4"
            src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image Description"
          />
          <img
            className="w-full sm:size-40 lg:size-60  object-cover border-4"
            src="https://images.unsplash.com/photo-1523532931495-f51ebf4bc3a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGJhcmJlciUyMGhhaXIlMjBjdXR8ZW58MHx8MHx8fDA%3D"
            alt="Image Description"
          />
        </div>
        <div className="space-y-2">
          <img
            className="w-full sm:size-40 lg:size-60  object-cover border-4"
            src="https://images.unsplash.com/photo-1657105052497-f996284ffff8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGJhcmJlciUyMGNsaXBzfGVufDB8fDB8fHww"
            alt="Image Description"
          />
          <img
            className="w-full sm:size-40 lg:size-60  object-cover border-4"
            src="https://images.unsplash.com/photo-1536520002442-39764a41e987?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFyYmVyJTIwY2xpcHN8ZW58MHx8MHx8fDA%3D"
            alt="Image Description"
          />
          <img
            className="w-full sm:size-40  lg:size-60 object-cover border-4"
            src="https://plus.unsplash.com/premium_photo-1661382022096-d652c06cf1be?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image Description"
          />
        </div>
      </div>
    </div>
  );
};

export default BarberList;
