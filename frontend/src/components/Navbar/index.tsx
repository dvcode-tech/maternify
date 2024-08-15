/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAuth } from "@bundly/ares-react";
import { LoginButton, LogoutButton } from "../AuthButton";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import React from "react";
import { useRouter } from "next/router";
import { useHappenContext } from "@/context/HappenContext";
import { urlify } from "@/lib/utils";
import { LuTicket } from "react-icons/lu";

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

const Navbar: NextPage = () => {
  const router = useRouter();
  const { isAuthenticated, ctxAccount } = useHappenContext();
  const [time, setTime] = useState("");
  const currentTime = new Date();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = new Intl.DateTimeFormat("en-US").format(now);
      setTime(formattedTime);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
      className={`z-[98] flex flex-1 items-center justify-between px-[16px] py-[12px]`}
    >
      <Link href="/">
        <img className="h-5" src="/assets/logo/icon2.png" alt="" />
      </Link>
      <div className="flex items-center gap-4 text-[14px] font-medium text-[#FFFFFFA3]"></div>
    </section>
  );
};

export default Navbar;
