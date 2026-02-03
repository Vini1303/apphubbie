const loginForm = document.getElementById('loginForm');
const loginCard = document.getElementById('loginCard');
const content = document.getElementById('content');
const userName = document.getElementById('userName');
const userRole = document.getElementById('userRole');
const monthlyBar = document.getElementById('monthlyBar');
const clientSearch = document.getElementById('clientSearch');
const clientStatusFilter = document.getElementById('clientStatusFilter');
const menuButtons = document.querySelectorAll('.menu__item');
const sections = document.querySelectorAll('.section');
const sidebar = document.getElementById('sidebar');
const brandToggle = document.getElementById('brandToggle');
const subnavButtons = document.querySelectorAll('.subnav__item');
const subsections = document.querySelectorAll('.subsection');
const loginMedia = document.getElementById('loginMedia');
const topbar = document.getElementById('topbar');
const loginHeroFileInput = document.getElementById('loginHeroFile');
const loginHeroBase64Input = document.getElementById('loginHeroBase64');
const saveLoginHeroImageButton = document.getElementById('saveLoginHeroImage');
const clearLoginHeroImageButton = document.getElementById('clearLoginHeroImage');
const loginHeroStatus = document.getElementById('loginHeroStatus');
const loginHeroUploadCard = document.getElementById('loginHeroUpload');
const puntaCanaFileInput = document.getElementById('puntaCanaFile');
const puntaCanaBase64Input = document.getElementById('puntaCanaBase64');
const savePuntaCanaImageButton = document.getElementById('savePuntaCanaImage');
const clearPuntaCanaImageButton = document.getElementById('clearPuntaCanaImage');
const puntaCanaStatus = document.getElementById('puntaCanaStatus');
const puntaCanaUploadCard = document.getElementById('puntaCanaUploadCard');
const gramadoFileInput = document.getElementById('gramadoFile');
const gramadoBase64Input = document.getElementById('gramadoBase64');
const saveGramadoImageButton = document.getElementById('saveGramadoImage');
const clearGramadoImageButton = document.getElementById('clearGramadoImage');
const gramadoStatus = document.getElementById('gramadoStatus');
const gramadoUploadCard = document.getElementById('gramadoUploadCard');
const lisboaFileInput = document.getElementById('lisboaFile');
const lisboaBase64Input = document.getElementById('lisboaBase64');
const saveLisboaImageButton = document.getElementById('saveLisboaImage');
const clearLisboaImageButton = document.getElementById('clearLisboaImage');
const lisboaStatus = document.getElementById('lisboaStatus');
const lisboaUploadCard = document.getElementById('lisboaUploadCard');
const teamRankingRing = document.getElementById('teamRankingRing');
const teamRankingPercent = document.getElementById('teamRankingPercent');
const teamRankingGoal = document.getElementById('teamRankingGoal');
const teamRankingCurrent = document.getElementById('teamRankingCurrent');
const robotTabs = document.querySelectorAll('.robot-tab');
const robotTabContents = document.querySelectorAll('.robot-tab__content');
const contractSearchInput = document.getElementById('contractSearch');
const contractAccountSelect = document.getElementById('contractAccount');
const contractSearchButton = document.getElementById('contractSearchButton');
const contractEmitButton = document.getElementById('contractEmitButton');
const contractFilesList = document.getElementById('contractFiles');
const contractStatus = document.getElementById('contractStatus');
const boletoSearchInput = document.getElementById('boletoSearch');
const boletoAccountSelect = document.getElementById('boletoAccount');
const boletoSearchButton = document.getElementById('boletoSearchButton');
const boletoEmitButton = document.getElementById('boletoEmitButton');
const boletoFilesList = document.getElementById('boletoFiles');
const boletoStatus = document.getElementById('boletoStatus');
const contempladosList = document.getElementById('contempladosList');

let storedOverrides = {};
try {
  storedOverrides = JSON.parse(localStorage.getItem('hubbieImageOverrides')) || {};
} catch (error) {
  storedOverrides = {};
}
const imageOverrides = { ...(window.HUBBIE_IMAGES || {}), ...storedOverrides };

