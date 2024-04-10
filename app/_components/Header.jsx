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
  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Explore",
      path: "/",
    },
    {
      id: 3,
      name: "Contact Us",
      path: "/",
    },
  ];

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="logo" width={90} height={80} />
        <ul className=" md:flex gap-8 hidden">
          {Menu.map((item, index) => (
            <Link href={item.path}>
              <li
                className="hover:text-primary cursor-pointer hover:scale-150 transition-all ease-in-out"
                key={item.id}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
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
                <span className="text-gray-600 text-[7px]">No Image</span>
              </div>
            )}
          </PopoverTrigger>
          <PopoverContent className="w-44">
            <ul className="flex flex-col gap-2">
              <li className="  cursor-pointer hover:bg-slate-200 p-2 rounded-md">
                Profile
              </li>
              <li className="  cursor-pointer hover:bg-slate-200 p-2 rounded-md">
                My Booking
              </li>
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
    </div>
  );
};

export default Header;
