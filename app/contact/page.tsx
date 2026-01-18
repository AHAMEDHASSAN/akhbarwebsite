import { Facebook, Instagram, Mail, Twitter } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "اتصل بنا | أخبار السعودية",
  description: "تواصل مع فريق أخبار السعودية",
};

export default function ContactPage() {
  return (
    <main className="w-full max-w-[1450px] mx-auto px-4 py-8 bg-white font-[family-name:var(--font-cairo)] min-h-[60vh]">
      
      {/* Title Section - Centered */}
      <div className="flex justify-center w-full mb-12">
         <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
            اتصل بنا
        </h1>
      </div>

      {/* 
         Layout Strategy:
         Content parallel to container (Right align in RTL).
         Icons (Sidebar) must be at the very start (Rights) of the container.
      */}
      <div className="flex flex-row items-start gap-5 relative mb-20 w-full justify-start">
        
        {/* Sidebar (Right Side) - Static now as requested */}
         <aside className="flex flex-col gap-3 w-fit pt-[6px]">
            <Link href="#" className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md">
                <Facebook className="w-6 h-6 fill-current" />
            </Link>
            <Link href="#" className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md">
                <Twitter className="w-6 h-6 fill-current" />
            </Link>
             <Link href="#" className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#BD081C] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md font-serif font-bold text-xl pb-1">
                 P
            </Link>
             <Link href="#" className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#999] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md">
                <Mail className="w-6 h-6" />
            </Link>
        </aside>

        {/* Main Content Area */}
        <div className="max-w-2xl text-right">
            
            {/* Paragraphs */}
            <div className="text-gray-900 text-lg md:text-[21px] leading-[1.7] font-bold space-y-7">
                <p>
                    يسعدنا تواصلك معنا عبر النموذج أدناه، سواء كنت ترغب بطرح استفسار، تقديم ملاحظة، اقتراح، أو بلاغ.
                    <br />
                    نحرص على الرد على جميع الرسائل خلال <span className="font-black">24 ساعة</span> من وقت الاستلام.
                </p>

                <p>
                    يمكنك أيضًا مراسلتنا مباشرة عبر البريد الإلكتروني:{" "}
                    <a href="mailto:info@news50.sa" className="font-extrabold relative inline-block group cursor-pointer transition-colors hover:text-[#28642E] mr-1">
                        info@news50.sa
                        <span className="absolute bottom-[4px] left-0 w-full h-[8px] bg-[#e5b545]/50 -z-10 group-hover:bg-[#e5b545]/80 transition-colors"></span>
                    </a>
                </p>

                <div className="pt-2">
                    <p className="mb-5">تابعنا على شبكات التواصل الاجتماعي للحصول على آخر الأخبار والتحديثات:</p>
                    
                    {/* Social Buttons */}
                    <div className="flex flex-col gap-4 max-w-xs mt-4">
                        <Link href="#" className="flex items-center justify-between px-6 py-3 rounded-xl bg-black text-white hover:opacity-80 transition-all shadow-sm group">
                            <span className="font-bold">تويتر (X)</span>
                            <Twitter className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </Link>

                        <Link href="#" className="flex items-center justify-between px-6 py-3 rounded-xl bg-gradient-to-l from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white hover:opacity-90 transition-all shadow-sm group">
                            <span className="font-bold">إنستقرام</span>
                            <Instagram className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </Link>

                        <Link href="#" className="flex items-center justify-between px-6 py-3 rounded-xl bg-[#FFFC00] text-black hover:brightness-95 transition-all shadow-sm group border border-gray-100">
                            <span className="font-bold">سناب شات</span>
                            {/* Snap Icon placeholder or using generic circle/ghost if available. Lucide doesn't have Snap. */}
                            <div className="w-5 h-5 rounded-full border-2 border-black group-hover:-translate-x-1 transition-transform"></div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}
