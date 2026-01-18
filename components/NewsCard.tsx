"use client";

import Image from "next/image";
import { useState } from "react";

interface NewsCardProps {
  article: {
    id: string;
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
    <div className="flex flex-row gap-6 py-4 bg-white border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors group items-start">
      
      {/* Image (Left in Arabic/RTL) 
          Target: Wide rectangle, e.g., 400x225 (16:9)
      */}
      <div className="w-[140px] h-[90px] md:w-[550px] md:h-[310px] relative rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200 shadow-sm">
        {!imageError && article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-300 bg-gray-50">
           <span className="text-xs">No Image</span>
          </div>
        )}
      </div>

      {/* Text Content (Right) */}
      <div className="flex-1 flex flex-col items-stretch text-right max-w-[350px]">
        
        {/* Meta Row: Category / Time */}
        <div className="flex items-center gap-2 mb-3 text-xs md:text-sm text-gray-500 font-medium">
          <span className="text-gray-900 font-bold">{article.category || "أخبار"}</span>
          <span className="text-gray-400">/</span>
          <span dir="rtl">{article.date || "منذ ساعة"}</span>
        </div>
        
        {/* Title */}
        <h3 className="text-base md:text-[28px] font-black text-gray-900 leading-[1.3] mb-4 group-hover:text-green-700 transition-colors line-clamp-3">
          {article.title}
        </h3>
        
        {/* Summary (Hidden on mobile usually, or kept small) */}
        <p className="hidden md:block text-gray-500 leading-relaxed text-base line-clamp-2 md:line-clamp-3 font-light">
          {article.summary}
        </p>

      </div>
    </div>
  );
}
