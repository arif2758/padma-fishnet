"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-20 backdrop-blur-md bg-white/60 border-b border-gray-200/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16">
          <div className="flex space-x-4">
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
