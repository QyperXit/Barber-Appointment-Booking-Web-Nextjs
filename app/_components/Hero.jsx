import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section>
      <div class="relative max-w-screen-xl p-4 px-4 mx-auto bg-white dark:bg-gray-800 sm:px-6 lg:px-8 py-26 lg:mt-20">
        <div class="relative">
          <div class="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div class="ml-auto lg:col-start-2 lg:max-w-2xl">
              <p class="text-base font-semibold leading-6 text-amber-500 uppercase">
                G Barber's
              </p>
              <h4 class="mt-2 text-2xl font-extrabold leading-8 text-gray-900 dark:text-white sm:text-3xl sm:leading-9">
                Precision Cuts, Classic Styles, and Modern Flair!{" "}
              </h4>
              <p class="mt-4 text-lg leading-6 text-gray-500 dark:text-gray-300">
                At our barbershop, we believe that collaboration with our
                customers is essential for delivering exceptional service.
              </p>
              <ul class="gap-6 mt-8 md:grid md:grid-cols-2">
                <li class="mt-6 lg:mt-0">
                  <div class="flex">
                    <span class="flex items-center justify-center flex-shrink-0 w-6 h-6 text-amber-800 bg-amber-100 rounded-full dark:text-amber-500 drark:bg-transparent">
                      <svg
                        class="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span class="ml-4 text-base font-medium leading-6 text-gray-500 dark:text-gray-200">
                      Live modifications
                    </span>
                  </div>
                </li>
                <li class="mt-6 lg:mt-0">
                  <div class="flex">
                    <span class="flex items-center justify-center flex-shrink-0 w-6 h-6 text-amber-800 bg-amber-100 rounded-full dark:text-amber-500 drark:bg-transparent">
                      <svg
                        class="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span class="ml-4 text-base font-medium leading-6 text-gray-500 dark:text-gray-200">
                      Free Booking
                    </span>
                  </div>
                </li>
                <li class="mt-6 lg:mt-0">
                  <div class="flex">
                    <span class="flex items-center justify-center flex-shrink-0 w-6 h-6 text-amber-800 bg-amber-100 rounded-full dark:text-amber-500 drark:bg-transparent">
                      <svg
                        class="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span class="ml-4 text-base font-medium leading-6 text-gray-500 dark:text-gray-200">
                      Online Booking
                    </span>
                  </div>
                </li>
                <li class="mt-6 lg:mt-0">
                  <div class="flex">
                    <span class="flex items-center justify-center flex-shrink-0 w-6 h-6 text-amber-800 bg-amber-100 rounded-full dark:text-amber-500 drark:bg-transparent">
                      <svg
                        class="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span class="ml-4 text-base font-medium leading-6 text-gray-500 dark:text-gray-200">
                      Contactless Payments
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="relative mt-10 lg:-mx-4 relative-20 lg:mt-0 lg:col-start-1">
              <div class="relative space-y-4">
                <div class="flex items-end justify-center space-x-4 lg:justify-start">
                  <img
                    class="w-32 rounded-lg shadow-lg md:w-56"
                    width="200"
                    src="/1barber.webp"
                    alt="1"
                  />
                  <img
                    class="w-40 rounded-lg shadow-lg md:w-64"
                    width="260"
                    src="/2barber.jpg"
                    alt="2"
                  />
                </div>
                <div class="flex items-start justify-center ml-12 space-x-4 lg:justify-start">
                  <img
                    class="w-24 rounded-lg shadow-lg md:w-40"
                    width="170"
                    src="/3barber.webp"
                    alt="3"
                  />
                  <img
                    class="w-32 rounded-lg shadow-lg md:w-56"
                    width="200"
                    src="/4barber.webp"
                    alt="4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
