"use client";

import { Article, getArticlesByCategory } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface MegaMenuProps {
  category: string | null;
  isVisible: boolean;
}

export function MegaMenu({ category, isVisible }: MegaMenuProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!category || !isVisible) return;

    setLoading(true);
    getArticlesByCategory(category)
      .then((data) => {
        setArticles(data.slice(0, 5));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [category, isVisible]);

  if (!isVisible || !category) return null;

  return (
    <div 
      className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl z-40 animate-in fade-in slide-in-from-top-2 duration-200"
      style={{ borderBottom: '1px solid #e5e7eb' }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-4">
            {articles.map((article, idx) => (
              <Link 
                key={idx} 
                href={article.url} // In real app, internal link
                target="_blank"
                className="group flex flex-col gap-2"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-md bg-gray-100">
                  {article.urlToImage ? (
                    <Image
                      src={article.urlToImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-xs">No Image</span>
                     </div>
                  )}
                </div>
                <h4 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-green-700 transition-colors text-right">
                  {article.title}
                </h4>
              </Link>
            ))}
            {articles.length === 0 && !loading && (
               <div className="col-span-5 text-center text-gray-400 py-4">
                 لا توجد أخبار
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
