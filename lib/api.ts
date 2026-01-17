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

const FEED_URLS: Record<string, string> = {
  "sports": "https://feeds.bbci.co.uk/arabic/sports/rss.xml", // BBC Sports
  "technology": "https://feeds.bbci.co.uk/arabic/science_and_tech/rss.xml", // BBC Tech
  "business": "https://feeds.bbci.co.uk/arabic/business/rss.xml", // BBC Business
  "entertainment": "https://feeds.bbci.co.uk/arabic/art_and_culture/rss.xml", // BBC Arts
  "health": "https://www.webteb.com/rss/latest-articles", // WebTeb (Health - Distinct Provider)
  "science": "https://feeds.bbci.co.uk/arabic/science_and_tech/rss.xml", 
  "general": "https://feeds.bbci.co.uk/arabic/middleeast/rss.xml", // BBC Middle East
  "politics": "https://feeds.bbci.co.uk/arabic/rss.xml", // BBC Main
};

// Helper to decode HTML entities (fixes messy descriptions)
function decodeHtml(html: string) {
  const txt = html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
  return txt;
}

// Native RSS Parser using Regex (Zero Dependencies)
async function parseRSS(url: string): Promise<Article[]> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
      }
    });
    if (!res.ok) throw new Error(`Failed to fetch RSS: ${res.status}`);
    const xml = await res.text();

    const items = xml.split("<item>");
    // Remove the first part (header)
    items.shift();

    return items.map(item => {
      const getTag = (tag: string) => {
        const regex = new RegExp(`<${tag}.*?>([\\s\\S]*?)<\\/${tag}>`);
        const match = item.match(regex);
        return match ? match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim() : "";
      };

      const getImage = () => {
        // Universal Image Regex Patterns
        
        // 1. media:content (common in Sky News, Yahoo) - prioritized
        // Matches <media:content ... url="..." ...> OR <media:content ...>...<media:player url="..."/></media:content>
        const mediaContent = item.match(/<media:content[^>]*?url=["']([^"']+)["'][^>]*?>/);
        if (mediaContent) return mediaContent[1];

        // 2. media:thumbnail (common in BBC)
        // Matches <media:thumbnail ... url="..." ...>
        const mediaThumbnail = item.match(/<media:thumbnail[^>]*?url=["']([^"']+)["'][^>]*?>/);
        if (mediaThumbnail) return mediaThumbnail[1];

        // 3. enclosure (Standard RSS for podcasts/images)
        const enclosure = item.match(/<enclosure[^>]*?url=["']([^"']+)["'][^>]*?>/);
        if (enclosure) return enclosure[1];

        // 4. Try parsing content/description for <img src="...">
        const contentMatch = item.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/) 
                          || item.match(/<description>([\s\S]*?)<\/description>/);
        
        if (contentMatch && contentMatch[1]) {
           const decoded = decodeHtml(contentMatch[1]);
           const img = decoded.match(/src=["']([^"']+)["']/);
           // Filter out pixel trackers or emojis (common in feeds)
           if (img && !img[1].includes('pixel') && !img[1].includes('emoji')) {
             return img[1];
           }
        }

        return null; // Return null if no image found
      };

      const getTitle = () => {
        const titleMatch = item.match(/<title.*?>([\s\S]*?)<\/title>/);
        return titleMatch ? titleMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim() : "بدون عنوان";
      };

      const getDescription = () => {
         const descMatch = item.match(/<description.*?>([\s\S]*?)<\/description>/);
         if (!descMatch) return "";

         let rawDesc = descMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");

         // Fix: Decode HTML entities before stripping tags (fixes &lt;a href... issues)
         rawDesc = decodeHtml(rawDesc);

         // Remove HTML tags to get clean text
         return rawDesc.replace(/<[^>]*>/g, "").trim().substring(0, 150) + "...";
      };

      return {
        title: getTitle(),
        description: getDescription(),
        url: getTag("link") || "#",
        urlToImage: getImage(),
        publishedAt: getTag("pubDate") || getTag("dc:date") || new Date().toISOString(),
        source: { name: "مصدر إخباري" }
      };
    }).slice(0, 20);

  } catch (error) {
    console.error("RSS Parse Error:", error);
    return [];
  }
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const feedUrl = FEED_URLS[category] || FEED_URLS["general"];
  return await parseRSS(feedUrl);
}
