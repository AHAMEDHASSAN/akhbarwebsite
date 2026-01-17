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
    <div className="flex flex-row gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors group">
      {/* Image (Right in RTL, Fixed width on Mobile) */}
      <div className="w-[120px] h-[90px] md:w-[280px] md:h-[180px] relative rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center border border-gray-200">
        {!imageError && article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
            unoptimized // Allow external images
          />
        ) : (
          /* Fallback Icon */
          <div className="flex flex-col items-center justify-center text-gray-400 gap-2 w-full h-full">
            <svg className="w-8 h-8 md:w-12 md:h-12 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span className="text-[10px] md:text-sm font-medium opacity-50 px-2 text-center" suppressHydrationWarning>
              {article.source || article.category}
            </span>
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className="flex-1 flex flex-col justify-start">
        <div className="flex items-center gap-2 mb-1 md:mb-2 text-[10px] md:text-xs text-gray-500">
          <span className="font-bold text-gray-700">{article.source || article.category}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span suppressHydrationWarning>{article.date}</span>
        </div>
        
        <h3 className="text-sm md:text-xl lg:text-2xl font-bold text-gray-900 mb-1 md:mb-3 leading-snug group-hover:text-green-700 transition-colors line-clamp-3 md:line-clamp-none">
          {article.title}
        </h3>
        
        <p className="hidden md:block text-gray-600 leading-relaxed text-sm md:text-base line-clamp-2">
          {article.summary}
        </p>
      </div>
    </div>
  );
}
