const https = require('https');

const url = 'https://news50.sa/wp-json/wp/v2/categories?per_page=100';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
};

https.get(url, options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const categories = JSON.parse(data);
      const sports = categories.filter(c => c.name.includes("رياضة") || c.name.includes("Sports") || c.slug.includes("sport"));
      console.log("All Categories Found:", categories.length);
      console.log("Sports Candidates:", JSON.stringify(sports, null, 2));
    } catch (e) {
      console.error("JSON Parse Error:", e.message);
      console.log("Raw Data Preview:", data.substring(0, 200));
    }
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
