"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

interface HeroSectionProps {
  articles: ArticleProps[];
}

export function HeroSection({ articles }: HeroSectionProps) {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  if (articles.length === 0) return null;

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 4);

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 mb-8">
      {/* Main Feature */}
      <div className="md:col-span-8 relative group overflow-hidden rounded-lg md:rounded-xl aspect-[16/9] md:aspect-auto h-[250px] sm:h-[350px] md:h-full">
        <Link href={`/article/${mainArticle.slug}`}>
          {!imgErrors[mainArticle.id] && mainArticle.image ? (
            <Image
              src={mainArticle.image}
              alt={mainArticle.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              unoptimized
              onError={() => handleImageError(mainArticle.id)}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">No Image</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end items-center md:items-end p-4 md:p-10 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2 sm:mb-4">
               <span className="bg-[#28642E] text-white px-2 py-0.5 text-[9px] md:text-sm font-bold w-fit rounded-sm shadow-sm">
                {mainArticle.category}
              </span>
              <span className="text-white/80 text-[9px] md:text-sm">{mainArticle.date}</span>
            </div>
            <h2 className="text-lg md:text-3xl lg:text-5xl font-black text-white leading-tight mb-2 group-hover:underline line-clamp-2 md:line-clamp-none w-full">
              {mainArticle.title}
            </h2>
            <p className="hidden md:block text-gray-100 text-sm md:text-lg line-clamp-2 max-w-3xl opacity-90 mx-auto md:mx-0">
              {mainArticle.summary}
            </p>
          </div>
        </Link>
      </div>

      {/* Side Grid - Smaller and Tighter */}
      <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 md:grid-rows-3 gap-2 md:gap-4 mt-3 md:mt-0">
        {sideArticles.map((article) => (
          <div 
            key={article.id} 
            className="relative group overflow-hidden rounded-lg md:rounded-xl aspect-[16/9] md:aspect-auto h-[180px] md:h-full min-h-[150px]"
          >
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
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-[10px]">No Image</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end items-center md:items-end p-3 text-center md:text-right">
                 <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                    <span className="bg-[#28642E] text-white px-2 py-0.5 text-[8px] md:text-[10px] font-bold w-fit rounded-sm">
                      {article.category}
                    </span>
                 </div>
                <h3 className="text-[11px] md:text-sm lg:text-base font-bold text-white leading-snug group-hover:underline line-clamp-2 drop-shadow-lg w-full">
                  {article.title}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
