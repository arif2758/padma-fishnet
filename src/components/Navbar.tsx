"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-20 backdrop-blur-md bg-white/60 border-b border-gray-200/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-2">
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
              <span className="ml-3 text-lg font-semibold text-gray-900">
                পদ্মা ফিশিং নেট
              </span>
            </Link>
          </div>
          <div className="flex ">
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
            <Link
              href="/profile"
              className={`flex items-center gap-2 px-2 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === "/profile"
                  ? "bg-gray-900/5 text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-900/5"
              }`}
            >
              <CgProfile className="text-lg" />
              প্রোফাইল
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
