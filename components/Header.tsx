import { AlignRight, Instagram, Search, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white py-4 md:py-8">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between relative">
        {/* Right Side: Socials (Desktop) / Menu (Mobile) */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Icon */}
          <button className="md:hidden text-gray-900 hover:text-green-700">
            <AlignRight className="w-8 h-8" />
          </button>

          {/* Social Icons (Desktop Only) */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-pink-600 transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-green-600 transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Logo (Center) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <Link href="/">
            <Image
              src="/Logo.png"
              alt="أخبار السعودية"
              width={260}
              height={120}
              className="h-20 md:h-32 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Actions (End/Left in RTL) */}
        <div className="flex items-center gap-4">
          <button className="text-gray-900 hover:text-green-700 transition-colors">
            <Search className="w-6 h-6 md:border-b-2 md:border-transparent md:hover:border-green-700 md:pb-1" />
          </button>
        </div>
      </div>
    </header>
  );
}
