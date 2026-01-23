"use client";

import Link from "next/link";
import { useState } from "react";
import { MegaMenu } from "./MegaMenu";
import { SearchOverlay } from "./SearchOverlay";
import { SideMenu } from "./SideMenu";

const links = [
  { name: "الأخبار المحلية", href: "/general", slug: "general" },
  { name: "السياسة", href: "/politics", slug: "politics" },
  { name: "الرياضة", href: "/sports", slug: "sports" },
  { name: "الثقافة و الفن", href: "/entertainment", slug: "entertainment" },
  { name: "العلوم", href: "/science", slug: "science" },
  { name: "التكنولوجيا", href: "/technology", slug: "technology" },
  { name: "آخر الأخبار", href: "/general", slug: "general" },
  { name: "الصحة", href: "/health", slug: "health" },
];

export function NavBar() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav 
        className="bg-white sticky top-0 z-50 hidden md:block border-y border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]"
        onMouseLeave={() => setHoveredCategory(null)}
      >
        <div className="max-w-[1450px] mx-auto px-6 sm:px-12 md:px-20 lg:px-32">
          <div className="flex items-center justify-between py-4">
            
            {/* Right Side: Hamburger Menu */}
            <div className="flex items-center">
              <button 
                className="text-gray-900 hover:text-green-700"
                onClick={() => setIsSideMenuOpen(true)}
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Center: Links */}
            <ul className="flex items-center gap-8 font-bold text-gray-800 h-full">
              {links.map((link) => (
                <li 
                  key={link.name} 
                  className="h-full flex items-center"
                  onMouseEnter={() => setHoveredCategory(link.slug)}
                >
                  <Link
                    href={link.href}
                    className={`transition-colors text-[17px] py-1 border-b-2 ${hoveredCategory === link.slug ? 'text-green-700 border-green-700' : 'border-transparent hover:text-green-700'}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Left Side: Search Icon */}
            <div className="flex items-center">
              <button 
                className="text-gray-900 hover:text-green-700 p-1"
                onClick={() => setIsSearchOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* Mega Menu Container */}
        <MegaMenu category={hoveredCategory} isVisible={!!hoveredCategory} />
      </nav>

      {/* Side Menu */}
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
