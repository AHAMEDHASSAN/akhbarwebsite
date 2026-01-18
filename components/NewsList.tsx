"use client";

import { useState } from "react";
import { NewsCard } from "./NewsCard";

interface ArticleProps {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  image: string | null;
  source?: string;
}

interface NewsListProps {
  articles: ArticleProps[];
}

export function NewsList({ articles }: NewsListProps) {
  const [visibleCount, setVisibleCount] = useState(6);

  const showMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      {articles.slice(0, visibleCount).map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}

      {visibleCount < articles.length && (
        <div className="flex justify-center mt-8 pb-4">
          <button
            onClick={showMore}
            className="group relative px-8 py-3 bg-white text-green-700 font-bold rounded-full border-2 border-green-700 shadow-sm hover:bg-green-700 hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg flex items-center gap-2"
          >
            <span>المزيد من الأخبار</span>
            {/* Simple arrow or spinner if needed, sticking to simple text as requested but 'pro' style */}
            <svg 
              className="w-5 h-5 group-hover:translate-y-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {articles.length === 0 && (
         <div className="text-center py-20 text-gray-500">
           لا توجد أخبار متاحة حالياً في هذا القسم.
         </div>
      )}
    </div>
  );
}
