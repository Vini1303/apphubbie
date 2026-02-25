const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const xlsx = require('xlsx');

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const startServer = async (env) => {
  const child = spawn(process.execPath, ['server.js'], {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, ...env },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  let output = '';
  child.stdout.on('data', (chunk) => {
    output += chunk.toString();
  });
  child.stderr.on('data', (chunk) => {
    output += chunk.toString();
  });

  for (let i = 0; i < 50; i += 1) {
    if (output.includes('Servidor iniciado em')) {
      return { child, outputRef: () => output };
    }
    await wait(100);
    if (child.exitCode !== null) {
      throw new Error(`Servidor encerrou antes de iniciar. Logs:\n${output}`);
    }
  }

  throw new Error(`Timeout iniciando servidor. Logs:\n${output}`);
};

const stopServer = async (child) => {
  if (!child || child.exitCode !== null) {
    return;
  }
  child.kill('SIGTERM');
  await wait(200);
  if (child.exitCode === null) {
    child.kill('SIGKILL');
  }
};

test('GET /api/contemplados retorna apenas colunas C-F da planilha', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'apphubbie-test-'));
  const xlsxPath = path.join(tmpDir, 'Contemplados.xlsx');

  const rows = [
    ['A', 'B', 'C', 'D', 'E', 'F'],
    ['x', 'y', 'Cliente A', 'Plano 100', 'R$ 50.000,00', 'Contemplado'],
    ['x', 'y', 'Cliente B', 'Plano 200', 'R$ 90.000,00', 'Aguardando']
  ];
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.aoa_to_sheet(rows);
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Dados');
  xlsx.writeFile(workbook, xlsxPath);

  const { child } = await startServer({ PORT: '3110', CONTEMPLADOS_XLSX_PATH: xlsxPath });
  try {
    const response = await fetch('http://localhost:3110/api/contemplados');
    const data = await response.json();

    assert.equal(response.status, 200);
    assert.equal(data.total, 2);
    assert.deepEqual(data.items, [
      { colC: 'Cliente A', colD: 'Plano 100', colE: 'R$ 50.000,00', colF: 'Contemplado' },
      { colC: 'Cliente B', colD: 'Plano 200', colE: 'R$ 90.000,00', colF: 'Aguardando' }
    ]);
  } finally {
    await stopServer(child);
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('GET /api/boletos/download baixa arquivo listado para contrato', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'apphubbie-boletos-'));
  const contract = '40157299';
  const contractDir = path.join(tmpDir, contract);
  fs.mkdirSync(contractDir, { recursive: true });
  fs.writeFileSync(path.join(contractDir, '40157299_03.pdf'), 'pdf-content');

  const xlsxPath = path.join(tmpDir, 'Contemplados.xlsx');
  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.aoa_to_sheet([['A', 'B', 'C', 'D', 'E', 'F']]);
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Dados');
  xlsx.writeFile(workbook, xlsxPath);

  const { child } = await startServer({
    PORT: '3111',
    BOLETOS_BASE_DIR: tmpDir,
    CONTEMPLADOS_XLSX_PATH: xlsxPath
  });

  try {
    const listResponse = await fetch(`http://localhost:3111/api/boletos?contract=${contract}`);
    const listData = await listResponse.json();
    assert.equal(listResponse.status, 200);
    assert.equal(listData.files.length, 1);

    const downloadResponse = await fetch(
      'http://localhost:3111/api/boletos/download?contract=40157299&file=40157299%2F40157299_03.pdf'
    );
    const content = await downloadResponse.text();

    assert.equal(downloadResponse.status, 200);
    assert.match(downloadResponse.headers.get('content-disposition') || '', /attachment/);
    assert.equal(content, 'pdf-content');
  } finally {
    await stopServer(child);
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
