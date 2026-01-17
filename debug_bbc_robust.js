const https = require('https');
const fs = require('fs');
const { URL } = require('url');

function download(url, dest, cb) {
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  };

  const req = https.get(url, options, (res) => {
    // Handle Redirects
    if (res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
      console.log(`Redirecting to ${res.headers.location}`);
      // Handle relative redirects
      const newUrl = new URL(res.headers.location, url).toString();
      return download(newUrl, dest, cb);
    }

    if (res.statusCode !== 200) {
      console.log(`Failed: ${res.statusCode}`);
      return;
    }

    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      fs.writeFileSync(dest, data);
      console.log("Download Complete");
      cb();
    });
  }).on('error', (err) => {
    console.error(`Error: ${err.message}`);
  });
}

download('https://feeds.bbci.co.uk/arabic/rss.xml', 'bbc_debug.xml', () => {});
