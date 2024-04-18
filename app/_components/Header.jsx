"use client";

import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  // const Menu = [
  //   {
  //     id: 1,
  //     name: "Home",
  //     path: "/",
  //   },
  //   {
  //     id: 2,
  //     name: "Explore",
  //     path: "/",
  //   },
  //   {
  //     id: 3,
  //     name: "Contact Us",
  //     path: "/",
  //   },
  // ];

  const { user } = useKindeBrowserClient();

  useEffect(() => {}, [user]);

  return (
    // <div className="flex items-center justify-between p-4 shadow-sm">
    //   <div className="flex items-center gap-10">
    //     {/* <Image src="/barber.png" alt="logo" width={90} height={80} /> */}
    //     <i className=" text-5xl font-bold  text-amber-400 text-shadow-xl relative">
    //       G
    //       <span className="absolute text-gray-600  inset-7 after:content-[hello] text-[10px] text-shadow-custom inset-x-3.5">
    //         Barbers
    //       </span>
    //     </i>
    //     <ul className=" md:flex gap-8 hidden">
    //       {Menu.map((item, index) => (
    //         <Link href={item.path}>
    //           <li
    //             className="hover:text-primary cursor-pointer hover:scale-150 transition-all ease-in-out"
    //             key={index}
    //           >
    //             {item.name}
    //           </li>
    //         </Link>
    //       ))}
    //     </ul>
    //   </div>
    //   {user ? (
    //     <Popover>
    //       <PopoverTrigger>
    //         {user.picture ? (
    //           <Image
    //             src={user.picture}
    //             alt="profile-img"
    //             width={50}
    //             height={50}
    //           />
    //         ) : (
    //           <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full shadow-sm  font-semibold">
    //             <span className="text-gray-600 text-[7px]">No Image</span>
    //           </div>
    //         )}
    //       </PopoverTrigger>
    //       <PopoverContent className="w-44">
    //         <ul className="flex flex-col gap-2">
    //           <Link
    //             href={"/my-booking"}
    //             className="  cursor-pointer hover:bg-slate-200 p-2 rounded-md"
    //           >
    //             My Booking
    //           </Link>
    //           <li className="  cursor-pointer hover:bg-slate-200 p-2 rounded-md">
    //             <LogoutLink>LogOut</LogoutLink>
    //           </li>
    //         </ul>
    //       </PopoverContent>
    //     </Popover>
    //   ) : (
    //     <LoginLink>
    //       <Button>Get Started</Button>
    //     </LoginLink>
    //   )}
    // </div>
    <header class="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full  bg-transparent text-sm py-3 sm:py-0 border-4 mt-1">
      <nav
        class="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 "
        aria-label="Global"
      >
        <div class="flex items-center justify-between">
          <Link
            class="flex-none text-xl font-semibold text-white"
            href={"/"}
            aria-label="Brand"
          >
            G|Barber's
          </Link>
          <div class="sm:hidden">
            <button
              type="button"
              class="hs-collapse-toggle size-9 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-white/20 text-white hover:border-white/40 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-collapse="#navbar-collapse-with-animation"
              aria-controls="navbar-collapse-with-animation"
              aria-label="Toggle navigation"
            >
              <svg
                class="hs-collapse-open:hidden flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                class="hs-collapse-open:block hidden flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-collapse-with-animation"
          class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
        >
          <div class="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
            <Link
              class="font-medium text-white sm:py-6"
              href="/"
              aria-current="page"
            >
              Home
            </Link>
            <a
              class="font-medium text-white/[.8] hover:text-white sm:py-6"
              href="#"
            >
              Contact
            </a>
            <a
              class="font-medium text-white/[.8] hover:text-white sm:py-6"
              href="#"
            >
              Location
            </a>

            <a
              class="flex items-center gap-x-2 font-medium text-white/[.8] hover:text-white sm:border-s sm:border-white/[.3] sm:my-6 sm:ps-6"
              href="#"
            >
              <svg
                class="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {user ? (
                <Popover>
                  <PopoverTrigger>
                    {user.picture ? (
                      <Image
                        src={user.picture}
                        alt="profile-img"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full shadow-sm  font-semibold">
                        <span className="text-gray-600 text-[7px]">
                          No Image
                        </span>
                      </div>
                    )}
                  </PopoverTrigger>
                  <PopoverContent className="w-44">
                    <ul className="flex flex-col gap-2">
                      <Link
                        href={"/my-booking"}
                        className="  cursor-pointer hover:bg-slate-200 p-2 rounded-md"
                      >
                        My Booking
                      </Link>
                      <li className="  cursor-pointer hover:bg-slate-200 p-2 rounded-md">
                        <LogoutLink>LogOut</LogoutLink>
                      </li>
                    </ul>
                  </PopoverContent>
                </Popover>
              ) : (
                <LoginLink>
                  <Button>Get Started</Button>
                </LoginLink>
              )}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
