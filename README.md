# Sistema Comercial para Consórcio (App + Web)

Este documento descreve uma proposta de sistema completo para equipe comercial de uma empresa de consórcio, contemplando **aplicativo mobile** e **portal web** com login individualizado.

## Objetivos do sistema
- Centralizar a **carteira de clientes** e o acompanhamento comercial.
- Acompanhar **boletos e vencimentos** com alertas.
- Garantir **visão de metas, ranking e pontuação** individual e geral.
- Disponibilizar **execução de robôs** criados pelo TI, com permissões controladas.
- Entregar **painéis de análise** e relatórios de performance.

## Perfis e permissões
- **Comercial**: acesso à própria carteira, metas, pontos, campanhas, robôs autorizados e tarefas.
- **Gestor**: visão geral, ranking, metas, relatórios, auditoria e configuração de campanhas.
- **TI/Administrador**: criação de robôs, integrações e parametrização global.

## Módulos e funcionalidades

### 1) Login e segurança
- Login com **usuário e senha** individuais.
- MFA (opcional) e políticas de senha.
- Controle de sessões e registro de acessos.

### 2) Carteira de clientes
- Lista da carteira com filtros (status, etapa, prioridade, próxima ação).
- Ficha completa do cliente:
  - Dados pessoais e contato.
  - Histórico de interações.
  - Contratos, propostas e situação do consórcio.
- Tags e segmentações (ex.: quente, morno, frio; segmento; origem).

### 3) Vencimentos de boletos
- Calendário de vencimentos por cliente.
- Alertas automáticos antes e após vencimento.
- Status do boleto (pago, pendente, atrasado) com histórico.

### 4) Metas e campanhas
- Meta mensal da empresa e metas individuais.
- **Pontos necessários** para campanhas e quanto falta para atingir.
- Regras de pontuação configuráveis por campanha.

### 5) Ranking e pontuação
- Ranking geral (empresa) e individual.
- Pontuação detalhada por tipo de ação (ex.: venda, contato, reativação).
- Histórico mensal e comparativos.

### 6) Gráficos e indicadores
- Painel de performance individual e geral.
- Gráficos de meta x realizado.
- Funil de vendas e taxa de conversão.

### 7) Robôs (TI)
- Lista de robôs liberados para o usuário.
- **Execução com um clique** e logs de execução.
- Controle de acesso por perfil.

### 8) Agenda e lembretes
- Agendamento de **lembretes** por cliente (ex.: ligar às 15h).
- Notificações push (app) e email/desktop (web).
- Tarefas recorrentes.

### 9) Comunicação integrada
- Registro de ligações, e-mails e mensagens.
- Templates de mensagens para follow-up.
- Histórico centralizado por cliente.

### 10) Relatórios e auditoria
- Relatórios exportáveis (PDF/CSV).
- Auditoria de ações (quem fez, quando e o quê).
- KPIs de produtividade.

### 11) Integrações essenciais
- Integração com ERP/CRM (se houver).
- Integração com gateways de boleto.
- Webhooks para serviços externos.

## Requisitos de usabilidade
- Interface simples para uso rápido em campo.
- Design responsivo para PC e mobile.
- Busca rápida por cliente/contrato.

## Requisitos técnicos (sugestão)
- **Backend**: API REST/GraphQL.
- **Web**: dashboard responsivo.
- **Mobile**: app Android/iOS.
- **Banco**: relacional + logs de auditoria.
- **Autenticação**: JWT/OAuth.

## Próximos passos
1. Definir prioridades de MVP.
2. Mapear integrações atuais (robôs, ERP, boletos).
3. Criar protótipo de UX/UI (web e app).
4. Validar requisitos com equipe comercial.

## Como executar
1. Certifique-se de ter Node.js instalado.
2. Execute:
   ```bash
   npm install
   npm start
   ```
3. Acesse `http://localhost:3000` no navegador.

## O que já está pronto neste protótipo
- Login básico (simulado) com perfil individual.
- Painel com metas, ranking, pontos e campanhas.
- Carteira de clientes com filtro rápido.
- Alertas de boletos e robôs disponíveis.
- Agenda com criação de lembretes.
- Menu lateral com logo Hubbie e seções separadas por funcionalidade.

## Como inserir imagens reais sem arquivos binários no Git
Se você estiver recebendo a mensagem “Arquivos binários não são compatíveis”, use **apenas** a opção de base64:
1. Converta sua foto para base64 (PNG/JPG).
2. Abra `public/images.js` e cole o conteúdo no formato abaixo:
   ```js
   window.HUBBIE_IMAGES = {
     puntaCana: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...',
     gramado: 'data:image/jpeg;base64,...',
     lisboa: 'data:image/jpeg;base64,...'
   };
   ```
3. Recarregue o navegador — as campanhas usarão essas imagens.
> Observação: não existem mais arquivos `.png` no projeto. Se você não colar o base64, o card mostra um aviso de placeholder pedindo a imagem real.

### Atualização rápida para Punta Cana (sem erros de binário)
No menu **Metas e campanhas → Campanhas individuais**, use o cartão “Imagem da campanha: Punta Cana” para:
- **Selecionar um arquivo** e gerar o base64 automaticamente, ou
- **Colar o base64** direto no campo e clicar em **Salvar imagem**.
Isso salva localmente no navegador, sem adicionar arquivos binários ao Git.

## Como manter o ranking atualizado com Google Sheets
Para o ranking acompanhar as alterações da sua planilha automaticamente, faça:
1. **Publique a planilha**: no Google Sheets vá em **Arquivo → Publicar na web** e publique a aba **Analise Vendas Fevereiro**.
2. **Garanta acesso público**: a publicação precisa estar visível para “qualquer pessoa com o link”.
3. O sistema busca o CSV pela aba publicada e atualiza o ranking automaticamente.

> O front-end faz nova leitura a cada 5 minutos. Se você atualizar a planilha, o ranking será atualizado sem precisar reiniciar o servidor (apenas manter o navegador aberto). Se a planilha estiver privada ou não publicada, o sistema vai usar o fallback local.