const state = {
  user: null,
  clients: [
    { name: 'Mariana Costa', status: 'Em negociação', due: '15/11', value: 'R$ 1.280' },
    { name: 'Carlos Andrade', status: 'Inadimplente', due: '12/11', value: 'R$ 980' },
    { name: 'Fernanda Lopes', status: 'Aguardando pagamento', due: '18/11', value: 'R$ 2.100' },
    { name: 'Rafael Nunes', status: 'Tentando contato', due: '20/11', value: 'R$ 1.550' },
    { name: 'Paula Martins', status: 'Pago', due: '10/11', value: 'R$ 1.750' },
    { name: 'Eduardo Reis', status: 'Cancelado', due: '08/11', value: 'R$ 900' }
  ],
  reminders: [
    { client: 'Mariana Costa', time: '14:00', note: 'Confirmar envio de contrato' },
    { client: 'Carlos Andrade', time: '16:30', note: 'Negociar novo vencimento' }
  ],
  points: [
    { label: 'Vendas (6)', value: '300 pts' },
    { label: 'Reativações (3)', value: '90 pts' },
    { label: 'Follow-ups (12)', value: '30 pts' }
  ],
  teamSummary: {
    totalMonth: 0,
    metaFinal: 0
  },
  ranking: [
    { name: 'Ygor Motta', value: 'R$ 1.900.000,00', quotas: 36 },
    { name: 'Estephanie Barrach', value: 'R$ 1.820.000,00', quotas: 34 },
    { name: 'Caroline Letícia', value: 'R$ 1.760.000,00', quotas: 33 },
    { name: 'José Eberson', value: 'R$ 1.740.000,00', quotas: 32 },
    { name: 'Eduardo Tadeu', value: 'R$ 1.700.000,00', quotas: 31 },
    { name: 'Guilherme Moreira', value: 'R$ 1.680.000,00', quotas: 30 },
    { name: 'Vinicius Tassitani', value: 'R$ 1.650.000,00', quotas: 29 },
    { name: 'Consultor 08', value: 'R$ 1.620.000,00', quotas: 28 },
    { name: 'Consultor 09', value: 'R$ 1.600.000,00', quotas: 28 },
    { name: 'Consultor 10', value: 'R$ 1.580.000,00', quotas: 27 },
    { name: 'Consultor 11', value: 'R$ 1.560.000,00', quotas: 27 },
    { name: 'Consultor 12', value: 'R$ 1.540.000,00', quotas: 26 },
    { name: 'Consultor 13', value: 'R$ 1.520.000,00', quotas: 26 },
    { name: 'Consultor 14', value: 'R$ 1.500.000,00', quotas: 25 },
    { name: 'Consultor 15', value: 'R$ 1.480.000,00', quotas: 25 },
    { name: 'Consultor 16', value: 'R$ 1.460.000,00', quotas: 24 },
    { name: 'Consultor 17', value: 'R$ 1.440.000,00', quotas: 24 },
    { name: 'Consultor 18', value: 'R$ 1.420.000,00', quotas: 23 },
    { name: 'Consultor 19', value: 'R$ 1.400.000,00', quotas: 23 },
    { name: 'Consultor 20', value: 'R$ 1.380.000,00', quotas: 22 },
    { name: 'Consultor 21', value: 'R$ 1.360.000,00', quotas: 22 },
    { name: 'Consultor 22', value: 'R$ 1.340.000,00', quotas: 21 },
    { name: 'Consultor 23', value: 'R$ 1.320.000,00', quotas: 21 },
    { name: 'Consultor 24', value: 'R$ 1.300.000,00', quotas: 20 },
    { name: 'Consultor 25', value: 'R$ 1.280.000,00', quotas: 20 },
    { name: 'Consultor 26', value: 'R$ 1.260.000,00', quotas: 19 },
    { name: 'Consultor 27', value: 'R$ 1.240.000,00', quotas: 19 },
    { name: 'Consultor 28', value: 'R$ 1.220.000,00', quotas: 18 },
    { name: 'Consultor 29', value: 'R$ 1.200.000,00', quotas: 18 },
    { name: 'Consultor 30', value: 'R$ 1.180.000,00', quotas: 17 },
    { name: 'Consultor 31', value: 'R$ 1.160.000,00', quotas: 17 },
    { name: 'Consultor 32', value: 'R$ 1.140.000,00', quotas: 16 },
    { name: 'Consultor 33', value: 'R$ 1.120.000,00', quotas: 16 },
    { name: 'Consultor 34', value: 'R$ 1.100.000,00', quotas: 15 },
    { name: 'Consultor 35', value: 'R$ 1.080.000,00', quotas: 15 },
    { name: 'Consultor 36', value: 'R$ 1.060.000,00', quotas: 14 },
    { name: 'Consultor 37', value: 'R$ 1.040.000,00', quotas: 14 },
    { name: 'Consultor 38', value: 'R$ 1.020.000,00', quotas: 13 },
    { name: 'Consultor 39', value: 'R$ 1.000.000,00', quotas: 13 },
    { name: 'Consultor 40', value: 'R$ 980.000,00', quotas: 12 },
    { name: 'Consultor 41', value: 'R$ 960.000,00', quotas: 12 },
    { name: 'Consultor 42', value: 'R$ 940.000,00', quotas: 11 },
    { name: 'Consultor 43', value: 'R$ 920.000,00', quotas: 11 },
    { name: 'Consultor 44', value: 'R$ 900.000,00', quotas: 10 },
    { name: 'Consultor 45', value: 'R$ 880.000,00', quotas: 10 },
    { name: 'Consultor 46', value: 'R$ 860.000,00', quotas: 9 },
    { name: 'Consultor 47', value: 'R$ 840.000,00', quotas: 9 },
    { name: 'Consultor 48', value: 'R$ 820.000,00', quotas: 8 },
    { name: 'Consultor 49', value: 'R$ 800.000,00', quotas: 8 },
    { name: 'Consultor 50', value: 'R$ 780.000,00', quotas: 7 },
    { name: 'Consultor 51', value: 'R$ 760.000,00', quotas: 7 },
    { name: 'Consultor 52', value: 'R$ 740.000,00', quotas: 6 },
    { name: 'Consultor 53', value: 'R$ 720.000,00', quotas: 6 },
    { name: 'Consultor 54', value: 'R$ 700.000,00', quotas: 5 },
    { name: 'Consultor 55', value: 'R$ 680.000,00', quotas: 5 },
    { name: 'Consultor 56', value: 'R$ 660.000,00', quotas: 4 },
    { name: 'Consultor 57', value: 'R$ 640.000,00', quotas: 4 },
    { name: 'Consultor 58', value: 'R$ 620.000,00', quotas: 4 },
    { name: 'Consultor 59', value: 'R$ 600.000,00', quotas: 3 },
    { name: 'Consultor 60', value: 'R$ 580.000,00', quotas: 3 },
    { name: 'Consultor 61', value: 'R$ 560.000,00', quotas: 3 },
    { name: 'Consultor 62', value: 'R$ 540.000,00', quotas: 2 },
    { name: 'Consultor 63', value: 'R$ 520.000,00', quotas: 2 },
    { name: 'Consultor 64', value: 'R$ 500.000,00', quotas: 2 },
    { name: 'Consultor 65', value: 'R$ 480.000,00', quotas: 2 },
    { name: 'Consultor 66', value: 'R$ 460.000,00', quotas: 1 },
    { name: 'Consultor 67', value: 'R$ 440.000,00', quotas: 1 },
    { name: 'Consultor 68', value: 'R$ 420.000,00', quotas: 1 },
    { name: 'Consultor 69', value: 'R$ 400.000,00', quotas: 1 },
    { name: 'Consultor 70', value: 'R$ 380.000,00', quotas: 1 },
    { name: 'Consultor 71', value: 'R$ 360.000,00', quotas: 1 },
    { name: 'Consultor 72', value: 'R$ 340.000,00', quotas: 1 },
    { name: 'Consultor 73', value: 'R$ 320.000,00', quotas: 1 },
    { name: 'Consultor 74', value: 'R$ 300.000,00', quotas: 1 },
    { name: 'Consultor 75', value: 'R$ 280.000,00', quotas: 1 },
    { name: 'Consultor 76', value: 'R$ 260.000,00', quotas: 1 },
    { name: 'Consultor 77', value: 'R$ 240.000,00', quotas: 1 },
    { name: 'Consultor 78', value: 'R$ 220.000,00', quotas: 1 },
    { name: 'Consultor 79', value: 'R$ 200.000,00', quotas: 1 },
    { name: 'Consultor 80', value: 'R$ 180.000,00', quotas: 1 }
  ],
  bills: [
    { name: 'Carlos Andrade', status: 'Atrasado 3 dias', detail: 'R$ 980 • Venc. 12/11' },
    { name: 'Fernanda Lopes', status: 'Vence amanhã', detail: 'R$ 2.100 • Venc. 18/11' },
    { name: 'Mariana Costa', status: 'Vence em 2 dias', detail: 'R$ 1.280 • Venc. 15/11' }
  ],
  robots: [
    { name: 'Robô de emissão de boletos', status: 'Pronto para executar' },
    { name: 'Robô de atualização de CRM', status: 'Agendado às 18h' },
    { name: 'Robô de cobrança leve', status: 'Disponível' }
  ],
  robotContracts: [
    { id: '40411213', file: '40411213.pdf', status: 'Arquivo pronto para download' },
    { id: '40411213', file: '40411213_aditivo.pdf', status: 'Arquivo pronto para download' },
    { id: '40188720', file: '40188720.pdf', status: 'Arquivo pronto para download' }
  ],
  robotBoletos: [
    { id: '40311211', file: '40311211_02.pdf', status: 'Clique para baixar' },
    { id: '40311211', file: '40311211_03.pdf', status: 'Clique para baixar' },
    { id: '40311211', file: '40311211_04.pdf', status: 'Clique para baixar' },
    { id: '40100222', file: '40100222_01.pdf', status: 'Clique para baixar' }
  ],
  contemplados: [
    { name: 'Ana Luiza Pereira', plan: 'Plano 310', value: 'R$ 180.000,00' },
    { name: 'Gustavo Almeida', plan: 'Plano 240', value: 'R$ 220.000,00' },
    { name: 'Isabella Costa', plan: 'Plano 180', value: 'R$ 140.000,00' },
    { name: 'Lucas Martins', plan: 'Plano 360', value: 'R$ 320.000,00' },
    { name: 'Mariana Ferreira', plan: 'Plano 200', value: 'R$ 190.000,00' }
  ],
  campaigns: [
    { name: 'Campanha Ouro', status: 'Faltam 80 pts' },
    { name: 'Campanha Indique & Ganhe', status: '2 indicações pendentes' },
    { name: 'Meta Regional', status: 'R$ 35.000 faltando' }
  ],
  individualCampaigns: [
    {
      key: 'puntaCana',
      title: 'Punta Cana',
      image: imageOverrides.puntaCana || null,
      pointsHave: 420,
      pointsGoal: 600
    },
    {
      key: 'gramado',
      title: 'Gramado',
      image: imageOverrides.gramado || null,
      pointsHave: 280,
      pointsGoal: 450
    },
    {
      key: 'lisboa',
      title: 'Lisboa',
      image: imageOverrides.lisboa || null,
      pointsHave: 150,
      pointsGoal: 500
    }
  ],
  companyGoals: [
    { name: 'Meta mensal empresa', status: '62% concluída' },
    { name: 'Meta novos contratos', status: '28/40 fechados' },
    { name: 'Meta renovação', status: '15/25 clientes' }
  ],
  indicators: [
    { name: 'Conversão', value: '18%' },
    { name: 'Novos leads', value: '42' },
    { name: 'Contatos do dia', value: '27' }
  ],
  communications: [
    { name: 'Templates aprovados', value: '6' },
    { name: 'Mensagens enviadas', value: '24' },
    { name: 'Retornos aguardando', value: '5' }
  ],
  reports: [
    { name: 'Relatório semanal', value: 'Última atualização: hoje' },
    { name: 'Auditoria de acessos', value: '3 alertas pendentes' },
    { name: 'Performance por consultor', value: 'Disponível para exportar' }
  ],
  teamRanking: [],
  charts: [
    { name: 'Meta vs realizado', value: 'Gráfico mensal' },
    { name: 'Funil de vendas', value: 'Atualizado em tempo real' },
    { name: 'Evolução da carteira', value: 'Comparativo trimestral' }
  ]
};

