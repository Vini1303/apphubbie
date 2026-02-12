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
const BOLETOS_BASE_DIR =
  process.env.BOLETOS_BASE_DIR ||
  'C:\\Users\\vinicius.mesquita\\Desktop\\mesclarboletos\\renomearboletos4';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf'
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

const isValidContract = (contract) => /^[a-zA-Z0-9_-]+$/.test(contract);

const normalizeBaseDirCandidates = (baseDir) => {
  const candidates = [baseDir];

  if (process.platform !== 'win32' && /^[a-zA-Z]:\\/.test(baseDir)) {
    const drive = baseDir[0].toLowerCase();
    const rest = baseDir.slice(2).replace(/\\/g, '/');
    candidates.push(`/mnt/${drive}${rest}`);
  }

  return [...new Set(candidates.map((value) => value.trim()).filter(Boolean))];
};

const findExistingBaseDir = async () => {
  const candidates = normalizeBaseDirCandidates(BOLETOS_BASE_DIR);

  for (const candidate of candidates) {
    try {
      const stats = await fs.promises.stat(candidate);
      if (stats.isDirectory()) {
        return candidate;
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  }

  return null;
};

const listPdfFilesRecursive = async (rootDir, relativePrefix = '') => {
  const entries = await fs.promises.readdir(rootDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(rootDir, entry.name);
    const relative = relativePrefix ? path.join(relativePrefix, entry.name) : entry.name;

    if (entry.isDirectory()) {
      const nestedFiles = await listPdfFilesRecursive(absolute, relative);
      files.push(...nestedFiles);
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf')) {
      files.push(relative);
    }
  }

  return files;
};

const listContractPdfFiles = async (contract) => {
  if (!isValidContract(contract)) {
    return { error: 'Contrato inválido.' };
  }

  const existingBaseDir = await findExistingBaseDir();
  if (!existingBaseDir) {
    return {
      error:
        'Pasta base de boletos não encontrada. Verifique BOLETOS_BASE_DIR no servidor e reinicie a aplicação.'
    };
  }

  const contractDir = path.join(existingBaseDir, contract);
  try {
    const stats = await fs.promises.stat(contractDir);
    if (!stats.isDirectory()) {
      return { files: [] };
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { files: [] };
    }
    throw error;
  }

  const relativeFiles = await listPdfFilesRecursive(contractDir);
  const files = relativeFiles.map((relativePath) => ({
    file: relativePath,
    status: 'PDF encontrado',
    downloadUrl: `/api/boletos/download?contract=${encodeURIComponent(contract)}&file=${encodeURIComponent(
      relativePath
    )}`
  }));

  return { files, baseDir: existingBaseDir };
};

const sendJson = (res, statusCode, payload) => {
  sendResponse(res, statusCode, JSON.stringify(payload), MIME_TYPES['.json']);
};

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || `localhost:${PORT}`}`);

  if (requestUrl.pathname === '/api/ranking') {
    if (!rankingCache.csv) {
      sendResponse(res, 503, 'Ranking indisponível.', 'text/plain; charset=utf-8');
      return;
    }
    sendResponse(res, 200, rankingCache.csv, 'text/csv; charset=utf-8');
    return;
  }

  if (requestUrl.pathname === '/api/boletos') {
    const contract = (requestUrl.searchParams.get('contract') || '').trim();
    if (!contract) {
      sendJson(res, 400, { error: 'Informe o número do contrato.' });
      return;
    }

    try {
      const result = await listContractPdfFiles(contract);
      if (result.error) {
        sendJson(res, 400, { error: result.error });
        return;
      }
      sendJson(res, 200, { contract, files: result.files });
      return;
    } catch (error) {
      sendJson(res, 500, { error: 'Não foi possível buscar os arquivos.' });
      return;
    }
  }

  if (requestUrl.pathname === '/api/boletos/download') {
    const contract = (requestUrl.searchParams.get('contract') || '').trim();
    const file = (requestUrl.searchParams.get('file') || '').trim();

    if (!isValidContract(contract) || !file || !file.toLowerCase().endsWith('.pdf')) {
      sendResponse(res, 400, 'Parâmetros inválidos.', 'text/plain; charset=utf-8');
      return;
    }

    const normalizedFile = path.normalize(file).replace(/^([/\\])+/, '');
    if (normalizedFile.includes('..')) {
      sendResponse(res, 400, 'Parâmetros inválidos.', 'text/plain; charset=utf-8');
      return;
    }

    try {
      const existingBaseDir = await findExistingBaseDir();
      if (!existingBaseDir) {
        sendResponse(res, 404, 'Pasta base não encontrada.', 'text/plain; charset=utf-8');
        return;
      }

      const contractDir = path.resolve(existingBaseDir, contract);
      const filePath = path.resolve(contractDir, normalizedFile);

      if (!filePath.startsWith(contractDir + path.sep) && filePath !== contractDir) {
        sendResponse(res, 400, 'Parâmetros inválidos.', 'text/plain; charset=utf-8');
        return;
      }

      const stats = await fs.promises.stat(filePath);
      if (!stats.isFile()) {
        sendResponse(res, 404, 'Arquivo não encontrado.', 'text/plain; charset=utf-8');
        return;
      }

      res.writeHead(200, {
        'Content-Type': MIME_TYPES['.pdf'],
        'Content-Disposition': `inline; filename="${path.basename(normalizedFile)}"`
      });
      fs.createReadStream(filePath).pipe(res);
      return;
    } catch (error) {
      if (error.code === 'ENOENT') {
        sendResponse(res, 404, 'Arquivo não encontrado.', 'text/plain; charset=utf-8');
        return;
      }
      sendResponse(res, 500, 'Erro ao carregar arquivo.', 'text/plain; charset=utf-8');
      return;
    }
  }

  const filePath = resolveFilePath(requestUrl.pathname);

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
