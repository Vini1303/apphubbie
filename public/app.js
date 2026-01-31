const loginForm = document.getElementById('loginForm');
const loginCard = document.getElementById('loginCard');
const dashboard = document.getElementById('dashboard');
const userName = document.getElementById('userName');
const userRole = document.getElementById('userRole');
const monthlyBar = document.getElementById('monthlyBar');
const clientSearch = document.getElementById('clientSearch');

const state = {
  user: null,
  clients: [
    { name: 'Mariana Costa', status: 'Em negociação', due: '15/11', value: 'R$ 1.280' },
    { name: 'Carlos Andrade', status: 'Boleto em atraso', due: '12/11', value: 'R$ 980' },
    { name: 'Fernanda Lopes', status: 'Pendente assinatura', due: '18/11', value: 'R$ 2.100' },
    { name: 'Rafael Nunes', status: 'Contato agendado', due: '20/11', value: 'R$ 1.550' }
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
    { name: 'Carlos Andrade', status: 'Atrasado 3 dias' },
    { name: 'Fernanda Lopes', status: 'Vence amanhã' },
    { name: 'Mariana Costa', status: 'Vence em 2 dias' }
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
  indicators: [
    { name: 'Conversão', value: '18%' },
    { name: 'Novos leads', value: '42' },
    { name: 'Contatos do dia', value: '27' }
  ],
  communications: [
    { name: 'Templates aprovados', value: '6' },
    { name: 'Mensagens enviadas', value: '24' },
    { name: 'Retornos aguardando', value: '5' }
  ]
};

const setLoggedInView = () => {
  loginCard.style.display = 'none';
  dashboard.style.display = 'flex';
};

const setLoggedOutView = () => {
  loginCard.style.display = 'flex';
  dashboard.style.display = 'none';
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
  renderList('billAlerts', state.bills, (item) => `<span>${item.name}</span>${item.status}`);
  renderList('robotList', state.robots, (item) => `<span>${item.name}</span>${item.status}`);
  renderList('campaignList', state.campaigns, (item) => `<span>${item.name}</span>${item.status}`);
  renderList('quickIndicators', state.indicators, (item) => `<span>${item.name}</span>${item.value}`);
  renderList('communicationList', state.communications, (item) => `<span>${item.name}</span>${item.value}`);

  applyClientFilter('');
  renderReminders();
};

const applyClientFilter = (query) => {
  const filtered = state.clients.filter((client) =>
    client.name.toLowerCase().includes(query.toLowerCase())
  );
  renderList('clientList', filtered, (client) =>
    `<span>${client.name}</span>${client.status} • ${client.due} • ${client.value}`
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
});

clientSearch.addEventListener('input', (event) => {
  applyClientFilter(event.target.value);
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

loadSession();