const setLoggedInView = () => {
  loginCard.style.display = 'none';
  content.style.display = 'flex';
  sidebar.style.display = 'flex';
  document.body.classList.remove('is-login');
  if (topbar) {
    topbar.style.display = 'flex';
  }
};

const setLoggedOutView = () => {
  loginCard.style.display = 'grid';
  content.style.display = 'none';
  sidebar.style.display = 'none';
  document.body.classList.add('is-login');
  if (topbar) {
    topbar.style.display = 'none';
  }
};

const renderList = (elementId, items, formatter) => {
  const list = document.getElementById(elementId);
  list.innerHTML = '';
  items.forEach((item, index) => {
    const li = document.createElement('li');
    if (elementId === 'teamRankingList') {
      li.classList.add('team-ranking__item');
    }
    li.innerHTML = formatter(item, index);
    list.appendChild(li);
  });
};

const parseCurrencyToNumber = (value) => {
  if (value === null || value === undefined) {
    return 0;
  }
  const cleaned = value
    .toString()
    .replace(/[^\d,.-]/g, '')
    .replace(/\./g, '')
    .replace(/,/g, '.');
  const parsed = Number(cleaned);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const formatCurrency = (value) => {
  const amount = typeof value === 'number' ? value : parseCurrencyToNumber(value);
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);
};

const getSortedRanking = () =>
  [...state.ranking].sort((a, b) => (b.valueNumber || 0) - (a.valueNumber || 0));

const buildTeamRankingFromRows = (rows) => {
  if (rows.length < 8) {
    return { teams: [], summary: { totalMonth: 0, metaFinal: 0 } };
  }

  const teamRowMap = [
    { name: 'Tróia', row: 1 },
    { name: 'Meteor', row: 2 },
    { name: 'Chronos', row: 3 },
    { name: 'Constellation', row: 4 },
    { name: 'Maktub', row: 5 },
    { name: 'Titan', row: 6 },
    { name: 'Suits', row: 7 }
  ];

  const header = rows[0].map((cell) => cell.trim().toLowerCase());
  const teamHeaderIndex = header.findIndex((cell) => cell === 'equipes' || cell === 'equipe');
  const totalHeaderIndex = header.findIndex((cell) => cell === 'total janeiro');
  const metaHeaderIndex = header.findIndex((cell) => cell === 'meta');
  const summaryHeaderIndex = header.findIndex(
    (cell) => cell === 'total diario' || cell === 'total janeiro' || cell === 'total do mês'
  );

  const totalColumnIndex = totalHeaderIndex === -1 ? 12 : totalHeaderIndex; // Coluna M (Total Mensal)
  const metaColumnIndex = metaHeaderIndex === -1 ? 13 : metaHeaderIndex; // Coluna N (Meta)
  const summaryColumnIndex = summaryHeaderIndex === -1 ? 11 : summaryHeaderIndex; // Coluna L
  const totalMonthRowIndex = 12; // Linha 13
  const metaFinalRowIndex = 21; // Linha 22

  const fixedSummary = {
    totalMonth: parseCurrencyToNumber(rows[totalMonthRowIndex]?.[summaryColumnIndex] || ''),
    metaFinal: parseCurrencyToNumber(rows[metaFinalRowIndex]?.[summaryColumnIndex] || '')
  };

  const fixedTeams = teamRowMap.map((team) => {
    const row = rows[team.row] || [];
    return {
      name: team.name,
      total: parseCurrencyToNumber(row[totalColumnIndex] || ''),
      meta: parseCurrencyToNumber(row[metaColumnIndex] || '')
    };
  });

  const hasFixedData =
    fixedTeams.some((team) => team.total > 0 || team.meta > 0) ||
    fixedSummary.totalMonth > 0 ||
    fixedSummary.metaFinal > 0;

  if (hasFixedData) {
    return {
      summary: fixedSummary,
      teams: fixedTeams
        .map((team) => {
          const percent = team.meta ? Math.min(Math.round((team.total / team.meta) * 100), 100) : 0;
          const remaining = Math.max(100 - percent, 0);
          const achieved = team.meta > 0 ? team.total >= team.meta : false;
          return { ...team, percent, remaining, achieved };
        })
        .sort((a, b) => b.total - a.total)
    };
  }

  if (teamHeaderIndex === -1 || totalHeaderIndex === -1 || metaHeaderIndex === -1) {
    console.warn('Cabeçalhos de equipes não encontrados na planilha.');
    return { teams: fixedTeams, summary: fixedSummary };
  }

  const teamNames = new Set(['tróia', 'troia', 'meteor', 'chronos', 'constellation', 'maktub', 'titan', 'suits']);
  const fallbackSummary = { ...fixedSummary };
  const fallbackTeams = rows.slice(1)
    .map((row) => {
      const name = (row[teamHeaderIndex] || '').toString().trim();
      const normalized = name.toLowerCase();
      if (normalized === 'total fevereiro' && summaryHeaderIndex !== -1) {
        fallbackSummary.totalMonth = parseCurrencyToNumber(row[summaryHeaderIndex] || '');
      }
      if (normalized === 'meta' && summaryHeaderIndex !== -1) {
        fallbackSummary.metaFinal = parseCurrencyToNumber(row[summaryHeaderIndex] || '');
      }
      if (!teamNames.has(normalized)) {
        return null;
      }
      return {
        name,
        total: parseCurrencyToNumber(row[totalHeaderIndex] || ''),
        meta: parseCurrencyToNumber(row[metaHeaderIndex] || '')
      };
    })
    .filter(Boolean);

  return {
    summary: fallbackSummary,
    teams: fallbackTeams
      .map((team) => {
        const percent = team.meta ? Math.min(Math.round((team.total / team.meta) * 100), 100) : 0;
        const remaining = Math.max(100 - percent, 0);
        const achieved = team.meta > 0 ? team.total >= team.meta : false;
        return { ...team, percent, remaining, achieved };
      })
      .sort((a, b) => b.total - a.total)
  };
};

