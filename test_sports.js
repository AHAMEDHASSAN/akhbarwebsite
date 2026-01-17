const https = require('https');

const URLS = [
  "https://www.yallakora.com/rss/news",
  "https://www.filgoal.com/rss/news",
  "https://feeds.bbci.co.uk/arabic/sports/rss.xml", 
  "https://www.aljazeera.net/aljazeerarss/3c66e3fb-a5e0-4790-91be-ddb05ec17198/4e9f930e-26f6-460b-80fb-40092c6e6129", // Al Jazeera Sports
  "https://www.skynewsarabia.com/web/rss/sports"
];

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
};

URLS.forEach(url => {
  https.get(url, options, (res) => {
    console.log(`${res.statusCode} : ${url}`);
  }).on('error', (e) => {
    console.log(`ERROR : ${url} - ${e.message}`);
  });
});
