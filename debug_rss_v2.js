const https = require('https');
const fs = require('fs');

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
};

console.log("Fetching Al Arabiya...");
https.get('https://www.alarabiya.net/.mrss/politics.xml', options, (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    fs.writeFileSync('rss_debug.xml', data);
    console.log("Done");
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
