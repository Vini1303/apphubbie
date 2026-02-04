const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');
const SHEETS_ID = process.env.SHEETS_ID || '1IuODtcSId6uzy7Rzz1rA0Msm7p6w7PlTbs4xbMR6VKg';
const SHEETS_GID = process.env.SHEETS_GID || '1940056038';
const SHEETS_CSV_URL =
  process.env.SHEETS_CSV_URL ||
  `https://docs.google.com/spreadsheets/d/${SHEETS_ID}/gviz/tq?tqx=out:csv&gid=${SHEETS_GID}`;
const RANKING_REFRESH_MS = Number(process.env.RANKING_REFRESH_MS || 60 * 1000);

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

let rankingCache = {
  csv: '',
  updatedAt: null
};

const updateRankingCache = async () => {
  try {
    const response = await fetch(SHEETS_CSV_URL);
    if (!response.ok) {
      throw new Error(`Falha ao buscar planilha: ${response.status}`);
    }
    rankingCache = {
      csv: await response.text(),
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.warn('Não foi possível atualizar o cache do ranking.', error);
  }
};

setInterval(updateRankingCache, RANKING_REFRESH_MS);
updateRankingCache();

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/ranking')) {
    if (!rankingCache.csv) {
      sendResponse(res, 503, 'Ranking indisponível.', 'text/plain; charset=utf-8');
      return;
    }
    sendResponse(res, 200, rankingCache.csv, 'text/csv; charset=utf-8');
    return;
  }

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
