const http = require('http');
const fs = require('fs');
const path = require('path');
 codex/desenvolver-sistema-de-gestao-para-consorcio-u7c7wf
const xlsx = require('xlsx');

 codex/develop-comprehensive-consorcio-management-system

const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');
const SHEETS_ID = process.env.SHEETS_ID || '1IuODtcSId6uzy7Rzz1rA0Msm7p6w7PlTbs4xbMR6VKg';
const SHEETS_GID = process.env.SHEETS_GID || '1940056038';
const SHEETS_CSV_URL =
  process.env.SHEETS_CSV_URL ||
  `https://docs.google.com/spreadsheets/d/${SHEETS_ID}/gviz/tq?tqx=out:csv&gid=${SHEETS_GID}`;
const RANKING_REFRESH_MS = Number(process.env.RANKING_REFRESH_MS || 60 * 1000);
 codex/desenvolver-sistema-de-gestao-para-consorcio-u7c7wf
const BOLETOS_BASE_DIR =
  process.env.BOLETOS_BASE_DIR ||
  'C:\\Users\\vinicius.mesquita\\Desktop\\mesclarboletos\\renomearboletos4';
const BOLETOS_DB_PATH =
  process.env.BOLETOS_DB_PATH || path.join(__dirname, 'data', 'boletos-database.json');
const CONTEMPLADOS_XLSX_PATH =
codex/check-and-display-boleto-files
  process.env.CONTEMPLADOS_XLSX_PATH ||
  'C:\\Users\\vinicius.mesquita\\Documents\\Contemplados.xlsx';

  process.env.CONTEMPLADOS_XLSX_PATH || 'C:\\Users\\vinicius.mesquita\\Documents\\Contemplados.xlsx';
codex/desenvolver-sistema-de-gestao-para-consorcio-u7c7wf

 codex/develop-comprehensive-consorcio-management-system

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
 codex/desenvolver-sistema-de-gestao-para-consorcio-u7c7wf
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.csv': 'text/csv; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.zip': 'application/zip'

  '.svg': 'image/svg+xml'
 codex/develop-comprehensive-consorcio-management-system
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

 codex/desenvolver-sistema-de-gestao-para-consorcio-u7c7wf
const isValidContract = (contract) => /^\d+$/.test(contract);

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const isDirectoryContractMatch = (directoryName, contract, allowFlexibleMatch = false) => {
  const normalizedName = directoryName.trim();
  if (!allowFlexibleMatch) {
    return normalizedName === contract;
  }

  const flexiblePattern = new RegExp(`^${escapeRegExp(contract)}(?:\\D|$)`);
  return flexiblePattern.test(normalizedName);
};


const normalizeWindowsPathCandidates = (inputPath) => {
  const candidates = [inputPath];

  if (process.platform !== 'win32' && /^[a-zA-Z]:\\/.test(inputPath)) {
    const drive = inputPath[0].toLowerCase();
    const rest = inputPath.slice(2).replace(/\\/g, '/');
    candidates.push(`/mnt/${drive}${rest}`);
  }

  return [...new Set(candidates.map((value) => value.trim()).filter(Boolean))];
};