const renderDashboard = () => {
  const progressPercent = Math.round((172500 / 280000) * 100);
  monthlyBar.style.width = `${progressPercent}%`;
  const sortedRanking = getSortedRanking();
  const fallbackTeamSales = state.teamRanking.reduce((acc, team) => acc + (team.total || 0), 0);
  const fallbackTeamMeta = state.teamRanking.reduce((acc, team) => acc + (team.meta || 0), 0);
  const totalTeamSales = state.teamSummary.totalMonth || fallbackTeamSales;
  const totalTeamMeta = state.teamSummary.metaFinal || fallbackTeamMeta;
  const totalPercent = totalTeamMeta ? Math.min(Math.round((totalTeamSales / totalTeamMeta) * 100), 100) : 0;

  if (teamRankingRing && teamRankingPercent && teamRankingGoal && teamRankingCurrent) {
    teamRankingRing.style.setProperty('--percent', `${totalPercent}%`);
    teamRankingPercent.textContent = `${totalPercent}%`;
    teamRankingGoal.textContent = formatCurrency(totalTeamMeta);
    teamRankingCurrent.textContent = formatCurrency(totalTeamSales);
  }

  renderList('pointsBreakdown', state.points, (item) => `<span>${item.label}</span>${item.value}`);
  renderList(
    'rankingList',
    sortedRanking,
    (item, index) =>
      `<span>${index + 1}° ${item.name}</span>${formatCurrency(item.valueNumber || item.value)} • ${item.quotas} cotas`
  );
  renderList(
    'rankingFull',
    sortedRanking,
    (item, index) =>
      `<span>${index + 1}° ${item.name}</span>${formatCurrency(item.valueNumber || item.value)} • ${item.quotas} cotas`
  );
  renderList('billAlerts', state.bills, (item) => `<span>${item.name}</span>${item.status}`);
  renderList('billDetails', state.bills, (item) => `<span>${item.name}</span>${item.detail}`);
  renderList('campaignList', state.campaigns, (item) => `<span>${item.name}</span>${item.status}`);
  renderList('companyGoals', state.companyGoals, (item) => `<span>${item.name}</span>${item.status}`);
  renderList('quickIndicators', state.indicators, (item) => `<span>${item.name}</span>${item.value}`);
  renderList('communicationList', state.communications, (item) => `<span>${item.name}</span>${item.value}`);
  renderList('reportList', state.reports, (item) => `<span>${item.name}</span>${item.value}`);
  renderList('chartsList', state.charts, (item) => `<span>${item.name}</span>${item.value}`);
  renderList(
    'teamRankingList',
    state.teamRanking,
    (item, index) =>
      `<div class="team-ranking__rank">${index + 1}°</div>
       <div class="team-ranking__content">
         <div class="team-ranking__header">
           <span class="team-ranking__name">${item.name}</span>
           <span class="team-ranking__value">${formatCurrency(item.total)}</span>
         </div>
         <div class="team-ranking__meta">
           <span>Meta mensal: ${formatCurrency(item.meta)}</span>
           <span>${item.percent}% de progresso</span>
         </div>
         <div class="team-ranking__progress">
           <div class="team-ranking__bar ${item.achieved ? 'is-achieved' : 'is-pending'}" style="width:${
             item.percent
           }%"></div>
         </div>
       </div>`
  );
  renderIndividualCampaigns();

  applyClientFilter();
  renderReminders();
  renderRobotFiles(contractFilesList, state.robotContracts);
  renderRobotFiles(boletoFilesList, state.robotBoletos);
  renderContemplados();
};

const parseCsv = (text) => {
  const rows = [];
  let row = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(current);
      current = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i += 1;
      }
      row.push(current);
      if (row.length > 1 || row[0] !== '') {
        rows.push(row);
      }
      row = [];
      current = '';
      continue;
    }

    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current);
    rows.push(row);
  }

  return rows;
};

