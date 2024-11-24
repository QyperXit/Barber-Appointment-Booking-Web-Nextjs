// app/_components/Header/MobileMenu.jsx

import { motion } from "framer-motion";
import { menuAnimations } from "@/app/_utils/animations/headerAnimations";
import { CircleChevronDown } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { MenuOption } from "./MenuOption";

export const MobileMenu = ({ open, setOpen, user }) => {
    return (
        <motion.div animate={open ? "open" : "closed"} className="relative z-50">
            <button
                onClick={() => setOpen((pv) => !pv)}
                className="flex items-center px-3 py-2 transition-colors rounded-md text-indigo-50 hover:bg-primary"
            >
                <motion.span variants={menuAnimations.iconVariants}>
                    <CircleChevronDown />
                </motion.span>
            </button>

            <motion.ul
                initial={menuAnimations.wrapperVariants.closed}
                variants={menuAnimations.wrapperVariants}
                style={{ originY: "top", translateX: "-85.5%" }}
                className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-40 overflow-hidden"
            >
                {user ? (
                    <>
                        <Link href="/">
                            <MenuOption setOpen={setOpen} text="Home" />
                        </Link>

                        {user.id === process.env.NEXT_PUBLIC_ID ? (
                            <>
                                <Link href="/appointments">
                                    <MenuOption setOpen={setOpen} text="My Schedule" />
                                </Link>

                                <Link href="/invite">
                                    <MenuOption setOpen={setOpen} text="Invite" />
                                </Link>
                            </>
                        ) : (
                            <Link href="/my-booking">
                                <MenuOption setOpen={setOpen} text="My Booking" />
                            </Link>
                        )}

                        <Link href="/user-profile">
                            <MenuOption setOpen={setOpen} text="Account" />
                        </Link>
                        <Link href="/contact">
                            <MenuOption setOpen={setOpen} text="Contact" />
                        </Link>
                        <SignOutButton
                            className="flex items-center w-full p-2 pl-4 text-sm font-medium transition-colors rounded-md cursor-pointer whitespace-nowrap hover:bg-indigo-100 text-slate-700 hover:text-primary"
                            onClick={() => setOpen(false)}
                        />
                    </>
                ) : (
                    <Link href="sign-in">
                        <MenuOption setOpen={setOpen} text="Get Started" />
                    </Link>
                )}
            </motion.ul>
        </motion.div>
    );
};