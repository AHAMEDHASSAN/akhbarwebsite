"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NewsCard } from "./NewsCard";

const FALLBACK_SRC = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80"; // Generic News Fallback

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
  children?: React.ReactNode;
}

export function NewsList({ articles, children }: NewsListProps) {
  const INITIAL_COUNT = 4;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const showMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      {/* Top Section: Desktop Grid (1 Main + 3 Side) */}
      <div className="hidden md:grid grid-cols-12 gap-4">
          {/* Main Article */}
          {articles[0] && (
            <div className="col-span-8 relative group overflow-hidden rounded-xl bg-gray-100 h-[500px]">
              <Link href={`/article/${articles[0].slug}`}>
                {!imgErrors[articles[0].id] && articles[0].image ? (
                  <Image
                    src={articles[0].image}
                    alt={articles[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                    onError={() => handleImageError(articles[0].id)}
                  />
                ) : (
                  <Image
                    src={FALLBACK_SRC}
                    alt={articles[0].title}
                    fill
                    className="object-cover opacity-80"
                    unoptimized
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end items-end p-8 text-right">
                  <span className="bg-[#28642E] text-white px-2 py-0.5 text-sm font-bold w-fit mb-3 transform -skew-x-12">
                     <span className="inline-block transform skew-x-12">آخر الأخبار</span>
                  </span>
                  <h3 className="text-3xl font-black text-white leading-tight group-hover:underline w-full">
                    {articles[0].title}
                  </h3>
                </div>
              </Link>
            </div>
          )}

          {/* Side Articles */}
          <div className="col-span-4 grid grid-rows-3 gap-4 h-[500px]">
            {articles.slice(1, 4).map((article) => (
              <div key={article.id} className="relative group overflow-hidden rounded-xl bg-gray-100 h-full">
                <Link href={`/article/${article.slug}`}>
                  {!imgErrors[article.id] && article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                      onError={() => handleImageError(article.id)}
                    />
                  ) : (
                    <Image
                      src={FALLBACK_SRC}
                      alt={article.title}
                      fill
                      className="object-cover opacity-80"
                      unoptimized
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end items-end p-4 text-right">
                    <span className="bg-[#28642E] text-white px-2 py-0.5 text-[10px] font-bold w-fit mb-1 transform -skew-x-12">
                       <span className="inline-block transform skew-x-12">آخر الأخبار</span>
                    </span>
                    <h4 className="text-sm font-bold text-white leading-tight group-hover:underline line-clamp-2 w-full">
                      {article.title}
                    </h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
      </div>

      {/* Top Section: Mobile List (Original Style) */}
      <div className="md:hidden flex flex-col gap-4">
        {articles.slice(0, INITIAL_COUNT).map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {/* Middle Content (Categories, Hero, etc.) */}
      {children}

      {/* Bottom Section: Loaded Articles */}
      {articles.slice(INITIAL_COUNT, visibleCount).map((article) => (
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
