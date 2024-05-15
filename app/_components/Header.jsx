"use client";

import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleChevronDown } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user } = useKindeBrowserClient();

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
            <motion.div
              animate={open ? "open" : "closed"}
              className="relative z-50"
            >
              <button
                onClick={() => setOpen((pv) => !pv)}
                className="flex items-center px-3 py-2 transition-colors rounded-md bg-primary text-indigo-50 hover:bg-primary"
              >
                {/* <span className="text-sm font-medium"></span> */}
                <motion.span variants={iconVariants}>
                  {/* <FiChevronDown /> */}
                  <CircleChevronDown className="scale-90 " />
                </motion.span>
              </button>

              <motion.ul
                initial={wrapperVariants.closed}
                variants={wrapperVariants}
                style={{ originY: "top", translateX: "-85.5%" }}
                className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-40 overflow-hidden"
              >
                {user ? (
                  <>
                    <Link href={"/"}>
                      <Option setOpen={setOpen} href="/" text="Home" />
                    </Link>

                    {user && user.id === process.env.NEXT_PUBLIC_ID ? (
                      <Link href={"/appointments"}>
                        <Option setOpen={setOpen} text="My Schedule" />
                      </Link>
                    ) : (
                      <Link href={"/my-booking"}>
                        <Option setOpen={setOpen} text="My Booking" />
                      </Link>
                    )}
                    <Link href={"/contact"}>
                      <Option setOpen={setOpen} text="Contact" />
                    </Link>

                    <LogoutLink>
                      <Option setOpen={setOpen} text="LogOut" />
                    </LogoutLink>
                  </>
                ) : (
                  <LoginLink className="mx-auto ">
                    <Button>Get Started</Button>{" "}
                  </LoginLink>
                )}
              </motion.ul>
            </motion.div>
          </div>
        </div>
        <div
          id="navbar-collapse-with-animation"
          className="hidden overflow-hidden transition-all duration-300 hs-collapse basis-full grow sm:block"
        >
          <div
            className="flex flex-col mt-5 gap-y-4 gap-x-0 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7"
            // ref={ref}
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
            <div
              className="flex items-center gap-x-5 font-medium text-white/[.8] hover:text-white sm:border-s sm:border-white/[.3] sm:my-6 sm:ps-6"
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
            </div>
            {/*  */}
            {/*  */}
          </div>
        </div>
      </nav>
    </header>
  );
};

const Option = ({ text, Icon, setOpen }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => setOpen(false)}
      className="flex items-center w-full gap-2 p-2 text-sm font-medium transition-colors rounded-md cursor-pointer whitespace-nowrap hover:bg-indigo-100 text-slate-700 hover:text-primary"
    >
      <motion.span variants={actionIconVariants}>{/* <Icon /> */}</motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default Header;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
