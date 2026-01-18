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

                        <Link href="https://www.snapchat.com/@nfh_0?locale=ar_SA%40calendar%3Dgregorian&sid=a426fdf97202481f9537d1ff6b75ddda&share_id=lzCVd_IuStaluUDXw_Qelw&invite_id=0K-qWb_H" target="_blank" className="flex items-center justify-between px-6 py-3 rounded-xl bg-[#FFFC00] text-black hover:brightness-95 transition-all shadow-sm group border border-gray-100">
                            <span className="font-bold">سناب شات</span>
                            {/* Snap Icon placeholder or using generic circle/ghost if available. Lucide doesn't have Snap. */}
                            <div className="w-5 h-5 rounded-full border-2 border-black group-hover:-translate-x-1 transition-transform"></div>
                        </Link>

                        <Link href="https://www.tiktok.com/@jikarnow?_r=1&_d=em0hec149829bj&sec_uid=MS4wLjABAAAAaPov72r5XDkjTNYNHFLMHEEqZpJJ2G96B_OCmWV1lZv_EPdkeuS_UnZIVHemXu-v&share_author_id=7229268994460435458&sharer_language=ar&source=h5_m&u_code=e7k76760a9meb7&item_author_type=1&utm_source=copy&tt_from=copy&enable_checksum=1&utm_medium=ios&share_link_id=224155D0-8B40-4AFA-BE33-B45FF3E74504&user_id=7229268994460435458&sec_user_id=MS4wLjABAAAAaPov72r5XDkjTNYNHFLMHEEqZpJJ2G96B_OCmWV1lZv_EPdkeuS_UnZIVHemXu-v&social_share_type=4&ug_btm=b8727,b0&utm_campaign=client_share&share_app_id=1233" target="_blank" className="flex items-center justify-between px-6 py-3 rounded-xl bg-black text-white hover:opacity-80 transition-all shadow-sm group">
                            <span className="font-bold">تيك توك</span>
                            <svg className="w-5 h-5 fill-current group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.55-1.1-.06-.06-.15-.14-.24-.22v6.23c0 4.14-3.36 7.5-7.5 7.5-4.14 0-7.5-3.36-7.5-7.5s3.36-7.5 7.5-7.5c1.03 0 2.02.21 2.94.59v4.13c-.56-.23-1.17-.35-1.78-.35-2.58 0-4.66 2.08-4.66 4.66s2.08 4.66 4.66 4.66c2.58 0 4.66-2.08 4.66-4.66V.02Z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}
