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
  items.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = formatter(item);
    list.appendChild(li);
  });
};

const renderDashboard = () => {
  const progressPercent = Math.round((172500 / 280000) * 100);
  monthlyBar.style.width = `${progressPercent}%`;

  renderList('pointsBreakdown', state.points, (item) => `<span>${item.label}</span>${item.value}`);
  renderList(
    'rankingList',
    state.ranking,
    (item) => `<span>${item.name}</span>${item.value} • ${item.quotas} cotas`
  );
  renderList(
    'rankingFull',
    state.ranking,
    (item) => `<span>${item.name}</span>${item.value} • ${item.quotas} cotas`
  );
  renderList('billAlerts', state.bills, (item) => `<span>${item.name}</span>${item.status}`);
  renderList('billDetails', state.bills, (item) => `<span>${item.name}</span>${item.detail}`);
  renderList('robotList', state.robots, (item) => `<span>${item.name}</span>${item.status}`);
  renderList('campaignList', state.campaigns, (item) => `<span>${item.name}</span>${item.status}`);
  renderList('companyGoals', state.companyGoals, (item) => `<span>${item.name}</span>${item.status}`);
  renderList('quickIndicators', state.indicators, (item) => `<span>${item.name}</span>${item.value}`);
  renderList('communicationList', state.communications, (item) => `<span>${item.name}</span>${item.value}`);
  renderList('reportList', state.reports, (item) => `<span>${item.name}</span>${item.value}`);
  renderList('chartsList', state.charts, (item) => `<span>${item.name}</span>${item.value}`);
  renderList('pointsSummary', state.points, (item) => `<span>${item.label}</span>${item.value}`);
  renderIndividualCampaigns();

  applyClientFilter();
  renderReminders();
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

setActiveSection('inicio');
setActiveSubsection('campanhas-individuais');
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
