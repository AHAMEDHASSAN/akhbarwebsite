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
    <header className="bg-white py-2 md:py-6 relative border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1450px] mx-auto px-6 sm:px-12 md:px-20 lg:px-32 flex items-center justify-between h-14 md:h-32 relative">
        
        {/* Mobile: Hamburger Menu (Right side in RTL) */}
        <div className="flex md:hidden items-center z-10">
          <button 
            onClick={() => setIsSideMenuOpen(true)}
            className="text-gray-800 hover:text-green-700"
          >
            <Menu className="w-7 h-7 stroke-[2]" />
          </button>
        </div>

        {/* Logo (Centered) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <Link href="/">
            <Image
              src="/LogoNewUbdate2 .png"
              alt="أخبار السعودية"
              width={350}
              height={150}
              className="h-14 md:h-32 w-auto object-contain"
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
            <Search className="w-6 h-6 stroke-[2]" />
          </button>
        </div>

        {/* Desktop Right Side (Social Icons) */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="https://instagram.com/saudinews50" target="_blank" className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white hover:bg-pink-600 transition-colors">
            <Instagram className="w-6 h-6" />
          </Link>
          <Link href="https://twitter.com/saudinews50" target="_blank" className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white hover:bg-[#1DA1F2] transition-colors">
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
