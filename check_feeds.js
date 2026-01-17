const https = require('https');

const FEED_URLS = {
  "sports": "https://www.yallakora.com/rss/news",
  "technology": "https://aitnews.com/feed/",
  "business": "https://www.cnbcarabia.com/rss/latest-news",
  "entertainment": "https://www.etbilarabi.com/feed",
  "health": "https://www.webteb.com/rss/latest-articles",
  "science": "https://www.alarabiya.net/.mrss/medicine-and-health.xml",
  "general": "https://www.okaz.com.sa/rss/articles", 
  "politics": "https://www.alarabiya.net/.mrss/politics.xml",
};

const options = {
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
  }
};

async function checkUrl(category, url) {
  return new Promise((resolve) => {
    https.get(url, options, (res) => {
      console.log(`${category}: ${res.statusCode} - ${url}`);
      resolve();
    }).on('error', (e) => {
      console.log(`${category}: ERROR (${e.message}) - ${url}`);
      resolve();
    });
  });
}

async function checkAll() {
  for (const [cat, url] of Object.entries(FEED_URLS)) {
    await checkUrl(cat, url);
  }
}

checkAll();
