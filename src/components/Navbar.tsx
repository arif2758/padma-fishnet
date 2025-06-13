"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-20 backdrop-blur-md bg-white/60 border-b border-gray-200/10 shadow-sm">
      <div className="max-w-7xl  px-4">
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
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === "/"
                  ? "bg-gray-900/5 text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-900/5"
              }`}
            >
              হোম
            </Link>
            <Link
              href="/profile"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === "/profile"
                  ? "bg-gray-900/5 text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-900/5"
              }`}
            >
              প্রোফাইল
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
