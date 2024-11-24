// app/_components/Header/index.jsx
'use client'

import { Button } from "@/components/ui/button";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarCheck } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, isSignedIn } = useUser();

  return (
      <header className="z-50 flex flex-wrap w-full py-3 mt-2 text-sm bg-transparent border-4 sm:justify-start sm:flex-nowrap sm:py-0">
        <nav
            className="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
            aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <Link
                className="flex-none text-xl font-semibold text-white"
                href="/"
                aria-label="Brand"
            >
              G|Barber's
            </Link>
            <div className="sm:hidden">
              <MobileMenu open={open} setOpen={setOpen} user={user} />
            </div>
          </div>
          <div className="hidden overflow-hidden transition-all duration-300 hs-collapse basis-full grow sm:block">
            <div className="flex flex-col mt-5 gap-y-4 gap-x-0 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
              <Link
                  className="font-medium text-white hover:text-slate-400 hover:scale-110 transition-all sm:py-6"
                  href="/"
                  aria-current="page"
              >
                Home
              </Link>
              <Link
                  className="font-medium text-white/[.99] hover:text-slate-400 hover:scale-110 transition-all duration-300 sm:py-6"
                  href="/contact"
              >
                Contact
              </Link>
              {user && user.id === process.env.NEXT_PUBLIC_ID && (
                  <Link
                      className="font-medium text-white/[.99] hover:text-slate-400 hover:scale-110 transition-all duration-300 sm:py-6"
                      href="/appointments"
                  >
                    My Schedules
                  </Link>
              )}

              <div className="flex items-center gap-x-5 font-medium text-white/[.8] hover:text-white sm:border-s sm:border-white/[.3] sm:my-6 sm:ps-6">
                {isSignedIn ? (
                    <UserButton />
                ) : (
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
                )}
                {user ? (
                    <Popover>
                      <PopoverTrigger>
                        {user.id !== process.env.NEXT_PUBLIC_ID ? (
                            <CalendarCheck />
                        ) : null}
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
                        </ul>
                      </PopoverContent>
                    </Popover>
                ) : (
                    <Link href="sign-in">
                      <Button>Get Started</Button>
                    </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
  );
};

export default Header;