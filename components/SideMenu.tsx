"use client";

import { Instagram, Twitter, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { name: "الأخبار المحلية", href: "/general" },
  { name: "السياسة", href: "/politics" },
  { name: "الرياضة", href: "/sports" },
  { name: "الثقافة و الفن", href: "/entertainment" },
  { name: "الأزياء", href: "/fashion" }, // Added from screenshot if needed, or stick to existing
  { name: "التكنولوجيا", href: "/technology" },
  { name: "آخر الأخبار", href: "/general" },
  { name: "التقارير", href: "/reports" }, // Added from screenshot
];

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div 
      className={`fixed inset-0 z-[60] flex justify-start transition-visibility duration-700 ${
        isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-700 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`relative w-full max-w-[400px] h-full bg-white shadow-2xl flex flex-col transition-transform duration-700 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          {/* Spacer to balance Close icon (Now on Right in RTL) */}
          <div className="w-12"></div>
          
          <div className="flex-1 flex justify-center">
             <Image 
               src="/LogoNewUbdate2 .png" 
               alt="Logo" 
               width={250} 
               height={120} 
               className="h-24 w-auto object-contain" 
               quality={100}
             />
          </div>
          
          {/* Close Button (Now on Left in RTL) */}
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-red-500 transition-colors">
            <X className="w-10 h-10" />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col px-4">
            {links.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href}
                  className="block py-4 text-right text-lg text-gray-800 font-bold hover:text-green-700 transition-colors border-b border-gray-300"
                  onClick={onClose}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-100">
          <p className="text-center text-xs text-gray-400 mb-4 font-bold tracking-widest">CONNECT WITH US</p>
          <div className="flex items-center gap-4 py-8 px-8 border-b border-gray-100">
            <Link href="https://instagram.com/saudinews50" target="_blank" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="https://twitter.com/saudinews50" target="_blank" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
