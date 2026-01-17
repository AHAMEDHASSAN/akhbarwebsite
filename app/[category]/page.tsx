import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import { NewsList } from "@/components/NewsList";
import { getArticlesByCategory } from "@/lib/api";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const CATEGORY_NAMES: Record<string, string> = {
  "sports": "الرياضة",
  "technology": "التكنولوجيا",
  "business": "الاقتصاد",
  "entertainment": "الثقافة والفن",
  "health": "الصحة",
  "science": "العلوم",
  "general": "آخر الأخبار",
  "politics": "السياسة" // Mapping politics to general or business if needed, or handling gracefully
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const articles = await getArticlesByCategory(category);
  const displayCategoryName = CATEGORY_NAMES[category] || "الأخبار";

  // Map API articles to our NewsCard format
  const formattedArticles = articles.map((article, index) => ({
    id: index.toString(),
    title: article.title,
    summary: article.description || "...",
    category: displayCategoryName,
    date: article.publishedAt 
      ? new Date(article.publishedAt).toLocaleDateString("ar-SA", { day: "numeric", month: "long", year: "numeric" }) 
      : "",
    image: article.urlToImage,
    source: article.source.name
  }));

  return (
    <div className="min-h-screen bg-white flex flex-col font-[family-name:var(--font-cairo)]">
      <Header />
      <NavBar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 border-r-4 border-green-700 pr-4">
          {displayCategoryName}
        </h1>

        <div className="mt-4">
           {/* Passing all articles to the Client Component for Load More logic */}
           <NewsList articles={formattedArticles} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
