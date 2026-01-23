"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NewsCardProps {
  article: {
    id: string;
    slug: string;
    title: string;
    summary: string;
    category: string;
    date: string;
    image: string | null;
    source?: string;
  };
}

export function NewsCard({ article }: NewsCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link 
      href={`/article/${article.slug}`}
      className="group relative flex flex-col md:flex-row gap-0 md:gap-6 py-0 md:py-4 bg-transparent md:bg-white border-b-0 md:border-b border-gray-200 last:border-0 hover:bg-transparent md:hover:bg-gray-50 transition-all items-stretch md:items-start mb-4 md:mb-0 rounded-xl md:rounded-none overflow-hidden md:overflow-visible shadow-md md:shadow-none h-[200px] md:h-auto"
    >
      
      {/* Image Container */}
      {/* Mobile: Absolute Fill (Overlay). Desktop: Fixed Block (Side) */}
      <div className="absolute inset-0 md:relative md:inset-auto w-full h-full md:w-[280px] lg:w-[350px] md:h-[200px] flex-shrink-0 bg-gray-100 md:rounded-lg md:border border-gray-200 md:shadow-sm z-0">
        {!imageError && article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-300 bg-gray-50">
           <span className="text-xs">No Image</span>
          </div>
        )}
        
        {/* Mobile Gradient Overlay - Stronger at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:hidden"></div>
      </div>

      {/* Text Content */}
      {/* Mobile: Overlay Centered. Desktop: Side Block */}
      <div className="relative md:static z-10 flex-1 flex flex-col items-center md:items-stretch justify-end md:justify-start text-center md:text-right w-full min-w-0 h-full md:h-auto p-4 md:p-0">
        
        {/* Meta Row */}
        <div className="flex items-center justify-center md:justify-start gap-2 mb-2 md:mb-3 text-xs md:text-sm font-medium text-gray-300 md:text-gray-500">
          <div className="relative inline-block bg-[#28642E] text-white px-2 py-0.5 font-bold text-[10px] md:text-[12px] transform -skew-x-[15deg]">
            <span className="inline-block transform skew-x-[15deg]">{article.category || "المحلية"}</span>
          </div>
          <span className="text-gray-300 md:text-gray-400">/</span>
          <span dir="rtl" className="text-white md:text-gray-500">{article.date || "منذ ساعة"}</span>
        </div>
        
        {/* Title */}
        <h3 className="text-lg md:text-[22px] font-black text-white md:text-gray-900 leading-snug md:leading-[1.3] mb-1 md:mb-3 group-hover:underline md:group-hover:text-green-700 md:group-hover:no-underline transition-colors line-clamp-2 md:line-clamp-3 w-full md:w-[95%]">
          {article.title}
        </h3>
        
        {/* Summary (Hidden on mobile) */}
        <p className="hidden md:block text-gray-500 leading-relaxed text-sm md:text-base line-clamp-2 md:line-clamp-2 font-light">
          {article.summary}
        </p>

      </div>
    </Link>
  );
}
