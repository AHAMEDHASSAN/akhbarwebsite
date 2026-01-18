export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: {
    name: string;
  };
}

const API_BASE = "https://news50.sa/wp-json/wp/v2/posts";

const CATEGORY_IDS: Record<string, number> = {
  "politics": 20,
  "sports": 21,
  "technology": 22,
  "entertainment": 18, // Culture/Art
  "business": 20, // Merged for now or use local
  "general": 200, // Local news as general
  "local": 200,
  "health": 200, // Fallback
  "science": 22 // Fallback to tech
};

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  try {
    const categoryId = CATEGORY_IDS[category.toLowerCase()] || 200;
    
    // Fetch posts with _embed to get images
    const res = await fetch(`${API_BASE}?categories=${categoryId}&_embed&per_page=15`, {
      next: { revalidate: 600 }, // caching for 10 minutes
      headers: {
        "User-Agent": "Mozilla/5.0 (Compatible; NextJS News App)"
      }
    });

    if (!res.ok) {
      console.error(`Failed to fetch from News50: ${res.status}`);
      return [];
    }

    const posts = await res.json();

    return posts.map((post: any) => {
      // Extract image
      let imageUrl = null;
      if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
        imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
      }

      // Clean description
      const rawExcerpt = post.excerpt?.rendered || "";
      const cleanExcerpt = rawExcerpt.replace(/<[^>]*>/g, "").replace(/&hellip;/g, "...").trim();

      return {
        title: post.title?.rendered || "بدون عنوان",
        description: cleanExcerpt,
        url: post.link,
        urlToImage: imageUrl,
        publishedAt: post.date,
        source: {
          name: "أخبار السعودية"
        }
      };
    });

  } catch (error) {
    console.error("API Fetch Error:", error);
    return [];
  }
}
