const loginForm = document.getElementById("login-form");
const loginSection = document.getElementById("login");
const dashboardSection = document.getElementById("dashboard");
const loginError = document.getElementById("login-error");
const logoutButton = document.getElementById("logout");

const userName = document.getElementById("user-name");
const userRole = document.getElementById("user-role");
const metricsContainer = document.getElementById("metrics");
const carteiraList = document.getElementById("carteira");
const boletosList = document.getElementById("boletos");
const campanhasList = document.getElementById("campanhas");
const lembretesList = document.getElementById("lembretes");
const robosList = document.getElementById("robos");
const metaProgress = document.getElementById("meta-progress");
const metaText = document.getElementById("meta-text");
const logoButton = document.getElementById("logo-button");
const rankingValue = document.getElementById("ranking-value");
const pontuacaoValue = document.getElementById("pontuacao-value");
const menu = document.getElementById("menu");
const sections = document.querySelectorAll("[data-section]");

const setLoggedOut = (isLoggedOut) => {
  document.body.classList.toggle("logged-out", isLoggedOut);
};

const setActiveSection = (sectionId) => {
  sections.forEach((section) => {
    section.classList.toggle("hidden", section.dataset.section !== sectionId);
  });
  menu?.querySelectorAll(".menu-item").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.section === sectionId);
  });
};

const storeToken = (token) => localStorage.setItem("token", token);
const getToken = () => localStorage.getItem("token");
const clearToken = () => localStorage.removeItem("token");

const setLoading = (isLoading) => {
  loginForm.querySelector("button").textContent = isLoading ? "Entrando..." : "Entrar";
};

const formatNumber = (value) => new Intl.NumberFormat("pt-BR").format(value);

const renderMetrics = (metrics) => {
  const items = [
    { label: "Ranking geral", value: `#${metrics.rankingGeral}` },
    { label: "Pontuação no mês", value: formatNumber(metrics.pontuacaoMes) },
    { label: "Meta mensal", value: formatNumber(metrics.metaMensal) },
    { label: "Pontos restantes", value: formatNumber(metrics.pontosRestantes) },
    { label: "Leads contatados", value: formatNumber(metrics.leadsContactados) },
    { label: "Propostas enviadas", value: formatNumber(metrics.propostasEnviadas) },
  ];

  metricsContainer.innerHTML = items
    .map(
      (item) => `
      <div class="card">
        <h4>${item.label}</h4>
        <span>${item.value}</span>
      </div>
    `
    )
    .join("");
};

const renderList = (listElement, items, template) => {
  listElement.innerHTML = items.map(template).join("");
};

const renderDashboard = (payload) => {
  userName.textContent = payload.user.name;
  userRole.textContent = `${payload.user.role} • ${payload.user.team}`;

  renderMetrics(payload.metrics);
  if (rankingValue) {
    rankingValue.textContent = `#${payload.metrics.rankingGeral}`;
  }
  if (pontuacaoValue) {
    pontuacaoValue.textContent = formatNumber(payload.metrics.pontuacaoMes);
  }

  renderList(
    carteiraList,
    payload.carteira,
    (item) => `
      <li>
        <strong>${item.nome}</strong>
        <span>${item.status} • ${item.valorCredito}</span>
        <span>Próximo contato: ${item.proximoContato}</span>
      </li>
    `
  );

  renderList(
    boletosList,
    payload.boletos,
    (item) => `
      <li>
        <strong>${item.cliente}</strong>
        <span>Vencimento: ${item.vencimento}</span>
        <span>Status: ${item.status}</span>
      </li>
    `
  );

  renderList(
    campanhasList,
    payload.campanhas,
    (item) => `
      <li>
        <strong>${item.nome}</strong>
        <span>Pontos faltantes: ${item.pontosFaltantes}</span>
      </li>
    `
  );

  renderList(
    lembretesList,
    payload.lembretes,
    (item) => `
      <li>
        <strong>${item.horario}</strong>
        <span>${item.descricao}</span>
      </li>
    `
  );

  renderList(
    robosList,
    payload.robos,
    (item) => `
      <li>
        <strong>${item.nome}</strong>
        <span>Última execução: ${item.ultimaExecucao}</span>
        <button type="button" data-robo="${item.id}">Executar</button>
      </li>
    `
  );

  const progress = payload.metasEquipe.percentual || 0;
  metaProgress.style.width = `${progress}%`;
  metaText.textContent = `Meta: ${formatNumber(payload.metasEquipe.realizado)} / ${formatNumber(
    payload.metasEquipe.metaMensal
  )} (${progress.toFixed(1)}%)`;
};

const fetchDashboard = async () => {
  const token = getToken();
  if (!token) {
    setLoggedOut(true);
    return;
  }

  const response = await fetch("/api/dashboard", {
    headers: {
      token,
    },
  });

  if (!response.ok) {
    clearToken();
    loginSection.hidden = false;
    dashboardSection.hidden = true;
    setLoggedOut(true);
    return;
  }

  const payload = await response.json();
  renderDashboard(payload);
  loginSection.hidden = true;
  dashboardSection.hidden = false;
  setLoggedOut(false);
  setActiveSection("inicio");
};

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginError.hidden = true;
  setLoading(true);

  const formData = new FormData(loginForm);
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  setLoading(false);

  if (!response.ok) {
    loginError.textContent = "E-mail ou senha inválidos.";
    loginError.hidden = false;
    return;
  }

  const payload = await response.json();
  storeToken(payload.token);
  await fetchDashboard();
});

logoutButton.addEventListener("click", () => {
  clearToken();
  dashboardSection.hidden = true;
  loginSection.hidden = false;
  setLoggedOut(true);
});

logoButton.addEventListener("click", () => {
  const dashboardVisible = !dashboardSection.hidden;
  if (dashboardVisible) {
    setActiveSection("inicio");
    document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth" });
  } else {
    document.getElementById("login")?.scrollIntoView({ behavior: "smooth" });
  }
});

menu?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) return;
  const sectionId = target.dataset.section;
  if (!sectionId) return;
  setActiveSection(sectionId);
});

robosList.addEventListener("click", async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) return;

  const id = target.dataset.robo;
  if (!id) return;

  target.disabled = true;
  target.textContent = "Executando...";

  await fetch(`/api/robos/${id}/executar`, { method: "POST" });

  target.textContent = "Executado";
  setTimeout(() => {
    target.disabled = false;
    target.textContent = "Executar";
  }, 1500);
});

setLoggedOut(true);
fetchDashboard();
