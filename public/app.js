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
    { name: 'Ana Souza', value: '520 pts' },
    { name: 'Você', value: '420 pts' },
    { name: 'Bruno Lima', value: '390 pts' }
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
      title: 'Punta Cana',
      image: 'images/punta-cana.svg',
      pointsHave: 420,
      pointsGoal: 600
    },
    {
      title: 'Gramado',
      image: 'images/gramado.svg',
      pointsHave: 280,
      pointsGoal: 450
    },
    {
      title: 'Lisboa',
      image: 'images/lisboa.svg',
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
};

const setLoggedOutView = () => {
  loginCard.style.display = 'flex';
  content.style.display = 'none';
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
  renderList('rankingList', state.ranking, (item) => `<span>${item.name}</span>${item.value}`);
  renderList('rankingFull', state.ranking, (item) => `<span>${item.name}</span>${item.value}`);
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

    const card = document.createElement('article');
    card.className = 'card campaign-card';
    card.innerHTML = `
      <img src="${campaign.image}" alt="Imagem da campanha ${campaign.title}" />
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
    setActiveSection(button.dataset.section);
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
