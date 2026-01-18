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
  "politics": "السياسة"
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
    <main className="flex-1 w-full max-w-[1450px] mx-auto px-4 py-2">
      <div className="mt-0">
         {/* Passing all articles to the Client Component for Load More logic */}
         <NewsList articles={formattedArticles} />
      </div>
    </main>
  );
}
