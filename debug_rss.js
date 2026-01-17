const https = require('https');

https.get('https://www.okaz.com.sa/rss/articles', (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    require('fs').writeFileSync('rss_debug.xml', data);
    console.log("File written");
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
