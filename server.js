const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const users = [
  {
    id: 1,
    name: "Ana Souza",
    email: "ana@consorcio.com",
    password: "123456",
    role: "Comercial",
    team: "Equipe Sul",
  },
  {
    id: 2,
    name: "Rafael Lima",
    email: "rafael@consorcio.com",
    password: "123456",
    role: "Gestor",
    team: "Gestão",
  },
];

const dashboardPayload = (user) => ({
  user: {
    id: user.id,
    name: user.name,
    role: user.role,
    team: user.team,
  },
  metrics: {
    rankingGeral: 5,
    pontuacaoMes: 1320,
    metaMensal: 2000,
    pontosRestantes: 680,
    leadsContactados: 42,
    propostasEnviadas: 18,
  },
  carteira: [
    {
      id: "CL-1023",
      nome: "Carlos Mendes",
      status: "Em contato",
      proximoContato: "Hoje 16:00",
      valorCredito: "R$ 120.000",
    },
    {
      id: "CL-1044",
      nome: "Juliana Prado",
      status: "Proposta enviada",
      proximoContato: "Amanhã 10:30",
      valorCredito: "R$ 80.000",
    },
    {
      id: "CL-1098",
      nome: "Marcos Ribeiro",
      status: "Aguardando documentos",
      proximoContato: "Sexta 14:00",
      valorCredito: "R$ 200.000",
    },
  ],
  boletos: [
    {
      id: "BL-7781",
      cliente: "Carlos Mendes",
      vencimento: "2024-02-05",
      status: "Em aberto",
    },
    {
      id: "BL-7782",
      cliente: "Juliana Prado",
      vencimento: "2024-02-08",
      status: "Em aberto",
    },
  ],
  campanhas: [
    {
      id: "CMP-01",
      nome: "Campanha Férias 2024",
      pontosFaltantes: 140,
    },
    {
      id: "CMP-02",
      nome: "Campanha Imóveis",
      pontosFaltantes: 220,
    },
  ],
  lembretes: [
    {
      id: "LMB-01",
      horario: "16:00",
      descricao: "Ligar para Carlos Mendes",
    },
    {
      id: "LMB-02",
      horario: "18:00",
      descricao: "Enviar proposta revisada para Juliana Prado",
    },
  ],
  robos: [
    {
      id: "RB-01",
      nome: "Consulta de parcelas",
      ultimaExecucao: "Hoje 09:12",
    },
    {
      id: "RB-02",
      nome: "Disparo de lembretes",
      ultimaExecucao: "Ontem 18:40",
    },
  ],
  metasEquipe: {
    metaMensal: 15000,
    realizado: 9870,
    percentual: 65.8,
  },
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body || {};
  const user = users.find((item) => item.email === email && item.password === password);

  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }

  return res.json({
    token: `demo-token-${user.id}`,
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
      team: user.team,
      email: user.email,
    },
  });
});

app.get("/api/dashboard", (req, res) => {
  const { token } = req.headers;
  const userId = token?.split("demo-token-")[1];
  const user = users.find((item) => String(item.id) === String(userId));

  if (!user) {
    return res.status(401).json({ message: "Token inválido." });
  }

  return res.json(dashboardPayload(user));
});

app.post("/api/robos/:id/executar", (req, res) => {
  const { id } = req.params;
  return res.json({
    id,
    status: "Executado",
    executadoEm: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
