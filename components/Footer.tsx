import { Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-0 mt-12 font-[family-name:var(--font-cairo)]">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="mb-8 flex items-center justify-center">
             <Image
                src="/LogoNewUbdate2 .png"
                alt="أخبار السعودية"
                width={450}
                height={200}
                className="h-24 md:h-32 w-auto object-contain"
                quality={100}
             />
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8">
          <Link href="https://instagram.com/saudinews50" target="_blank" className="flex items-center justify-center w-12 h-12 rounded-full bg-[#222] text-white hover:bg-pink-600 transition-colors">
            <Instagram className="w-6 h-6" />
          </Link>
          <Link href="https://twitter.com/saudinews50" target="_blank" className="flex items-center justify-center w-12 h-12 rounded-full bg-[#222] text-white hover:bg-[#1DA1F2] transition-colors">
            <Twitter className="w-6 h-6" />
          </Link>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 text-base text-gray-400 font-medium">
            <Link href="#" className="hover:text-white transition-colors">آخر الأخبار</Link>
            <Link href="#" className="hover:text-white transition-colors">من نحن</Link>
            <Link href="/contact" className="hover:text-white transition-colors">اتصل بنا</Link>
            <Link href="#" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="bg-black py-6 text-center border-t border-[#222]">
        <p className="text-gray-300 text-sm dir-rtl font-bold font-size-2xl">
         جميع الحقوق محفوظه ل <span className="text-green-500 font-bold text-2xl">Jikarnow</span>
        </p>
      </div>
    </footer>
  );
}
