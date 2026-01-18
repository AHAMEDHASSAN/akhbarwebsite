"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchValue, setSearchValue] = useState("");

  // Prevent scrolling when search is open
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-300">
      {/* Background with Blur */}
      <div 
        className="absolute inset-0 bg-gray-900/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-8 left-8 text-white hover:text-green-500 transition-colors z-[110]"
      >
        <X className="w-12 h-12" />
      </button>

      {/* Search Content */}
      <div className="relative w-full max-w-4xl px-4 flex flex-col items-center z-[110]">
        <h2 className="text-white text-5xl md:text-8xl font-black mb-12 tracking-tighter opacity-20 select-none">SEARCH</h2>
        
        <div className="w-full flex flex-col items-center gap-6">
          <input 
            type="text"
            placeholder="ابحث عن الأخبار..."
            autoFocus
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full bg-transparent border-b-2 border-white/30 text-white text-2xl md:text-5xl py-4 focus:outline-none focus:border-green-500 transition-colors text-center font-bold"
          />
          
          <button 
            className="px-12 py-4 bg-green-700 text-white font-bold rounded-full hover:bg-green-600 transition-all transform hover:scale-105 active:scale-95 text-xl"
          >
            بحث
          </button>
        </div>
      </div>
    </div>
  );
}
