"use client";

import { Instagram, Menu, Search, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SearchOverlay } from "./SearchOverlay";
import { SideMenu } from "./SideMenu";

export function Header() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white py-4 md:py-6 relative border-b border-gray-100">
      <div className="max-w-[1450px] mx-auto px-4 flex items-center justify-between h-20 md:h-32 relative">
        
        {/* Mobile: Hamburger Menu (Right side in RTL) */}
        <div className="flex md:hidden items-center z-10">
          <button 
            onClick={() => setIsSideMenuOpen(true)}
            className="text-gray-800 hover:text-green-700"
          >
            <Menu className="w-9 h-9 stroke-[2.5]" />
          </button>
        </div>

        {/* Logo (Centered) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/">
            <Image
              src="/Logo.png"
              alt="أخبار السعودية"
              width={450}
              height={200}
              className="h-20 md:h-36 w-auto object-contain"
              priority
              quality={100}
            />
          </Link>
        </div>

        {/* Mobile: Search Icon (Left side in RTL) */}
        <div className="flex md:hidden items-center z-10">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="text-gray-800 hover:text-green-700"
          >
            <Search className="w-8 h-8 stroke-[3]" />
          </button>
        </div>

        {/* Desktop Right Side (Social Icons) */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="#" className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white hover:bg-pink-600 transition-colors">
            <Instagram className="w-6 h-6" />
          </Link>
          <Link href="#" className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white hover:bg-[#1DA1F2] transition-colors">
            <Twitter className="w-6 h-6" />
          </Link>
        </div>

        {/* Desktop Left Side (Spacer to balance the social icons) */}
        <div className="hidden md:block w-32"></div>
      </div>

      {/* Side Menu & Search Overlay (for mobile triggers) */}
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
