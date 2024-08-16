"use client";

import { PlusIcon } from "@/assets/icon/PlusIcon";
import { HeaderLogo } from "../assets/icon/HeaderLogo";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RecordAdd from "./RecordAdd";
import { useState } from "react";
import { CloseIcon } from "@/assets/icon/CloseIcon";
import { useAuth } from "./utils/AuthProvider";
import { IoIosLogOut } from "react-icons/io";

export const Header = () => {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const [openAdd, setOpenAdd] = useState(true);
  const { user, logout } = useAuth();

  const paths = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Records",
      path: "/records",
    },
  ];
  return (
    <div className="flex w-screen  py-4 bg-white ">
      <div className="w-[1440px] m-auto flex justify-between  ">
        <div className="flex w-[226px] gap-6 align-baseline ">
          <HeaderLogo />
          {paths.map((path, index) => (
            <Link key={index} href={path.path}>
              <div
                className="text-[#0F172A] font-normal"
                style={{
                  fontWeight: pathname === path.path ? "600" : "400",
                }}
              >
                {path.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex gap-6 px-12 ">
          <Button
            className="bg-[#0166FF] text-white w-fit flex gap-1 rounded-[20px] text-[16px] hover:bg-blue-400 "
            onClick={() => setOpen(!open)}
          >
            <PlusIcon /> Record
          </Button>
          <div>
            <Avatar className="" onClick={() => setOpenAdd(!openAdd)}>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div
              className={`  w-fit h-fit fixed  z-20 ${
                openAdd ? "invisible" : "visible"
              }  duration-150 `}
            >
              <div className="w-[300px] h-[300px] border border-[#D1D5DB] rounded-xl bg-white">
                <div className="px-8 py-6 h-fit grid gap-40 ">
                  <div className="flex items-center gap-2 ">
                    <Avatar className="" onClick={() => setOpenAdd(!openAdd)}>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-black">{user?.username}</p>
                  </div>

                  <Button
                    className="bg-[#0166FF] text-white w-fit flex gap-1 rounded-[20px] text-[16px] hover:bg-red-400 px-12"
                    onClick={logout}
                  >
                    <div className="flex gap-2">
                      <p>Log Out</p>
                      <div>
                        <IoIosLogOut size={24} />
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
              <div
                onClick={() => setOpenAdd(!openAdd)}
                className="absolute top-8 right-8"
              >
                <CloseIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <RecordAdd open={open} setOpen={setOpen} />
    </div>
  );
};
