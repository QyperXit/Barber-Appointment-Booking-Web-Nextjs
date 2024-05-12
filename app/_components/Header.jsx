"use client";

import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user } = useKindeBrowserClient();

  useEffect(() => {}, [user]);

  function toggleNavbarCollapse() {
    setOpen(!open);
  }
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the clicked element is a link or inside the opened div
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !event.target.closest("a")
      ) {
        setOpen(false); // Close the div if clicked outside and not on a link
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <header className="z-50 flex flex-wrap w-full py-3 mt-2 text-sm bg-transparent border-4 sm:justify-start sm:flex-nowrap sm:py-0">
      <nav
        className="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 "
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <Link
            className="flex-none text-xl font-semibold text-white"
            href={"/"}
            aria-label="Brand"
          >
            G|Barber's
          </Link>
          <div className="sm:hidden">
            <Popover>
              <PopoverTrigger>
                {/*  */}
                {/*  */}
                <button
                  type="button"
                  className="flex items-center justify-center text-sm font-semibold text-gray-100 border rounded-lg  size-9 gap-x-2 border-white/20 hover:border-white/40 disabled:opacity-50 disabled:pointer-events-none"
                  aria-controls="navbar-collapse-with-animation"
                  aria-label="Toggle navigation"
                  onClick={toggleNavbarCollapse}
                  ref={ref}
                >
                  {!open && (
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="3" x2="21" y1="6" y2="6" />
                      <line x1="3" x2="21" y1="12" y2="12" />
                      <line x1="3" x2="21" y1="18" y2="18" />
                    </svg>
                  )}
                  {open && (
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  )}
                </button>
                {/*  */}
                {/*  */}
              </PopoverTrigger>
              <PopoverContent className="mt-4 mr-6 w-44">
                <ul className="flex flex-col gap-2 ">
                  {user ? (
                    <>
                      <Link
                        className="p-2 rounded-md cursor-pointer hover:bg-slate-200"
                        href={"/"}
                      >
                        Home
                      </Link>
                      {user && user.id === process.env.NEXT_PUBLIC_ID ? (
                        <Link
                          className="p-2 rounded-md cursor-pointer hover:bg-slate-200"
                          href="/appointments"
                        >
                          My Schedules
                        </Link>
                      ) : (
                        <Link
                          href={"/my-booking"}
                          className="p-2 rounded-md cursor-pointer hover:bg-slate-200"
                        >
                          My Booking
                        </Link>
                      )}

                      <Link
                        className="p-2 rounded-md cursor-pointer hover:bg-slate-200"
                        href="/contact"
                      >
                        Contact
                      </Link>

                      <li className="p-2 rounded-md cursor-pointer hover:bg-slate-200">
                        <LogoutLink>LogOut</LogoutLink>
                      </li>
                    </>
                  ) : (
                    <LoginLink className="mx-auto ">
                      <Button>Get Started</Button>
                    </LoginLink>
                  )}
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div
          id="navbar-collapse-with-animation"
          className="hidden overflow-hidden transition-all duration-300 hs-collapse basis-full grow sm:block"
        >
          <div
            className="flex flex-col mt-5 gap-y-4 gap-x-0 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7"
            ref={ref}
          >
            <Link
              className="font-medium text-white hover:text-slate-400 hover:scale-110transition-all sm:py-6"
              href="/"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              className="font-medium text-white/[.99] hover:text-slate-400 hover:scale-110transition-all duration-300  sm:py-6"
              href="/contact"
            >
              Contact
            </Link>
            {user && user.id === process.env.NEXT_PUBLIC_ID && (
              <Link
                className="font-medium text-white/[.99] hover:text-slate-400 hover:scale-110transition-all duration-300  sm:py-6"
                href="/appointments"
              >
                My Schedules
              </Link>
            )}

            {/*  */}
            {/*  */}
            <a
              className="flex items-center gap-x-2 font-medium text-white/[.8] hover:text-white sm:border-s sm:border-white/[.3] sm:my-6 sm:ps-6"
              href="#"
            >
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                        className="w-12 h-12 transition-transform ease-in-out rounded-full shadow-md hover:scale-90"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-12 h-12 font-semibold bg-gray-200 rounded-full shadow-sm">
                        <span className="text-gray-600 text-[7px]">
                          No Image
                        </span>
                      </div>
                    )}
                  </PopoverTrigger>
                  <PopoverContent className="w-44">
                    <ul className="flex flex-col gap-2">
                      {user && user.id !== process.env.NEXT_PUBLIC_ID && (
                        <Link
                          href="/my-booking"
                          className="p-2 rounded-md cursor-pointer hover:bg-slate-200"
                        >
                          My Booking
                        </Link>
                      )}

                      <li className="p-2 rounded-md cursor-pointer hover:bg-slate-200">
                        <LogoutLink>LogOut</LogoutLink>
                      </li>
                    </ul>
                  </PopoverContent>
                </Popover>
              ) : (
                <LoginLink>
                  <Button>Get Started</Button>{" "}
                </LoginLink>
              )}
            </a>
            {/*  */}
            {/*  */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
