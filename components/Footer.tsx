import { Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-0 mt-12 font-[family-name:var(--font-cairo)]">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Footer Logo */}
        <div className="mb-8">
             <Image
                src="/Logo.png"
                alt="أخبار السعودية"
                width={200}
                height={90}
                className="h-20 w-auto object-contain"
             />
        </div>

        {/* Social Links */}
        <div className="flex gap-4 mb-8">
          <Link href="#" className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-pink-600 transition-colors border border-[#333]">
            <Instagram className="w-5 h-5 text-white" />
          </Link>
          <Link href="#" className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-green-600 transition-colors border border-[#333]">
            <Twitter className="w-5 h-5 text-white" />
          </Link>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-12 text-base text-gray-400 font-medium">
            <Link href="#" className="hover:text-white transition-colors">آخر الأخبار</Link>
            <Link href="#" className="hover:text-white transition-colors">من نحن</Link>
            <Link href="#" className="hover:text-white transition-colors">اتصل بنا</Link>
            <Link href="#" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="bg-black py-6 text-center border-t border-[#222]">
        <p className="text-gray-500 text-sm dir-rtl">
          جميع الحقوق محفوظة لدى أخبار السعودية © 2022 .
        </p>
      </div>
    </footer>
  );
}
