import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import { NewsCard } from "@/components/NewsCard";
import { articles } from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-[family-name:var(--font-cairo)]">
      <Header />
      <NavBar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6 max-w-5xl mx-auto">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}

          {/* Load More Button (Visual only) */}
          <div className="mt-8 flex justify-center">
            <button className="px-8 py-3 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              المزيد من الأخبار
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}