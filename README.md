# Sistema Comercial para Consórcio (Web + App)

Este repositório contém um **protótipo funcional web** (com API Node/Express) para o sistema comercial solicitado, com login individual e painel completo para a equipe. A estrutura pode ser reutilizada para evoluir o **app mobile** (via React Native/Flutter) e um backend definitivo.

## Como executar (protótipo web)

```bash
npm install
npm start
```

Acesse: `http://localhost:3000`

**Usuário demo**
- E-mail: `ana@consorcio.com`
- Senha: `123456`

## Objetivos do sistema

- Centralizar a **carteira de clientes**, com dados atualizados e histórico de relacionamento.
- Garantir **acesso individual e seguro** por usuário e senha.
- Oferecer **painéis de metas, pontuação e ranking** para acompanhamento diário/mensal.
- Permitir **execução de robôs** criados pelo TI, sem acesso ao código/configuração.
- Organizar **lembretes e tarefas comerciais** com base em horários definidos.

## Funcionalidades principais

### 1) Autenticação e acesso individual
- Login com usuário e senha.
- Perfis e permissões (comercial, supervisor, gestor).
- Registro de atividades por usuário (auditoria).

### 2) Dashboard comercial (visão geral)
- Ranking geral da empresa e ranking por equipe.
- Pontuação individual e evolução diária/mensal.
- Gráficos de meta mensal (atingido x restante).
- Avisos e lembretes do dia.
- Indicadores-chave (ex.: conversão, leads contatados, propostas enviadas).

### 3) Carteira de clientes
- Listagem com filtros por status (em contato, proposta, fechado, inadimplente, etc.).
- Dados de contato e histórico de interações.
- Próxima ação recomendada e SLA de atendimento.
- Segmentação por tipo de consórcio, valor de crédito e campanha.

### 4) Boletos e vencimentos
- Datas de vencimento por cliente.
- Alertas de vencimento próximos.
- Histórico de pagamentos (quando integrado ao financeiro).

### 5) Metas e campanhas
- Meta mensal da empresa e do usuário.
- Quantos pontos faltam por campanha.
- Progresso por produto ou campanha.
- Regras de pontuação configuráveis.

### 6) Ranking e pontuação
- Ranking geral e por período (semanal/mensal).
- Pontuação individual por vendas, reuniões, contatos efetivos.
- Histórico de pontos ganhos e perdidos.

### 7) Lembretes e agenda
- Lembrete para contato em horário definido pelo comercial.
- Agenda de follow-ups com notificações.
- Tarefas e prioridades (por exemplo: “ligar às 16h”).

### 8) Execução de robôs (TI)
- Tela com lista de robôs disponíveis.
- Execução com 1 clique (sem acesso a código).
- Registro de execução e resultado.

### 9) CRM básico integrado
- Pipeline de negociação (etapas configuráveis).
- Scripts de atendimento e objeções.
- Registro de ligações, mensagens e reuniões.

### 10) Comunicação e notificações
- Notificações no app e no web.
- Alertas de metas, vencimentos e clientes sem contato.
- Comunicação com supervisores (mensagens internas).

### 11) Relatórios e análises
- Gráficos de performance individual e por equipe.
- Relatórios de campanhas.
- Exportação em PDF/Excel.

### 12) Administração (gestor)
- Configuração de metas, campanhas e pontuação.
- Gestão de usuários e permissões.
- Auditoria e logs.

## Fluxos principais do usuário comercial

1. **Login** → visualiza dashboard.
2. **Ver carteira** → escolhe cliente → registra contato.
3. **Agenda follow-up** → define lembrete.
4. **Acompanha metas/pontos** → ajusta foco da campanha.
5. **Executa robô** → consulta resultado.

## Próximos passos sugeridos

- Levantamento detalhado de regras de pontuação e metas.
- Integrações necessárias (financeiro, CRM, gateways de boleto, bots/robôs internos).
- Definir tecnologia e arquitetura (mobile + web).
- Criar protótipo de interface para validação com a equipe comercial.
