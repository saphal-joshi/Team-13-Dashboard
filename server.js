const https = require("https");
const fs = require("fs");
const path = require("path");

// Very basic MIME type mapping (no npm required)
const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
};

// Load SSL certificates
const options = {
  key: fs.readFileSync(path.join(__dirname, "Certs", "sg25t13+2-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "Certs", "sg25t13+2.pem")),
};

// Create HTTPS server
https.createServer(options, (req, res) => {
  let filePath = path.join(__dirname, "public", "summergames-main", "dist", req.url === "/" ? "index.html" : req.url);

console.log("Requested:", req.url);
console.log("Resolved path:", filePath);

  // Prevent directory traversal attacks
  if (!filePath.startsWith(path.join(__dirname, "public"))) {
    res.writeHead(403);
    res.end("403 Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("404 Not Found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}).listen(8443, () => {
  console.log("✅ HTTPS server running at: https://localhost:8443");
});
