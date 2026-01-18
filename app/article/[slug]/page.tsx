import { getArticleBySlug, getArticlesByCategory } from "@/lib/api";
import { Facebook, Instagram, Link as LinkIcon, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ArticlePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Fetch related articles (same category, exclude current)
  const relatedArticles = await getArticlesByCategory("general");
  // Filter out the current article
  const filteredRelated = relatedArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <main className="w-full max-w-[1450px] mx-auto px-4 py-8 bg-white font-[family-name:var(--font-cairo)]">
      
      {/* Article Header */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-3 text-sm md:text-base text-gray-500 font-medium">
            <div className="relative inline-block bg-[#28642E] text-white px-3 py-1 font-bold text-xs md:text-sm transform -skew-x-[15deg]">
                <span className="inline-block transform skew-x-[15deg]">{article.categoryId === 200 ? "أخبار المحلية" : "أخبار"}</span>
            </div>
            <span className="text-gray-300">|</span>
             {/* Date */}
            <span dir="rtl">
                {new Date(article.publishedAt).toLocaleDateString("ar-SA", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })}
            </span>
        </div>

        <h1 className="text-2xl md:text-3xl lg:text-[40px] font-black leading-[1.3] text-gray-900 mt-2">
            {article.title}
        </h1>
      </div>

       {/* Featured Image - NOW FULL WIDTH/OUTSIDE FLEX */}
       <div className="relative w-full aspect-video md:h-[500px] md:aspect-auto rounded-xl overflow-hidden mb-8 shadow-sm border border-gray-100">
            {article.urlToImage ? (
                <Image
                    src={article.urlToImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                />
            ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    لا توجد صورة
                </div>
            )}
        </div>


      {/* Main Layout: Sidebar (Share) + Content */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
        
        {/* Sticky Social Sidebar (Desktop) */}
        {/* In RTL, the "start" is right. We want it on the side. 
            Usually sidebar is on the right for English (left content), or left for English (left content). 
            For Arabic (RTL), "flex-row" puts first child on Right.
            User Image shows sidebar on the Right (next to content).
            
            If I put <aside> first in RTL, it appears on the Right.
            Let's check the user image again. 
            The image shows [Title] -> [Image] -> [Sidebar (Right) | Content (Left)].
            Wait, standard Arabic layout often has sidebar on the Left?
            In the provided image "uploaded_image_1768735554067.png", the sidebar is on the **RIGHT** of the content (between the content and the edge? or content is full width?).
            Actually looking closely at the screenshot:
            The little circles (FB, Twitter) are on the RIGHT side of the text content.
            So in RTL (Right to Left), the "first" element is on the Right.
            So <aside> should be the first child in flex container.
        */}
        <aside className="hidden lg:flex flex-col gap-4 w-12 pt-2">
            <Link href="#" className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform">
                <Facebook className="w-5 h-5 fill-current" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:scale-110 transition-transform">
                <Twitter className="w-5 h-5 fill-current" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform">
                 <Instagram className="w-5 h-5" />
            </Link>
             <Link href="#" className="w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center hover:scale-110 transition-transform">
                <LinkIcon className="w-5 h-5" />
            </Link>
        </aside>

        {/* Main Content Column */}
        <div className="flex-1 max-w-4xl">
            
            {/* Content Body */}
            <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-p:leading-relaxed prose-p:text-gray-700 prose-img:rounded-xl text-right" dir="rtl">
                <div dangerouslySetInnerHTML={{ __html: article.content || article.description }} />
            </div>

             {/* Tags / Categories (Optional - adding a separator) */}
            <div className="my-12 border-t border-gray-100"></div>

            {/* Related News Section */}
             <div>
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-6 bg-[#28642E]"></div>
                    <h3 className="text-xl font-bold text-gray-900">أخبار ذات صلة</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRelated.map((item, index) => (
                         <Link key={index} href={`/article/${item.slug}`} className="group flex flex-col gap-3">
                            <div className="relative w-full h-[200px] rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                {item.urlToImage ? (
                                    <Image 
                                        src={item.urlToImage}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        unoptimized
                                    />
                                ) : null}
                            </div>
                            <h4 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-[#28642E] transition-colors line-clamp-2">
                                {item.title}
                            </h4>
                            <span className="text-xs text-gray-500">
                                {new Date(item.publishedAt).toLocaleDateString("ar-SA", { day: "numeric", month: "long" })}
                            </span>
                         </Link>
                    )
                    )}
                </div>
             </div>
        </div>
      </div>
    </main>
  );
}
