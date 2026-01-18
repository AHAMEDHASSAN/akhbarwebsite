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
    <main className="flex-1 w-full max-w-[1450px] mx-auto px-4 py-8 overflow-x-hidden">
      {/* 1. Hero / Top News */}
      <HeroSection articles={heroArticles} />

      <div className="space-y-16 mt-12">
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

        {/* 3. Infinite Feed Style Bottom */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-black text-gray-900">آخر الأخبار</h2>
            <div className="flex-1 h-[2px] bg-gray-100"></div>
          </div>
          <NewsList articles={remainingGeneral} />
        </section>
      </div>
    </main>
  );
}