const https = require('https');

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
};

console.log("Fetching BBC Arabic RSS...");
https.get('https://feeds.bbci.co.uk/arabic/rss.xml', options, (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    // Log the first 2000 characters to check item structure and image tags
    console.log(data.substring(0, 3000)); 
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
