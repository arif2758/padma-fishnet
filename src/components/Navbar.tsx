"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";

import { signOut, useSession } from "next-auth/react";
import { Avatar, Button, Popover } from "antd";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { FaUserAstronaut } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const content = (
    <div>
      <div
        className={`focus-visible:text-blue-600 dark:focus-visible:text-blue-400 
transition-all duration-100 rounded text-gray-700 hover:text-blue-600 hover:bg-blue-100  `}
      >
        <Link
          href={"/profile"}
          className=" flex items-center space-x-2 px-2 py-1 !text-current !no-underline "
        >
          <FaUserAstronaut /> <span>Profile</span>
        </Link>
      </div>
      <div>
        {session && (
          <Link href={"#"} onClick={() => signOut()}>
            <div
              className="flex items-center space-x-2 px-2 py-1 rounded text-red-500 hover:text-red-700 hover:bg-blue-100 focus-visible:text-blue-600 dark:focus-visible:text-blue-400 
            transition-all duration-200"
            >
              <FiLogOut /> <span>Sign Out</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <nav className="sticky top-0 z-20 backdrop-blur-md bg-white/60 border-b border-gray-200/10 shadow-sm">
      <div className="max-w-8xl mx-auto px-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-padma-fishing-net.png"
                alt="পদ্মা ফিশিং নেট"
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="ml-1 text-lg font-semibold text-gray-900">
                পদ্মা ফিশিং নেট
              </span>
            </Link>
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              className={`flex items-center gap-2 px-2 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === "/"
                  ? "bg-gray-900/5 text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-900/5"
              }`}
            >
              <HiHome className="text-lg" />
              হোম
            </Link>

            {status === "loading" ? (
              <div>Loading...</div>
            ) : session ? (
              <Popover
                placement="bottomRight"
                title={
                  <div className="flex flex-col  space-x-2">
                    <span>{` ${session?.user?.name}`}</span>{" "}
                  </div>
                }
                content={content}
                trigger="click"
                open={popoverOpen}
                onOpenChange={() => setPopoverOpen((prev) => !prev)}
              >
                <Avatar
                  size={32}
                  icon={<UserOutlined />}
                  className="bg-blue-600 text-white"
                />
              </Popover>
            ) : (
              <Link href="/login">
                <Button type="primary" size="small">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
