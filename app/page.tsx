import { CategorySection } from "@/components/CategorySection";
import { HeroSection } from "@/components/HeroSection";
import { NewsList } from "@/components/NewsList";
import { getArticlesByCategory } from "@/lib/api";

export default async function Home() {
  // Fetch diverse categories for the multi-section layout
  const [
    generalArticles,
    sportsArticles,
    politicsArticles,
    techArticles,
    entertainmentArticles
  ] = await Promise.all([
    getArticlesByCategory("general"),
    getArticlesByCategory("sports"),
    getArticlesByCategory("politics"),
    getArticlesByCategory("technology"),
    getArticlesByCategory("entertainment")
  ]);

  const format = (articles: any[], categoryName: string, limit: number = 5) => {
    // Separate articles with and without images
    const withImages = articles.filter(a => a.urlToImage);
    const withoutImages = articles.filter(a => !a.urlToImage);
    
    // Combine them, prioritizing those with images
    const combined = [...withImages, ...withoutImages].slice(0, limit);

    return combined.map((article, index) => ({
      id: `${categoryName}-${index}-${article.slug}`,
      slug: article.slug,
      title: article.title,
      summary: article.description,
      category: categoryName,
      date: article.publishedAt
        ? new Date(article.publishedAt).toLocaleDateString("ar-SA", { day: "numeric", month: "long", year: "numeric" })
        : "منذ ساعة",
      image: article.urlToImage,
      source: article.source.name
    }));
  };

  const heroArticles = format(generalArticles, "أخبار الساعة", 5);
  const sports = format(sportsArticles, "الرياضة", 5);
  const politics = format(politicsArticles, "السياسة", 5);
  const tech = format(techArticles, "تكنولوجيا", 5);
  const art = format(entertainmentArticles, "ثقافة وفن", 5);
  
  // Remaining general articles for the bottom feed (skip first 5 used in hero)
  const remainingGeneral = format(generalArticles.slice(5), "آخر الأخبار", 10);

  return (
    <main className="flex-1 w-full max-w-[1450px] mx-auto px-6 sm:px-12 md:px-20 lg:px-32 py-8 overflow-x-hidden">
      
      {/* 1. Infinite Feed (Top Part) + Wrapper for other content + Load More (Bottom Part) */}
      <section className="mb-12">
        <div className="flex items-center justify-center mb-12 mt-4 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t-2 border-gray-400"></div>
          </div>
          <div className="relative bg-[#28642E] text-white px-6 py-1 font-bold text-lg transform -skew-x-[15deg] shadow-md">
            <span className="inline-block transform skew-x-[15deg]">آخر الأخبار</span>
          </div>
        </div>
        
        <NewsList articles={remainingGeneral}>
          <div className="space-y-16 mt-16 mb-8">
            {/* 2. Category Blocks */}
            <CategorySection 
              title="السياسة" 
              href="/politics" 
              articles={politics} 
              layout="grid" 
            />

            <CategorySection 
              title="الرياضة" 
              href="/sports" 
              articles={sports} 
              layout="row" 
            />

            <CategorySection 
              title="ثقافة وفن" 
              href="/entertainment" 
              articles={art} 
              layout="grid" 
            />

            <CategorySection 
              title="تكنولوجيا" 
              href="/technology" 
              articles={tech} 
              layout="row" 
            />

            {/* 3. Hero / Top News (Bottom) */}
            <HeroSection articles={heroArticles} />
          </div>
        </NewsList>
      </section>
    </main>
  );
}