const fallbackRankingCsv = `Equipe,Consultor,Vendas Janeiro,Valor Vendido,Pendentes,Ok,Equipe ,Supervisor,,,Equipes,Total Diario,Total Janeiro,Meta,Falta,MÃ©dia,ProjeÃ§Ã£o, Cotas,Seguro,% Seguro
Meteor - Solange,Ygor Motta,2,110000,1,1,Meteor,Solange,,,TrÃ³ia,"R$ 0,00","R$ 0,00","R$ 5.500.000,00","R$ 5.500.000,00","R$ 0,00","R$ 0,00",0,0,#DIV/0!
Maktub - Helio,Thaiane Vanderlei,1,80000,,1,Maktub,Helio,,,Meteor,"R$ 0,00","R$ 110.000,00","R$ 5.250.000,00","R$ 5.140.000,00","R$ 55.000,00","R$ 990.000,00",2,2,"100,00%"
Troia - Renato,Izabelle Compagnone,,,,,TrÃ³ia,Renato,,,Chronos,"R$ 0,00","R$ 0,00","R$ 5.500.000,00","R$ 5.500.000,00","R$ 0,00","R$ 0,00",0,0,#DIV/0!
Titan - Jovana,Pietra Ferreira,,,,,Titan,Jovana,,,Constellation,"R$ 0,00","R$ 0,00","R$ 5.000.000,00","R$ 5.000.000,00","R$ 0,00","R$ 0,00",0,0,#DIV/0!
Meteor - Solange,Pedro Canezin,,,,,Meteor,Solange,,,Maktub,"R$ 0,00","R$ 80.000,00","R$ 5.500.000,00","R$ 5.420.000,00","R$ 40.000,00","R$ 720.000,00",1,1,"100,00%"
Troia - Renato,Renan Souza,,,,,TrÃ³ia,Renato,,,Titan,"R$ 0,00","R$ 0,00","R$ 4.750.000,00","R$ 4.750.000,00","R$ 0,00","R$ 0,00",0,0,#DIV/0!
Constellation - Carraro,Anna Queiroz,,,,,Constellation,Carraro,,,Suits,"R$ 0,00","R$ 0,00","R$ 5.250.000,00","R$ 5.250.000,00","R$ 0,00","R$ 0,00",0,0,#DIV/0!
Chronos- Wesley,Morgana Coelho,,,,,Chronos,Wesley,,,,,,,,,,,,
Constellation - Carraro,Jonathan Silva,,,,,Constellation,Carraro,,,Totais,"R$ 0,00","R$ 190.000,00","R$ 36.750.000,00","R$ 36.560.000,00","R$ 95.000,00","R$ 1.710.000,00",3,3,"100,00%"
Meteor - Solange,Eduardo Tadeu,,,,,Meteor,Solange,,,,,,,,,,,,
Troia - Renato,Sandra Barros,,,,,TrÃ³ia,Renato,,,Total dia:,"R$ 0,00",,,,,,,,
Chronos- Wesley,Suzane Almeida,,,,,Chronos,Wesley,,,Total Fevereiro,"R$ 190.000,00",,,,,,,,
Troia - Renato,Cristian Ribeiro,,,,,TrÃ³ia,Renato,,,MÃ©dia atual:,"R$ 95.000,00",,,,,,,,
Suits - Cicero,Fabiana Alves,,,,,Suits,Cicero,,,Falta pra 40M:,"R$ 39.810.000,00",,,,,,,,
Maktub - Helio,Adriana Silva,,,,,Maktub,Helio,,,Falta pra 36.5M,"R$ 36.560.000,00",,,,,,,,
Chronos- Wesley,Kaue Pereira,,,,,Chronos,Wesley,,,,,,,,,,,,
Chronos- Wesley,Marco Roberto,,,,,Chronos,Wesley,,,Dias Ãºteis total,18,,,,,,,,
Constellation - Carraro,Jose Eberson,,,,,Constellation,Carraro,,,Dias Ãºteis faltantes,16,,,,,,,,
Maktub - Helio,Richard Lima,,,,,Maktub,Helio,,,Dias Ãºteis jÃ¡ trabalhados,2,,,,,,,,
Meteor - Solange,Alleck Santana,,,,,Meteor,Solange,,,,,,,,,,,,
Constellation - Carraro,Stephanie Barrach,,,,,Constellation,Carraro,,,Meta ,"R$ 40.000.000,00",,,,,,,,
Meteor - Solange,Victor Souza,,,,,Meteor,Solange,,,,,,,,,,,,
Suits - Cicero,Mauricio Mendes,,,,,Suits,Cicero,,,,,,,,,,,,
Troia - Renato,Carolina Pinheiro,,,,,TrÃ³ia,Renato,,,,,,,,,,,,
Troia - Renato,Carolyne Leticia,,,,,TrÃ³ia,Renato,,,,,,,,,,,,
Maktub - Helio,Guilherme Moreira,,,,,Maktub,Helio,,,,,,,,,,,,
Chronos- Wesley,Vitoria Alice,,,,,Chronos,Wesley,,,,,,,,,,,,
Titan - Jovana,Alison Rafael,,,,,Titan,Jovana,,,,,,,,,,,,
Chronos- Wesley,Jamile Oliveira,,,,,Chronos,Wesley,,,,,,,,,,,,
Meteor - Solange,Yasmin Maria,,,,,Meteor,Solange,,,,,,,,,,,,
Maktub - Helio,Isabella Camargo,,,,,Maktub,Helio,,,,,,,,,,,,
Constellation - Carraro,Gustavo Machado,,,,,Constellation,Carraro,,,,,,,,,,,,
Troia - Renato,Felippe Sousa,,,,,TrÃ³ia,Renato,,,,,,,,,,,,
Titan - Jovana,Flavio Camargo,,,,,Titan,Jovana,,,,,,,,,,,,
Troia - Renato,Vanessa Vallim,,,,,TrÃ³ia,Renato,,,,,,,,,,,,
Constellation - Carraro,Isabelly Ferreira,,,,,Constellation,Carraro,,,,,,,,,,,,
Constellation - Carraro,Leila Silva,,,,,Constellation,Carraro,,,,,,,,,,,,
Meteor - Solange,Larissa Fernandes,,,,,Meteor,Solange,,,,,,,,,,,,
Meteor - Solange,Matheus Sacramento,,,,,Meteor,Solange,,,,,,,,,,,,
Constellation - Carraro,Felipe Borges,,,,,Constellation,Carraro,,,,,,,,,,,,
Troia - Renato,Melissa Cavalcanti,,,,,TrÃ³ia,Renato,,,,,,,,,,,,
Maktub - Helio,Tauani Cavilha,,,,,Maktub,Helio,,,,,,,,,,,,
Chronos- Wesley,Alexandre Junior,,,,,Chronos,Wesley,,,,,,,,,,,,
Suits - Cicero,Beatriz Damasceno,,,,,Suits,Cicero,,,,,,,,,,,,
Meteor - Solange,JoÃ£o Vitor,,,,,Meteor,Solange,,,,,,,,,,,,
Maktub - Helio,Estefani Darlen,,,,,Maktub,Helio,,,,,,,,,,,,
Titan - Jovana,Ketlyn Oliveira,,,,,Titan,Jovana,,,,,,,,,,,,
Chronos- Wesley,Luciana Pinheiro,,,,,Chronos,Wesley,,,,,,,,,,,,
Meteor - Solange,Luiz Oliveira,,,,,Meteor,Solange,,,,,,,,,,,,
Troia - Renato,Raquel Lopes,,,,,TrÃ³ia,Renato,,,,,,,,,,,,
Titan - Jovana,Ana Biude,,,,,Titan,Jovana,,,,,,,,,,,,
Meteor - Solange,Ruan Mendes,,,,,Meteor,Solange,,,,,,,,,,,,
Troia - Renato,Jessica Vicchini,,,,,TrÃ³ia,Renato,,,,,,,,,,,,
Chronos- Wesley,Lucas Silva,,,,,Chronos,Wesley,,,,,,,,,,,,
Maktub - Helio,Vinicius Tassitani,,,,,Maktub,Helio,,,,,,,,,,,,
Maktub - Helio,Helio Donizeti,,,,,Maktub,Helio,,,,,,,,,,,,
Maktub - Helio,Thaynara Silva,,,,,Maktub,Helio,,,,,,,,,,,,
Chronos- Wesley,Gabriella Teodoro,,,,,Chronos,Wesley,,,,,,,,,,,,
Chronos- Wesley,Rafael GonÃ§alves,,,,,Chronos,Wesley,,,,,,,,,,,,
Meteor - Solange,Gabriella Andrade,,,,,Meteor,Solange,,,,,,,,,,,,
Maktub - Helio,Ana Luiza,,,,,Maktub,Helio,,,,,,,,,,,,
Titan - Jovana,Ryan Marques,,,,,Titan,Jovana,,,,,,,,,,,,
Chronos- Wesley,Maximiliano Oliveira,,,,,Chronos,Wesley,,,,,,,,,,,,
Titan - Jovana,Juliane Santos,,,,,Titan,Jovana,,,,,,,,,,,,
Maktub - Helio,Kelly Silva,,,,,Maktub,Helio,,,,,,,,,,,,
Titan - Jovana,Beatriz Macedo,,,,,Titan,Jovana,,,,,,,,,,,,
Troia - Renato,Marcia Regina,,,,,TrÃ³ia,Renato,,,,,,,,,,,,
Meteor - Solange,Gustavo Oliveira,,,,,Meteor,Solange,,,,,,,,,,,,
Maktub - Helio,Sabrina Dias,,,,,Maktub,Helio,,,,,,,,,,,,
Suits - Cicero,Carla Lorensetti,,,,,Suits,Cicero,,,,,,,,,,,,
Suits - Cicero,Yasmin Tavares,,,,,Suits,Cicero,,,,,,,,,,,,
Suits - Cicero,Patricia Romero,,,,,Suits,Cicero,,,,,,,,,,,,
Suits - Cicero,Juliana Macedo,,,,,Suits,Cicero,,,,,,,,,,,,
,,,,,,,,,,Troia,"R$ 0,00","R$ 0,00","R$ 5.500.000,00","R$ 5.500.000,00"
,,,,,,,,,,Meteor,"R$ 90.000,00","R$ 200.000,00","R$ 5.250.000,00","R$ 5.050.000,00"
,,,,,,,,,,Chronos,"R$ 0,00","R$ 0,00","R$ 5.500.000,00","R$ 5.500.000,00"
,,,,,,,,,,Constellation,"R$ 0,00","R$ 0,00","R$ 5.500.000,00","R$ 5.500.000,00"
,,,,,,,,,,Maktub,"R$ 0,00","R$ 800.000,00","R$ 5.500.000,00","R$ 4.700.000,00"
,,,,,,,,,,Titan,"R$ 0,00","R$ 0,00","R$ 4.750.000,00","R$ 4.750.000,00"
,,,,,,,,,,Suits,"R$ 0,00","R$ 0,00","R$ 5.250.000,00","R$ 5.250.000,00"
`;

