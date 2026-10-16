# Landing Page: Fraude via Pix — Atendimento Jurídico (Dr. Ronney Menezes)

Aplicação web responsiva e acessível desenvolvida em **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Zod** e **React Hook Form** com base no PRD de análise de viabilidade de fraudes bancárias via Pix.

Integrada com a identidade visual oficial do **Dr. Ronney Menezes** e rastreamento via **Google Tag Manager** (`GTM-M43QGSC9`).

---

## 🎨 Sistema Visual e Identidade

A interface segue rigorosamente a paleta de três cores estabelecida:

| Token | Hex | Uso |
| --- | --- | --- |
| `brand-yellow` | `#FABD04` | Botões de ação principais (com texto navy), numeração e destaques editoriais curtos |
| `brand-navy` | `#000044` | Fundo principal da página e texto sobre amarelo e branco |
| `brand-white` | `#FEFEFE` | Texto sobre o azul, painéis de leitura e seções com fundo claro |

- **Tipografia**:
  - Títulos: **Barlow Condensed** (pesos 600 e 700), com escala fluida (`clamp(2.25rem, 5vw + 1rem, 4.25rem)`).
  - Textos corridos e interface: **Inter** (pesos 400, 500 e 600), com entrelinha 1.6 e largura de leitura delimitada a ~65 caracteres.
- **Acessibilidade**:
  - Contraste superior a 4.5:1 / 3:1 em todas as combinações de cor.
  - Alvos de clique de no mínimo 44 × 44 px.
  - Links com estados de foco `focus-visible` evidentes e link para "Pular para o conteúdo principal".
  - Respeito a `prefers-reduced-motion` no Framer Motion e no CSS.
  - Sem texto branco sobre amarelo.

---

## 🧱 Arquitetura e Estrutura de Código

```text
src/
├── app/
│   ├── api/
│   │   └── leads/
│   │       └── route.ts          # Endpoint POST /api/leads com idempotência e rate limit
│   ├── privacidade/
│   │   └── page.tsx              # Rascunho da Política de Privacidade (LGPD)
│   ├── termos/
│   │   └── page.tsx              # Rascunho dos Termos de Uso
│   ├── globals.css               # Tokens Tailwind v4 e utilitários de tipografia fluida
│   ├── layout.tsx                # Fontes Barlow Condensed/Inter, metadados e layout global
│   └── page.tsx                  # Composição sequencial das seções da landing page
├── components/
│   ├── forms/
│   │   └── LeadForm.tsx          # Formulário com React Hook Form, Zod e feedback acessível
│   ├── layout/
│   │   ├── FloatingMobileCTA.tsx # CTA flutuante móvel inteligente (some ao ver o form)
│   │   ├── Footer.tsx            # Rodapé sóbrio institucional
│   │   └── Header.tsx            # Cabeçalho compacto com assinatura "Ronney Menezes"
│   ├── media/
│   │   └── VideoPlayer.tsx       # Player VSL acessível (oculta sem quebra se ausente)
│   ├── motion/
│   │   └── Reveal.tsx            # Animações de entrada discretas com garantia de visibilidade
│   ├── sections/
│   │   ├── AnalysisProcess.tsx   # 4.3: Como funciona a análise (etapas 01 a 06)
│   │   ├── AnalysisSection.tsx   # 4.7: Seção âncora (#analise) e formulário
│   │   ├── AudienceCriteria.tsx  # 4.4: Perfil de atendimento (colunas A e B)
│   │   ├── Hero.tsx              # 4.2: Hero com H1 fluido e CTA prioritário
│   │   ├── LegalFoundations.tsx  # 4.5: Fundamentos jurídicos (Súmula 479, BC, MED)
│   │   └── ProfessionalIdentity.tsx # 4.6: Identificação Ronney Menezes
│   └── ui/
│       ├── Container.tsx         # Container de até 1200px com margens responsivas
│       └── PrimaryLink.tsx       # Botão de ação padrão com telemetria
├── content/
│   └── landing.ts                # Módulo centralizado e tipado com toda a redação do PRD
└── lib/
    ├── analytics.ts              # Disparador de telemetria sem vazamento de dados pessoais (PII)
    ├── lead-delivery.ts          # Persistência de leads, mock de dev e verificação de webhook
    └── lead-schema.ts            # Esquema Zod de validação compartilhado
public/
└── screenshots/                  # Capturas de tela auditadas em Desktop e Mobile
scripts/
└── capture-screenshots.ts        # Script de automação para testes visuais e capturas
tests/
└── leads-integration.test.ts     # Suíte de testes de integração da API e regras de negócio
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ (recomendado Node.js 20+)
- npm

### Instalação
```bash
npm install
```

### Modo de Desenvolvimento
```bash
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000).

### Execução de Testes de Integração
```bash
npm test
```
Executa a suíte de testes cobrindo:
1. Validação de dados válidos do lead.
2. Inclusão de casos com prejuízo abaixo de R$ 10 mil (não rejeição automática).
3. Rejeição de formulários incompletos ou formatos inválidos.
4. Bloqueio automático de bots por honeypot (`website_trap`).
5. Mock de desenvolvimento retornando 201 com chave de idempotência.
6. Falha segura em produção (retorno 503) caso o CRM não esteja configurado.
7. Limitador de taxa de requisições por IP (Rate Limiting).

### Build e Validação de Tipos
```bash
npm run lint
npm run build
```

---

## 🔒 Privacidade e Segurança (LGPD)

- **Sem vazamento de PII**: A biblioteca de analytics (`src/lib/analytics.ts`) nunca envia nome, telefone, empresa ou respostas do questionário jurídico para ferramentas de terceiros.
- **Logs mascarados**: Os logs do servidor não expõem números de telefone completos ou e-mails (`src/lib/lead-delivery.ts`).
- **Idempotência**: O cabeçalho `x-idempotency-key` e a chave de sessão impedem cadastros duplicados acidentais.
- **Proteção contra abuso**: Honeypot oculto contra robôs e limitação de taxa por IP.

---

## 📋 Pendências Objetivas para Publicação (Checklist de Produção)

Conforme a Seção 12 do PRD, os seguintes itens devem ser configurados pelo responsável antes do lançamento em produção:

1. **Logo Oficial**: Atualmente exibindo a assinatura tipográfica sóbria `"Ronney Menezes"`. Substituir pelo arquivo vetorial quando disponibilizado.
2. **Inscrição OAB/UF**: Inserir o número verificado da OAB/UF de Ronney Menezes no rodapé e identificação profissional.
3. **Foto Profissional**: Atualmente omitida para evitar banco de imagens genérico. Adicionar foto em estúdio quando fornecida.
4. **Vídeo Final (VSL)**: Inserir a URL do vídeo final e poster nas variáveis `NEXT_PUBLIC_VSL_URL` e `NEXT_PUBLIC_VSL_POSTER`. Na ausência, a página expande automaticamente o texto do Hero sem botões inoperantes.
5. **Webhook/CRM de Produção**: Configurar a variável `LEAD_WEBHOOK_URL` no ambiente de hospedagem (Vercel, Railway, etc.). Em produção, requisições retornarão 503 se essa variável não estiver preenchida, prevenindo falsas mensagens de sucesso.
6. **Domínio e Metatags**: Atualizar `NEXT_PUBLIC_SITE_URL` com o domínio oficial.
7. **Homologação Jurídica de Privacidade e Termos**: Revisar os rascunhos em `/privacidade` e `/termos` com a equipe jurídica antes da publicação formal.
