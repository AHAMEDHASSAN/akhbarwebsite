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

interface CategorySectionProps {
  title: string;
  href: string;
  articles: ArticleProps[];
  layout?: "grid" | "row";
}

const FALLBACK_IMAGES: Record<string, string> = {
  "الرياضة": "https://images.unsplash.com/photo-1579952363873-27f3bde9be2b?auto=format&fit=crop&w=800&q=80",
  "السياسة": "https://images.unsplash.com/photo-1529107386312-7a42f0586e6e?auto=format&fit=crop&w=800&q=80",
  "تكنولوجيا": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
  "ثقافة وفن": "https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&w=800&q=80",
};

export function CategorySection({ title, href, articles, layout = "grid" }: CategorySectionProps) {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const fallbackSrc = FALLBACK_IMAGES[title] || "https://placehold.co/600x400/28642E/FFF?text=News50";

  if (articles.length === 0) return null;

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="flex items-center justify-center mb-12 mt-16 relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t-2 border-gray-400"></div>
        </div>
        <div className="relative bg-[#28642E] text-white px-6 py-1 font-bold text-lg transform -skew-x-[15deg] shadow-md">
          <span className="inline-block transform skew-x-[15deg]">{title}</span>
        </div>
      </div>

      {layout === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Main Featured Article */}
          <div className="md:col-span-8 relative group overflow-hidden rounded-xl aspect-auto bg-gray-100 h-[200px] md:h-full">
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
                    src={fallbackSrc}
                    alt={articles[0].title}
                    fill
                    className="object-cover opacity-80"
                    unoptimized
                  />
              )}
              {/* Overlay with Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end items-center md:items-end p-5 sm:p-6 text-center md:text-right">
                <span className="bg-[#28642E] text-white px-2 py-0.5 text-[10px] font-bold w-fit mb-2 sm:mb-3 transform -skew-x-12">
                  <span className="inline-block transform skew-x-12">{title}</span>
                </span>
                <h3 className="text-xl sm:text-xl md:text-2xl font-black text-white leading-tight group-hover:underline line-clamp-2 md:line-clamp-3 w-full">
                  {articles[0].title}
                </h3>
              </div>
            </Link>
          </div>

          {/* Side List (3 Articles) */}
          <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 md:grid-rows-3 gap-4">
            {articles.slice(1, 4).map((article) => (
              <div key={article.id} className="relative group overflow-hidden rounded-xl aspect-auto h-[200px] md:h-full min-h-[150px]">
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
                    <div className="w-full h-full flex items-center justify-center text-[10px]">No Image</div>
                  )}
                  {/* Overlay with Text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end items-center md:items-end p-4 text-center md:text-right">
                    <span className="bg-[#28642E] text-white px-2 py-0.5 text-[8px] font-bold w-fit mb-1 transform -skew-x-12">
                      <span className="inline-block transform skew-x-12">{title}</span>
                    </span>
                    <h4 className="text-sm md:text-sm font-bold text-white leading-snug group-hover:underline line-clamp-2 w-full">
                      {article.title}
                    </h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.slice(0, 4).map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`} className="group">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-3 bg-gray-100">
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
                  <div className="w-full h-full bg-gray-200">
                    <Image
                      src={fallbackSrc}
                      alt={article.title}
                      fill
                      className="object-cover opacity-80"
                      unoptimized
                    />
                  </div>
                )}
              </div>
              <h3 className="text-md font-bold text-gray-900 leading-tight group-hover:text-[#28642E] transition-colors text-center md:text-right line-clamp-2">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>
      )}

      {/* View More Link at bottom */}
      <div className="flex justify-center md:justify-end mt-6">
        <Link href={href} className="text-gray-400 hover:text-[#28642E] text-xs font-bold transition-colors uppercase tracking-widest flex items-center gap-2">
          <span>MORE {title}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
