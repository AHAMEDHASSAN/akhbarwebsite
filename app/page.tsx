import { NewsList } from "@/components/NewsList";
import { getArticlesByCategory } from "@/lib/api";

export default async function Home() {
  const articles = await getArticlesByCategory("general");

  const formattedArticles = articles.map((article, index) => ({
    id: index.toString(),
    slug: article.slug,
    title: article.title,
    summary: article.description,
    category: "أخبار المحلية", // Default for home/general
    date: article.publishedAt
      ? new Date(article.publishedAt).toLocaleDateString("ar-SA", { day: "numeric", month: "long", year: "numeric" })
      : "",
    image: article.urlToImage,
    source: article.source.name
  }));

  return (
    <main className="flex-1 w-full max-w-[1450px] mx-auto px-4 py-2">
      <div className="mt-0">
        <NewsList articles={formattedArticles} />
      </div>
    </main>
  );
}