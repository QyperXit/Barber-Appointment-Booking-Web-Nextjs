import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    // <section>
    //   <div class="relative max-w-screen-xl p-4 px-4 mx-auto bg-white dark:bg-gray-800 sm:px-6 lg:px-8 py-26 lg:mt-20">
    //     <div class="relative">
    //       <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
    //         <div class="ml-auto lg:col-start-2 lg:max-w-2xl">
    //           <p class="text-base font-semibold leading-6 text-amber-500 uppercase">
    //             G Barber's
    //           </p>
    //           <h4 class="mt-2 text-2xl font-extrabold leading-8 text-gray-900 dark:text-white sm:text-3xl sm:leading-9">
    //             Precision Cuts, Classic Styles, and Modern Flair!{" "}
    //           </h4>
    //           <p class="mt-4 text-lg leading-6 text-gray-500 dark:text-gray-300">
    //             At our barbershop, we believe that collaboration with our
    //             customers is essential for delivering exceptional service.
    //           </p>
    //           <ul class="gap-6 mt-8 md:grid md:grid-cols-2">
    //             <li class="mt-6 lg:mt-0">
    //               <div class="flex">
    //                 <span class="flex items-center justify-center flex-shrink-0 w-6 h-6 text-amber-800 bg-amber-100 rounded-full dark:text-amber-500 drark:bg-transparent">
    //                   <svg
    //                     class="w-4 h-4"
    //                     viewBox="0 0 20 20"
    //                     fill="currentColor"
    //                   >
    //                     <path
    //                       fill-rule="evenodd"
    //                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
    //                       clip-rule="evenodd"
    //                     ></path>
    //                   </svg>
    //                 </span>
    //                 <span class="ml-4 text-base font-medium leading-6 text-gray-500 dark:text-gray-200">
    //                   Live modifications
    //                 </span>
    //               </div>
    //             </li>
    //             <li class="mt-6 lg:mt-0">
    //               <div class="flex">
    //                 <span class="flex items-center justify-center flex-shrink-0 w-6 h-6 text-amber-800 bg-amber-100 rounded-full dark:text-amber-500 drark:bg-transparent">
    //                   <svg
    //                     class="w-4 h-4"
    //                     viewBox="0 0 20 20"
    //                     fill="currentColor"
    //                   >
    //                     <path
    //                       fill-rule="evenodd"
    //                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
    //                       clip-rule="evenodd"
    //                     ></path>
    //                   </svg>
    //                 </span>
    //                 <span class="ml-4 text-base font-medium leading-6 text-gray-500 dark:text-gray-200">
    //                   Free Booking
    //                 </span>
    //               </div>
    //             </li>
    //             <li class="mt-6 lg:mt-0">
    //               <div class="flex">
    //                 <span class="flex items-center justify-center flex-shrink-0 w-6 h-6 text-amber-800 bg-amber-100 rounded-full dark:text-amber-500 drark:bg-transparent">
    //                   <svg
    //                     class="w-4 h-4"
    //                     viewBox="0 0 20 20"
    //                     fill="currentColor"
    //                   >
    //                     <path
    //                       fill-rule="evenodd"
    //                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
    //                       clip-rule="evenodd"
    //                     ></path>
    //                   </svg>
    //                 </span>
    //                 <span class="ml-4 text-base font-medium leading-6 text-gray-500 dark:text-gray-200">
    //                   Online Booking
    //                 </span>
    //               </div>
    //             </li>
    //             <li class="mt-6 lg:mt-0">
    //               <div class="flex">
    //                 <span class="flex items-center justify-center flex-shrink-0 w-6 h-6 text-amber-800 bg-amber-100 rounded-full dark:text-amber-500 drark:bg-transparent">
    //                   <svg
    //                     class="w-4 h-4"
    //                     viewBox="0 0 20 20"
    //                     fill="currentColor"
    //                   >
    //                     <path
    //                       fill-rule="evenodd"
    //                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
    //                       clip-rule="evenodd"
    //                     ></path>
    //                   </svg>
    //                 </span>
    //                 <span class="ml-4 text-base font-medium leading-6 text-gray-500 dark:text-gray-200">
    //                   Contactless Payments
    //                 </span>
    //               </div>
    //             </li>
    //           </ul>
    //         </div>
    //         <div class="relative mt-10 lg:-mx-4 relative-20 lg:mt-0 lg:col-start-1">
    //           <div class="relative space-y-4">
    //             <div class="flex items-end justify-center space-x-4 lg:justify-start">
    //               <img
    //                 class="w-32 rounded-lg shadow-lg md:w-56"
    //                 width="200"
    //                 src="/1barber.webp"
    //                 alt="1"
    //               />
    //               <img
    //                 class="w-40 rounded-lg shadow-lg md:w-64"
    //                 width="260"
    //                 src="/2barber.jpg"
    //                 alt="2"
    //               />
    //             </div>
    //             <div class="flex items-start justify-center ml-12 space-x-4 lg:justify-start">
    //               <img
    //                 class="w-24 rounded-lg shadow-lg md:w-40"
    //                 width="170"
    //                 src="/3barber.webp"
    //                 alt="3"
    //               />
    //               <img
    //                 class="w-32 rounded-lg shadow-lg md:w-56"
    //                 width="200"
    //                 src="/4barber.webp"
    //                 alt="4"
    //               />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    // <diiv class="relative overflow-hidden">
    //   <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
    //     <div class="max-w-2xl text-center mx-auto">
    //       <h1 class="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl dark:text-white">
    //         Customized Styles Tailored Cuts{" "}
    //         <span class="text-blue-600">simple</span>
    //       </h1>
    //       <p class="mt-3 text-lg text-gray-800 dark:text-gray-400">
    //         Book Your Haircut Appointment Today!
    //       </p>
    //     </div>

    //     <div class="mt-10 relative max-w-5xl mx-auto">
    //       <div class="w-full object-cover h-96 sm:h-[480px] bg-[url('https://images.unsplash.com/photo-1615011968353-0392c495eed3?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-center bg-cover rounded-xl"></div>

    //       <div class="absolute inset-0 size-full">
    //         <div class="flex flex-col justify-center items-center size-full">
    //           <a
    //             class="py-3 px-4 inline-flex items-center gap-x-2 text-lg font-semibold rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
    //             href="#"
    //           >
    //             Book Now !
    //           </a>
    //         </div>
    //       </div>

    //       <div class="absolute bottom-12 -start-20 -z-[1] size-48 bg-gradient-to-b from-amber-500 to-white p-px rounded-lg dark:to-slate-900">
    //         <div class="bg-white size-48 rounded-lg dark:bg-slate-900"></div>
    //       </div>

    //       <div class="absolute -top-12 -end-20 -z-[1] size-48 bg-gradient-to-t from-amber-600 to-amber-400 p-px rounded-full">
    //         <div class="bg-white size-48 rounded-full dark:bg-slate-900"></div>
    //       </div>
    //     </div>
    //   </div>
    // </diiv>

    <div className="relative w-full  h-screen mt-2">
      <div className="absolute inset-0 bg-gray-900 opacity-50 z-10  border-4 border-white"></div>
      <div className="relative bg-[url('https://plus.unsplash.com/premium_photo-1661964421770-6b60b1678d62?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center w-full h-full  border-4 border-white">
        <div className="flex flex-col items-center justify-center h-full text-white z-20 font-medium font-times">
          <h1 className=" text-lg md:text-3xl lg:text-5xl z-20  text-shadow-blue-700">
            Best Barber Shop in Town | Birmingham
          </h1>
          <h1 className="z-20 mt-10 font-medium text-xl text-shadow-blue-700">
            Birmingham | BHX | Tesley
          </h1>
          <Button className=" z-20 mt-20 font-semibold border">
            BOOK AN APPOINTMENT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