const buildRankingFromRows = (rows) => {
  if (rows.length < 2) {
    return [];
  }
  const header = rows[0].map((cell) => cell.trim().toLowerCase());
  const nameIndex = header.findIndex((cell) => cell === 'consultor' || cell === 'nome do consultor');
  const quotaIndex = header.findIndex(
    (cell) => cell === 'vendas janeiro' || cell === 'cotas'
  );
  const valueIndex = header.findIndex(
    (cell) => cell === 'valor vendido' || cell === 'r$'
  );

  if (nameIndex === -1 || quotaIndex === -1 || valueIndex === -1) {
    console.warn('Cabeçalhos esperados não encontrados na planilha.');
    return [];
  }

  return rows
    .slice(1)
    .map((row) => ({
      name: (row[nameIndex] || '').trim(),
      quotas: (row[quotaIndex] || '').toString().trim(),
      value: (row[valueIndex] || '').toString().trim(),
      valueNumber: parseCurrencyToNumber(row[valueIndex] || '')
    }))
    .filter((entry) => entry.name);
};

const rankingRefreshMs = 60 * 1000;

const fetchRankingFromSheets = async () => {
  const sheetId = '1IuODtcSId6uzy7Rzz1rA0Msm7p6w7PlTbs4xbMR6VKg';
  const gid = '1940056038';
  const fallbackUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;
  const apiUrl = '/api/ranking';

  try {
    let response = await fetch(apiUrl);
    if (!response.ok) {
      response = await fetch(fallbackUrl);
    }
    if (!response.ok) {
      throw new Error(`Falha ao carregar planilha: ${response.status}`);
    }
    const text = await response.text();
    const rows = parseCsv(text);
    const rankingEntries = buildRankingFromRows(rows);
    const teamPayload = buildTeamRankingFromRows(rows);
    if (!rankingEntries.length) {
      throw new Error('Ranking vazio após parse do CSV.');
    }
    state.ranking = rankingEntries;
    state.teamRanking = teamPayload.teams;
    state.teamSummary = teamPayload.summary;
    if (state.user) {
      renderDashboard();
    }
  } catch (error) {
    console.warn('Não foi possível carregar o ranking do Google Sheets.', error);
    const fallbackRows = parseCsv(fallbackRankingCsv);
    const fallbackEntries = buildRankingFromRows(fallbackRows);
    const fallbackTeamPayload = buildTeamRankingFromRows(fallbackRows);
    if (fallbackEntries.length) {
      state.ranking = fallbackEntries;
      state.teamRanking = fallbackTeamPayload.teams;
      state.teamSummary = fallbackTeamPayload.summary;
      if (state.user) {
        renderDashboard();
      }
    }
  }
};

