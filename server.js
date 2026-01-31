const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml'
};

const sendResponse = (res, statusCode, content, contentType) => {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.end(content);
};

const resolveFilePath = (urlPath) => {
  if (urlPath === '/' || urlPath === '') {
    return path.join(publicDir, 'index.html');
  }
  return path.join(publicDir, decodeURIComponent(urlPath));
};

const server = http.createServer((req, res) => {
  const filePath = resolveFilePath(req.url);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const fallbackPath = path.join(publicDir, 'index.html');
      fs.readFile(fallbackPath, (fallbackErr, fallbackContent) => {
        if (fallbackErr) {
          sendResponse(res, 500, 'Erro ao carregar a aplicação.', 'text/plain; charset=utf-8');
          return;
        }
        sendResponse(res, 200, fallbackContent, MIME_TYPES['.html']);
      });
      return;
    }

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        sendResponse(res, 500, 'Erro ao carregar o arquivo.', 'text/plain; charset=utf-8');
        return;
      }
      sendResponse(res, 200, content, contentType);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
