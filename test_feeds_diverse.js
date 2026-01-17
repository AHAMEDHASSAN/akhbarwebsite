const https = require('https');

const CANDIDATES = {
  "sports": [
    "https://www.filgoal.com/rss/news",
    "https://hihi2.com/feed",
    "https://www.yallakora.com/rss/news"
  ],
  "technology": [
    "https://www.unlimit-tech.com/feed/",
    "https://www.tech-wd.com/wd/feed/",
    "https://www.arageek.com/tech/feed"
  ],
  "business": [
    "https://www.argaam.com/ar/rss/news",
    "https://maaal.com/feed/"
  ],
  "local": [
    "https://www.okaz.com.sa/rss/articles",
    "https://sabq.org/rss/news"
  ]
};

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
  }
};

Object.entries(CANDIDATES).forEach(([category, urls]) => {
  urls.forEach(url => {
    const req = https.get(url, options, (res) => {
      console.log(`[${category}] ${res.statusCode} : ${url}`);
    });
    
    req.on('error', (e) => {
      console.log(`[${category}] ERROR (${e.message}) : ${url}`);
    });

    req.setTimeout(5000, () => {
      req.abort();
      console.log(`[${category}] TIMEOUT : ${url}`);
    });
  });
});