const renderIndividualCampaigns = () => {
  const container = document.getElementById('individualCampaigns');
  container.innerHTML = '';
  state.individualCampaigns.forEach((campaign) => {
    const remaining = Math.max(campaign.pointsGoal - campaign.pointsHave, 0);
    const percent = Math.min(Math.round((campaign.pointsHave / campaign.pointsGoal) * 100), 100);
    const percentRemaining = Math.max(100 - percent, 0);
    const imageMarkup = campaign.image
      ? `<img src="${campaign.image}" alt="Imagem da campanha ${campaign.title}" />`
      : `<div class="campaign-card__placeholder">Adicione uma imagem real do destino</div>`;

    const card = document.createElement('article');
    card.className = 'card campaign-card';
    card.innerHTML = `
      ${imageMarkup}
      <div>
        <h3>${campaign.title}</h3>
        <p class="sub">Campanha individual com destino ${campaign.title}.</p>
      </div>
      <div class="campaign-metrics">
        <div class="metric-line"><span>Pontos atuais</span><span>${campaign.pointsHave} pts</span></div>
        <div class="metric-line"><span>Meta de pontos</span><span>${campaign.pointsGoal} pts</span></div>
        <div class="metric-line"><span>Pontos restantes</span><span>${remaining} pts</span></div>
      </div>
      <div class="campaign-progress">
        <small>${percent}% atingido • ${percentRemaining}% faltando</small>
        <div class="progress">
          <div class="progress__bar" style="width: ${percent}%"></div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
};

const applyClientFilter = () => {
  const query = clientSearch.value.trim().toLowerCase();
  const status = clientStatusFilter.value;
  const filtered = state.clients.filter((client) => {
    const matchesName = client.name.toLowerCase().includes(query);
    const matchesStatus = status ? client.status === status : true;
    return matchesName && matchesStatus;
  });
  renderList('clientList', filtered, (client) =>
    `<span>${client.name}</span><span class="status">${client.status}</span> ${client.due} • ${client.value}`
  );
};

const renderReminders = () => {
  renderList('reminderList', state.reminders, (item) =>
    `<span>${item.client}</span>${item.time} • ${item.note || 'Sem observações'}`
  );
};

const renderRobotFiles = (listElement, items) => {
  if (!listElement) {
    return;
  }
  listElement.innerHTML = '';
  if (!items.length) {
    const empty = document.createElement('li');
    empty.className = 'robot-file robot-file--empty';
    empty.textContent = 'Nenhum arquivo encontrado para esse contrato.';
    listElement.appendChild(empty);
    return;
  }
  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'robot-file';
    li.innerHTML = `
      <div>
        <strong>${item.file}</strong>
        <span>${item.status}</span>
      </div>
      <button type="button" class="ghost">Baixar</button>
    `;
    listElement.appendChild(li);
  });
};

const renderContemplados = () => {
  if (!contempladosList) {
    return;
  }
  contempladosList.innerHTML = '';
  state.contemplados.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'robot-contemplado';
    li.innerHTML = `
      <span>${item.name}</span>
      <span>${item.plan}</span>
      <strong>${item.value}</strong>
    `;
    contempladosList.appendChild(li);
  });
};

const setActiveRobotTab = (tabId) => {
  robotTabs.forEach((tab) => {
    tab.classList.toggle('is-active', tab.dataset.robotTab === tabId);
  });
  robotTabContents.forEach((content) => {
    content.classList.toggle('is-active', content.dataset.robotContent === tabId);
  });
};

const persistImageOverrides = (overrides) => {
  localStorage.setItem('hubbieImageOverrides', JSON.stringify(overrides));
};

const toggleUploadVisibility = (uploadCard, hasImage) => {
  if (!uploadCard) {
    return;
  }
  uploadCard.classList.toggle('is-hidden', hasImage);
};

const updateCampaignImage = (key, dataUrl, statusElement, uploadCard) => {
  if (!statusElement) {
    return;
  }
  const overrides = { ...(window.HUBBIE_IMAGES || {}), ...storedOverrides };
  if (dataUrl) {
    overrides[key] = dataUrl;
    storedOverrides = { ...storedOverrides, [key]: dataUrl };
    statusElement.textContent = 'Imagem salva localmente para esta campanha.';
  } else {
    delete overrides[key];
    const { [key]: removed, ...rest } = storedOverrides;
    storedOverrides = rest;
    statusElement.textContent = 'Imagem removida. Cole uma nova base64.';
  }
  persistImageOverrides(storedOverrides);
  const campaign = state.individualCampaigns.find((item) => item.key === key);
  if (campaign) {
    campaign.image = dataUrl || null;
  }
  toggleUploadVisibility(uploadCard, Boolean(dataUrl));
  renderIndividualCampaigns();
};

const initializeCampaignUpload = (config) => {
  const {
    key,
    fileInput,
    base64Input,
    saveButton,
    clearButton,
    statusElement,
    uploadCard
  } = config;

  if (
    !fileInput ||
    !base64Input ||
    !saveButton ||
    !clearButton ||
    !statusElement
  ) {
    return;
  }

  if (imageOverrides[key]) {
    base64Input.value = imageOverrides[key];
    statusElement.textContent = 'Imagem base64 carregada.';
  }
  toggleUploadVisibility(uploadCard, Boolean(imageOverrides[key]));

  fileInput.addEventListener('change', () => {
    const [file] = fileInput.files || [];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      base64Input.value = reader.result;
      statusElement.textContent = 'Imagem convertida para base64. Clique em salvar.';
    };
    reader.readAsDataURL(file);
  });

  saveButton.addEventListener('click', () => {
    const value = base64Input.value.trim();
    if (!value) {
      statusElement.textContent = 'Cole uma base64 válida para salvar.';
      return;
    }
    updateCampaignImage(key, value, statusElement, uploadCard);
  });

  clearButton.addEventListener('click', () => {
    base64Input.value = '';
    if (fileInput) {
      fileInput.value = '';
    }
    updateCampaignImage(key, null, statusElement, uploadCard);
  });
};

const initializeLoginHero = () => {
  if (!loginMedia) {
    return;
  }
  const heroImage = imageOverrides.loginHero;
  if (heroImage) {
    loginMedia.style.backgroundImage = `url('${heroImage}')`;
  }
  toggleUploadVisibility(loginHeroUploadCard, Boolean(heroImage));
};

const updateLoginHero = (dataUrl) => {
  if (!loginMedia || !loginHeroStatus) {
    return;
  }
  if (dataUrl) {
    storedOverrides = { ...storedOverrides, loginHero: dataUrl };
    loginMedia.style.backgroundImage = `url('${dataUrl}')`;
    loginHeroStatus.textContent = 'Imagem salva localmente para a tela de login.';
  } else {
    const { loginHero, ...rest } = storedOverrides;
    storedOverrides = rest;
    loginMedia.style.backgroundImage = '';
    loginHeroStatus.textContent = 'Imagem removida. Cole uma nova base64.';
  }
  persistImageOverrides(storedOverrides);
  toggleUploadVisibility(loginHeroUploadCard, Boolean(dataUrl));
};

const initializeLoginHeroUpload = () => {
  if (
    !loginHeroFileInput ||
    !loginHeroBase64Input ||
    !saveLoginHeroImageButton ||
    !clearLoginHeroImageButton ||
    !loginHeroStatus
  ) {
    return;
  }

  if (imageOverrides.loginHero) {
    loginHeroBase64Input.value = imageOverrides.loginHero;
    loginHeroStatus.textContent = 'Imagem base64 carregada.';
  }

  loginHeroFileInput.addEventListener('change', () => {
    const [file] = loginHeroFileInput.files || [];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      loginHeroBase64Input.value = reader.result;
      loginHeroStatus.textContent = 'Imagem convertida para base64. Clique em salvar.';
    };
    reader.readAsDataURL(file);
  });

  saveLoginHeroImageButton.addEventListener('click', () => {
    const value = loginHeroBase64Input.value.trim();
    if (!value) {
      loginHeroStatus.textContent = 'Cole uma base64 válida para salvar.';
      return;
    }
    updateLoginHero(value);
  });

  clearLoginHeroImageButton.addEventListener('click', () => {
    loginHeroBase64Input.value = '';
    if (loginHeroFileInput) {
      loginHeroFileInput.value = '';
    }
    updateLoginHero(null);
  });
};

const loadSession = () => {
  const saved = localStorage.getItem('consorcioUser');
  if (saved) {
    state.user = JSON.parse(saved);
    userName.textContent = state.user.name;
    userRole.textContent = state.user.role;
    setLoggedInView();
    renderDashboard();
  } else {
    setLoggedOutView();
  }
};

const setActiveSection = (sectionId) => {
  sections.forEach((section) => {
    section.classList.toggle('is-active', section.dataset.section === sectionId);
  });
  menuButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.section === sectionId);
  });
};

menuButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const section = button.dataset.section;
    if (section === 'logout') {
      localStorage.removeItem('consorcioUser');
      state.user = null;
      userName.textContent = 'Convidado';
      userRole.textContent = 'Comercial';
      setLoggedOutView();
      setActiveSection('inicio');
      setActiveSubsection('campanhas-individuais');
      return;
    }
    if (section === 'ranking') {
      setActiveSubsection('ranking-geral');
    }
    if (section === 'campanhas') {
      setActiveSubsection('campanhas-individuais');
    }
    setActiveSection(section);
  });
});

const setActiveSubsection = (subsectionId) => {
  subsections.forEach((subsection) => {
    subsection.classList.toggle('is-active', subsection.dataset.subsection === subsectionId);
  });
  subnavButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.subsection === subsectionId);
  });
};

subnavButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActiveSubsection(button.dataset.subsection);
  });
});

brandToggle.addEventListener('click', () => {
  if (sidebar.classList.contains('is-collapsed')) {
    sidebar.classList.remove('is-collapsed');
  } else {
    setActiveSection('inicio');
  }
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('loginUser').value.trim();
  const role = document.getElementById('loginRole').value;

  state.user = { name, role };
  localStorage.setItem('consorcioUser', JSON.stringify(state.user));
  userName.textContent = name;
  userRole.textContent = role;
  setLoggedInView();
  renderDashboard();
  setActiveSection('inicio');
  setActiveSubsection('campanhas-individuais');
});

clientSearch.addEventListener('input', () => {
  applyClientFilter();
});

clientStatusFilter.addEventListener('change', () => {
  applyClientFilter();
});

const reminderForm = document.getElementById('reminderForm');
reminderForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const client = document.getElementById('reminderClient').value.trim();
  const time = document.getElementById('reminderTime').value;
  const note = document.getElementById('reminderNote').value.trim();

  state.reminders.unshift({ client, time, note });
  reminderForm.reset();
  renderReminders();
});

robotTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    setActiveRobotTab(tab.dataset.robotTab);
  });
});

const filterRobotFiles = (items, query) =>
  items.filter((item) => item.id.toLowerCase().includes(query));

if (contractSearchButton) {
  contractSearchButton.addEventListener('click', () => {
    const query = (contractSearchInput?.value || '').trim().toLowerCase();
    const matches = query ? filterRobotFiles(state.robotContracts, query) : state.robotContracts;
    renderRobotFiles(contractFilesList, matches);
    if (contractStatus) {
      contractStatus.textContent = query ? `Busca realizada para ${query}.` : '';
    }
  });
}

if (contractEmitButton) {
  contractEmitButton.addEventListener('click', () => {
    const contractNumber = (contractSearchInput?.value || '').trim();
    const account = contractAccountSelect?.value || '';
    if (contractStatus) {
      contractStatus.textContent = contractNumber
        ? `Robô de contratos acionado para ${contractNumber} (${account}).`
        : 'Informe um número de contrato antes de emitir.';
    }
  });
}

if (boletoSearchButton) {
  boletoSearchButton.addEventListener('click', () => {
    const query = (boletoSearchInput?.value || '').trim().toLowerCase();
    const matches = query ? filterRobotFiles(state.robotBoletos, query) : state.robotBoletos;
    renderRobotFiles(boletoFilesList, matches);
    if (boletoStatus) {
      boletoStatus.textContent = query ? `Busca realizada para ${query}.` : '';
    }
  });
}

if (boletoEmitButton) {
  boletoEmitButton.addEventListener('click', () => {
    const boletoNumber = (boletoSearchInput?.value || '').trim();
    const account = boletoAccountSelect?.value || '';
    if (boletoStatus) {
      boletoStatus.textContent = boletoNumber
        ? `Robô de boletos acionado para ${boletoNumber} (${account}).`
        : 'Informe um número de contrato antes de emitir.';
    }
  });
}

setActiveSection('inicio');
setActiveSubsection('campanhas-individuais');
setActiveRobotTab('contratos');
fetchRankingFromSheets();
setInterval(fetchRankingFromSheets, rankingRefreshMs);
loadSession();
initializeLoginHero();
initializeLoginHeroUpload();
initializeCampaignUpload({
  key: 'puntaCana',
  fileInput: puntaCanaFileInput,
  base64Input: puntaCanaBase64Input,
  saveButton: savePuntaCanaImageButton,
  clearButton: clearPuntaCanaImageButton,
  statusElement: puntaCanaStatus,
  uploadCard: puntaCanaUploadCard
});
initializeCampaignUpload({
  key: 'gramado',
  fileInput: gramadoFileInput,
  base64Input: gramadoBase64Input,
  saveButton: saveGramadoImageButton,
  clearButton: clearGramadoImageButton,
  statusElement: gramadoStatus,
  uploadCard: gramadoUploadCard
});
initializeCampaignUpload({
  key: 'lisboa',
  fileInput: lisboaFileInput,
  base64Input: lisboaBase64Input,
  saveButton: saveLisboaImageButton,
  clearButton: clearLisboaImageButton,
  statusElement: lisboaStatus,
  uploadCard: lisboaUploadCard
});