const findExistingFilePath = async (inputPath) => {
  const candidates = normalizeWindowsPathCandidates(inputPath);

  for (const candidate of candidates) {
    try {
      const stats = await fs.promises.stat(candidate);
      if (stats.isFile()) {
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

const loadContempladosFromSpreadsheet = async () => {
  const spreadsheetPath = await findExistingFilePath(CONTEMPLADOS_XLSX_PATH);

  if (!spreadsheetPath) {
    throw new Error(
      'Planilha de contemplados não encontrada. Verifique CONTEMPLADOS_XLSX_PATH no servidor.'
    );
  }

  const workbook = xlsx.readFile(spreadsheetPath);
  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    return { items: [], spreadsheetPath };
  }

  const rows = xlsx.utils.sheet_to_json(workbook.Sheets[firstSheetName], {
    header: 1,
    defval: ''
  });

  const items = rows
    .slice(1)
    .map((row) => {
      const colC = (row[2] || '').toString().trim();
      const colD = (row[3] || '').toString().trim();
      const colE = (row[4] || '').toString().trim();
      const colF = (row[5] || '').toString().trim();

      return {
        colC,
        colD,
        colE,
        colF
      };
    })
    .filter((item) => item.colC || item.colD || item.colE || item.colF);

  return { items, spreadsheetPath };
};

const normalizeBaseDirCandidates = (baseDir) => {
  const candidates = [baseDir];

  if (process.platform !== 'win32' && /^[a-zA-Z]:\\/.test(baseDir)) {
    const drive = baseDir[0].toLowerCase();
    const rest = baseDir.slice(2).replace(/\\/g, '/');
    candidates.push(`/mnt/${drive}${rest}`);
  }

  return [...new Set(candidates.map((value) => value.trim()).filter(Boolean))];
};

const normalizePathCandidates = (targetPath) => {
  const candidates = [targetPath];

  if (process.platform !== 'win32' && /^[a-zA-Z]:\\/.test(targetPath)) {
    const drive = targetPath[0].toLowerCase();
    const rest = targetPath.slice(2).replace(/\\/g, '/');
    candidates.push(`/mnt/${drive}${rest}`);
  }

  return [...new Set(candidates.map((value) => value.trim()).filter(Boolean))];
};

const findExistingFilePath = async (targetPath) => {
  const candidates = normalizePathCandidates(targetPath);

  for (const candidate of candidates) {
    try {
      const stats = await fs.promises.stat(candidate);
      if (stats.isFile()) {
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

const getContempladosFromWorkbook = async () => {
  const existingFilePath = await findExistingFilePath(CONTEMPLADOS_XLSX_PATH);
  if (!existingFilePath) {
    return {
      error:
        'Planilha de contemplados não encontrada. Verifique CONTEMPLADOS_XLSX_PATH no servidor e reinicie a aplicação.'
    };
  }

  const workbook = xlsx.readFile(existingFilePath, { cellDates: true });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = firstSheetName ? workbook.Sheets[firstSheetName] : null;

  if (!worksheet) {
    return { error: 'A planilha de contemplados está vazia.' };
  }

  const range = xlsx.utils.decode_range(worksheet['!ref'] || 'A1:A1');
  const rows = [];

  for (let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex += 1) {
    const values = ['C', 'D', 'E', 'F'].map((column) => {
      const cellAddress = `${column}${rowIndex + 1}`;
      const cell = worksheet[cellAddress];
      if (!cell) {
        return '';
      }
      const formatted = xlsx.utils.format_cell(cell);
      return (formatted || '').toString().trim();
    });

    if (values.every((value) => !value)) {
      continue;
    }

    rows.push({ colC: values[0], colD: values[1], colE: values[2], colF: values[3] });
  }

  return { rows, sourcePath: existingFilePath };
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

const listFilesRecursive = async (rootDir, relativePrefix = '') => {
  const entries = await fs.promises.readdir(rootDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(rootDir, entry.name);
    const relative = relativePrefix ? path.join(relativePrefix, entry.name) : entry.name;

    if (entry.isDirectory()) {
      const nestedFiles = await listFilesRecursive(absolute, relative);
      files.push(...nestedFiles);
      continue;
    }

    if (entry.isFile()) {
      files.push(relative);
    }
  }

  return files;
};

const findContractDirectoriesRecursive = async (
  rootDir,
  contract,
  relativePrefix = '',
  allowFlexibleMatch = false
) => {
  const entries = await fs.promises.readdir(rootDir, { withFileTypes: true });
  const matches = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const absolute = path.join(rootDir, entry.name);
    const relative = relativePrefix ? path.join(relativePrefix, entry.name) : entry.name;
    const directoryName = entry.name.trim();
    const isMatch = isDirectoryContractMatch(directoryName, contract, allowFlexibleMatch);

    if (isMatch) {
      matches.push({ absolute, relative });
    }

    const nested = await findContractDirectoriesRecursive(
      absolute,
      contract,
      relative,
      allowFlexibleMatch
    );
    matches.push(...nested);
  }

  return matches;
};

const listContractFiles = async (contract) => {
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

  const directContractDir = path.join(existingBaseDir, contract);
  const contractDirs = [];

  try {
    const stats = await fs.promises.stat(directContractDir);
    if (stats.isDirectory()) {
      contractDirs.push({ absolute: directContractDir, relative: contract });
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  if (!contractDirs.length) {
    const nestedMatches = await findContractDirectoriesRecursive(existingBaseDir, contract);
    contractDirs.push(...nestedMatches);
  }

  if (!contractDirs.length) {
    const flexibleMatches = await findContractDirectoriesRecursive(existingBaseDir, contract, '', true);
    contractDirs.push(...flexibleMatches);
  }

  if (!contractDirs.length) {
    return { files: [] };
  }

  const unique = new Set();
  const files = [];

  for (const contractDir of contractDirs) {
    const relativeFiles = await listFilesRecursive(contractDir.absolute);

    for (const relativePath of relativeFiles) {
      const prefixedRelativePath = path.join(contractDir.relative, relativePath).replace(/\\/g, '/');
      if (unique.has(prefixedRelativePath)) {
        continue;
      }
      unique.add(prefixedRelativePath);
      files.push({
        file: prefixedRelativePath,
        status: 'Arquivo encontrado',
        downloadUrl: `/api/boletos/download?contract=${encodeURIComponent(contract)}&file=${encodeURIComponent(
          prefixedRelativePath
        )}`
      });
    }
  }

  return { files, baseDir: existingBaseDir };
};

const sendJson = (res, statusCode, payload) => {
  sendResponse(res, statusCode, JSON.stringify(payload), MIME_TYPES['.json']);
};

const parseJsonBody = (req) =>
  new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
      if (body.length > 1_000_000) {
        reject(new Error('Payload muito grande.'));
      }
    });

    req.on('end', () => {
      if (!body.trim()) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('JSON inválido.'));
      }
    });

    req.on('error', (error) => reject(error));
  });

const buildBoletosDatabase = async (baseDir) => {
  const contracts = {};

  const walkDirectories = async (currentDir, relativePrefix = '') => {
    const entries = await fs.promises.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) {
        continue;
      }

      const absolute = path.join(currentDir, entry.name);
      const relative = relativePrefix ? path.join(relativePrefix, entry.name) : entry.name;
      const contract = entry.name.trim();

      if (isValidContract(contract)) {
        const relativeFiles = await listFilesRecursive(absolute);

        if (relativeFiles.length) {
          const prefixed = relativeFiles.map((file) => path.join(relative, file).replace(/\\/g, '/'));
          contracts[contract] = [...(contracts[contract] || []), ...prefixed];
        }
      }

      await walkDirectories(absolute, relative);
    }
  };

  await walkDirectories(baseDir);

  Object.keys(contracts).forEach((contract) => {
    contracts[contract] = [...new Set(contracts[contract])];
  });

  const database = {
    baseDir,
    updatedAt: new Date().toISOString(),
    contracts
  };

  await fs.promises.mkdir(path.dirname(BOLETOS_DB_PATH), { recursive: true });
  await fs.promises.writeFile(BOLETOS_DB_PATH, JSON.stringify(database, null, 2), 'utf-8');
  return database;
};

const loadBoletosDatabase = async () => {
  try {
    const content = await fs.promises.readFile(BOLETOS_DB_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
};

let boletosDatabase = null;

const rebuildBoletosDatabase = async (preferredBaseDir) => {
  const existingBaseDir = preferredBaseDir || (await findExistingBaseDir());
  if (!existingBaseDir) {
    throw new Error('Pasta base de boletos não encontrada.');
  }

  boletosDatabase = await buildBoletosDatabase(existingBaseDir);
  return boletosDatabase;
};

const ensureBoletosDatabaseLoaded = async () => {
  if (boletosDatabase) {
    return boletosDatabase;
  }

  boletosDatabase = await loadBoletosDatabase();

  if (!boletosDatabase) {
    try {
      boletosDatabase = await rebuildBoletosDatabase();
    } catch (error) {
      boletosDatabase = null;
    }
  }

  return boletosDatabase;
};

const mapDatabaseFilesToApi = (contract, files = []) =>
  files.map((relativePath) => ({
    file: relativePath,
    status: 'Arquivo encontrado',
    downloadUrl: `/api/boletos/download?contract=${encodeURIComponent(contract)}&file=${encodeURIComponent(
      relativePath
    )}`
  }));

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || `localhost:${PORT}`}`);

  if (requestUrl.pathname === '/api/ranking') {
=======
const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/ranking')) {
 codex/develop-comprehensive-consorcio-management-system
    if (!rankingCache.csv) {
      sendResponse(res, 503, 'Ranking indisponível.', 'text/plain; charset=utf-8');
      return;
    }
    sendResponse(res, 200, rankingCache.csv, 'text/csv; charset=utf-8');
    return;
  }

 codex/desenvolver-sistema-de-gestao-para-consorcio-u7c7wf
  if (requestUrl.pathname === '/api/contemplados') {
    try {
      const contemplados = await loadContempladosFromSpreadsheet();
      sendJson(res, 200, {
        source: 'spreadsheet',
        path: contemplados.spreadsheetPath,
        total: contemplados.items.length,
        items: contemplados.items
      });
      return;
    } catch (error) {
      sendJson(res, 400, { error: error.message || 'Falha ao carregar planilha de contemplados.' });
      return;
    }
  }

  if (requestUrl.pathname === '/api/boletos') {
    const contract = (requestUrl.searchParams.get('contract') || '').trim();
    if (!contract) {
      sendJson(res, 400, { error: 'Informe o número do contrato.' });
      return;
    }

    try {
      const db = await ensureBoletosDatabaseLoaded();
      const dbFiles = db && db.contracts && db.contracts[contract] ? mapDatabaseFilesToApi(contract, db.contracts[contract]) : [];

      const result = await listContractFiles(contract);
      if (result.error) {
        sendJson(res, 400, { error: result.error });
        return;
      }

      const mergedMap = new Map();
      [...dbFiles, ...(result.files || [])].forEach((item) => {
        if (!item || !item.file) {
          return;
        }
        mergedMap.set(item.file, item);
      });

      const mergedFiles = Array.from(mergedMap.values());
      const source = dbFiles.length && result.files?.length ? 'database+filesystem' : dbFiles.length ? 'database' : 'filesystem';

      sendJson(res, 200, {
        contract,
        files: mergedFiles,
        source,
        updatedAt: db?.updatedAt || null
      });
      return;
    } catch (error) {
      sendJson(res, 500, { error: 'Não foi possível buscar os arquivos.' });
      return;
    }
  }

  if (requestUrl.pathname === '/api/boletos/database/status') {
    const db = await ensureBoletosDatabaseLoaded();
    const totalContracts = db ? Object.keys(db.contracts || {}).length : 0;
    const totalFiles = db
      ? Object.values(db.contracts || {}).reduce((sum, files) => sum + files.length, 0)
      : 0;

    sendJson(res, 200, {
      configuredBaseDir: BOLETOS_BASE_DIR,
      dbPath: BOLETOS_DB_PATH,
      loaded: Boolean(db),
      baseDir: db?.baseDir || null,
      updatedAt: db?.updatedAt || null,
      totalContracts,
      totalFiles
    });
    return;
  }

  if (requestUrl.pathname === '/api/boletos/database/rebuild' && req.method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const requestedBaseDir = (body.baseDir || '').trim();
      const resolvedBaseDir = requestedBaseDir || (await findExistingBaseDir());

      if (!resolvedBaseDir) {
        sendJson(res, 400, {
          error:
            'Pasta base não encontrada. Informe baseDir no body ou configure BOLETOS_BASE_DIR corretamente.'
        });
        return;
      }

      const database = await rebuildBoletosDatabase(resolvedBaseDir);
      const totalContracts = Object.keys(database.contracts || {}).length;
      const totalFiles = Object.values(database.contracts || {}).reduce((sum, files) => sum + files.length, 0);

      sendJson(res, 200, {
        ok: true,
        message: 'Banco de boletos reconstruído com sucesso.',
        baseDir: database.baseDir,
        updatedAt: database.updatedAt,
        totalContracts,
        totalFiles,
        dbPath: BOLETOS_DB_PATH
      });
      return;
    } catch (error) {
      sendJson(res, 500, { error: error.message || 'Falha ao reconstruir banco de boletos.' });
      return;
    }
  }

  if (requestUrl.pathname === '/api/contemplados') {
    try {
      const result = await getContempladosFromWorkbook();
      if (result.error) {
        sendJson(res, 400, { error: result.error });
        return;
      }

      sendJson(res, 200, {
        rows: result.rows,
        sourcePath: result.sourcePath,
        updatedAt: new Date().toISOString()
      });
      return;
    } catch (error) {
      sendJson(res, 500, { error: 'Não foi possível carregar a planilha de contemplados.' });
      return;
    }
  }

  if (requestUrl.pathname === '/api/boletos/download') {
    const contract = (requestUrl.searchParams.get('contract') || '').trim();
    const file = (requestUrl.searchParams.get('file') || '').trim();

    if (!isValidContract(contract) || !file) {
      sendResponse(res, 400, 'Parâmetros inválidos.', 'text/plain; charset=utf-8');
      return;
    }

    const normalizedFile = path.normalize(file).replace(/^([/\\])+/, '');
    const normalizedFileForMatch = normalizedFile.replace(/\\/g, '/');
    if (normalizedFileForMatch.includes('..')) {
      sendResponse(res, 400, 'Parâmetros inválidos.', 'text/plain; charset=utf-8');
      return;
    }

    try {
      const existingBaseDir = await findExistingBaseDir();
      if (!existingBaseDir) {
        sendResponse(res, 404, 'Pasta base não encontrada.', 'text/plain; charset=utf-8');
        return;
      }

      const directContractDir = path.resolve(existingBaseDir, contract);
      const candidateDirs = [];

      try {
        const directStats = await fs.promises.stat(directContractDir);
        if (directStats.isDirectory()) {
          candidateDirs.push({ absolute: directContractDir, relative: contract });
        }
      } catch (error) {
        if (error.code !== 'ENOENT') {
          throw error;
        }
      }

      if (!candidateDirs.length) {
        const nestedMatches = await findContractDirectoriesRecursive(existingBaseDir, contract);
        candidateDirs.push(
          ...nestedMatches.map((match) => ({
            absolute: path.resolve(match.absolute),
            relative: match.relative
          }))
        );
      }

      if (!candidateDirs.length) {
        const flexibleMatches = await findContractDirectoriesRecursive(existingBaseDir, contract, '', true);
        candidateDirs.push(
          ...flexibleMatches.map((match) => ({
            absolute: path.resolve(match.absolute),
            relative: match.relative
          }))
        );
      }

      let resolvedFilePath = null;
      for (const dirMatch of candidateDirs) {
        const relativePrefix = `${dirMatch.relative.replace(/\\/g, '/')}/`;
        if (!normalizedFileForMatch.startsWith(relativePrefix)) {
          continue;
        }

        const innerPath = normalizedFileForMatch.slice(relativePrefix.length);
        if (!innerPath) {
          continue;
        }

        const candidateFilePath = path.resolve(dirMatch.absolute, innerPath);
        if (!candidateFilePath.startsWith(dirMatch.absolute + path.sep) && candidateFilePath !== dirMatch.absolute) {
          continue;
        }

        try {
          const stats = await fs.promises.stat(candidateFilePath);
          if (stats.isFile()) {
            resolvedFilePath = candidateFilePath;
            break;
          }
        } catch (error) {
          if (error.code !== 'ENOENT') {
            throw error;
          }
        }
      }

      if (!resolvedFilePath) {
        sendResponse(res, 404, 'Arquivo não encontrado.', 'text/plain; charset=utf-8');
        return;
      }

      const extension = path.extname(resolvedFilePath).toLowerCase();
      const contentType = MIME_TYPES[extension] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${path.basename(normalizedFile)}"`
      });
      fs.createReadStream(resolvedFilePath).pipe(res);
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

  const filePath = resolveFilePath(req.url);
 codex/develop-comprehensive-consorcio-management-system

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

 codex/desenvolver-sistema-de-gestao-para-consorcio-u7c7wf
ensureBoletosDatabaseLoaded().catch((error) => {
  console.warn('Não foi possível carregar banco de boletos.', error);
});


 codex/develop-comprehensive-consorcio-management-system
server.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
