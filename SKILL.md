---
name: landing-pro
description: Cria landing pages e sites institucionais com design profissional, autoral e sem cara de IA. Use sempre que o pedido envolver criar, redesenhar ou expandir uma landing page, site, página de vendas, portfólio ou páginas internas (sobre, serviços, contato). Cobre direção de arte, design system, grid, navbar, botões, links, cards, carrosséis, scroll, animações e consistência entre páginas.
---

# Landing Pro

Você atua como um designer UI/UX sênior e desenvolvedor front-end. O objetivo é entregar sites que pareçam feitos por um estúdio de design, com identidade própria, e não por um gerador automático.

A régua de qualidade vem de uma curadoria de landing pages premiadas e de alto nível (estilo Dribbble, Awwwards e Behance). Os padrões extraídos estão na seção "Arquétipos" e "Padrões que separam o profissional do genérico".

## Regra de ouro

Antes de escrever qualquer código, defina a **direção de arte**. Código sem direção de arte vira template. Nenhum componente nasce isolado: todos derivam dos mesmos tokens, do mesmo grid e da mesma linguagem de movimento.

---

## 1. Processo obrigatório (siga nesta ordem)

1. **Briefing.** Extraia do pedido: negócio, público, objetivo da página (lead, venda, agendamento, autoridade), tom de voz, ativos disponíveis (logo, fotos, cores). Se faltar algo essencial, pergunte uma vez, de forma objetiva. Se não houver resposta, assuma e declare as suposições.
2. **Direção de arte.** Escolha 1 arquétipo da seção 3 e escreva, em 5 linhas, um "art direction brief": arquétipo, paleta (com papéis), par tipográfico, tratamento de imagem, assinatura visual (o detalhe que torna a página memorável).
3. **Design tokens.** Crie o arquivo de tokens (seção 4) antes de qualquer componente.
4. **Grid e layout.** Defina container, colunas e ritmo vertical (seção 5).
5. **Componentes.** Construa os componentes base com todos os estados (seção 6).
6. **Seções.** Monte a página com as seções da seção 7, variando composições.
7. **Movimento.** Aplique o sistema de animação (seção 8) por último, nunca antes do layout estar sólido.
8. **QA visual.** Abra no navegador do Antigravity, tire screenshots em 1440, 1024, 768 e 390 px, compare com o checklist da seção 12 e corrija antes de entregar.

---

## 2. Anti cara de IA: proibido

Se qualquer item abaixo aparecer, refaça.

- Gradiente roxo para azul ou rosa para roxo como fundo principal sem motivo de marca.
- Glassmorphism aplicado em tudo. Blur só em navbar ou em um elemento de destaque.
- Blobs, orbs desfocados e "aurora" genérica atrás do hero.
- Fonte Inter, Roboto ou Arial como única fonte do site. Sempre um par com personalidade.
- Emoji como ícone. Use um único set de ícones (Lucide, Phosphor ou Tabler) com stroke consistente.
- Grade de 3 cards idênticos com ícone dentro de círculo colorido, título e 2 linhas de texto, repetida várias vezes na página.
- Todas as seções centralizadas. Alterne alinhamentos e composições.
- Sombras grandes e difusas em todos os cards. Prefira borda de 1px, contraste de superfície ou sombra muito sutil.
- Headlines vazias: "Desbloqueie o poder de...", "Eleve seu negócio ao próximo nível", "Revolucione...", "Seamless", "Cutting-edge".
- Lorem ipsum, números inventados sem marcação de placeholder, logos falsos de clientes reais.
- Mistura de estilos de ilustração, ícones 3D genéricos e fotos de banco sorridentes sem tratamento.
- Animação em tudo, ao mesmo tempo, toda vez que rola. Movimento tem hierarquia.
- Botões de tamanhos, raios e alturas diferentes na mesma página.
- Espaçamentos "no olho" (13px, 27px, 45px). Tudo vem da escala.

---

## 3. Arquétipos de direção de arte

Escolha um. Não misture mais de dois.

### A. Editorial escuro com acento único
Fundo quase preto (#0B0B0C a #141414), um único acento saturado (laranja queimado, vermelho, verde esmeralda), foto em alto contraste com recorte ou luz dramática. Headline grande, peso forte, 2 a 3 linhas. Mini stats logo abaixo do hero. Ideal para: agências, estúdios, criativos, consultorias premium.

### B. Corporativo claro com bento grid
Fundo off-white (#F6F5F2) ou branco quente, texto grafite, acento de marca (verde lima, azul petróleo, dourado). Cards em bento assimétrico, fotos reais de pessoas trabalhando, números grandes em destaque. Ideal para: escritórios de advocacia, finanças, consultoria, B2B.

### C. Imersivo fotográfico
Hero com imagem ou cena em tela cheia, texto curto sobreposto, muito respiro. Seções seguintes mais calmas, com a mesma paleta extraída da imagem. Ideal para: produtos, lifestyle, esportes, turismo, marcas de experiência.

### D. Produto dark com neon controlado
Fundo escuro, interface do produto como protagonista (mockups de dashboard reais, não decorativos), um neon (verde, lima ou ciano) usado só em CTAs, gráficos e detalhes. Ideal para: SaaS, apps, ferramentas, infoprodutos tech.

### E. Bold tipográfico com cor de marca
Cor de marca saturada como moldura ou bloco (amarelo, lima, laranja), tipografia display grande, foto recortada, contraste alto entre blocos coloridos e brancos. Ideal para: marketing, eventos, lançamentos, marcas jovens.

### Assinatura visual (escolha pelo menos uma)
- Palavra-chave do título em itálico serifado ou na cor de acento ("Designed to help you do more *with less stress*").
- Página tratada como "cartão": conteúdo dentro de um container arredondado com margem do viewport.
- Foto com recorte orgânico, máscara arredondada ou sobreposição em elementos de UI.
- Faixa de marquee com logos, palavras-chave ou valores.
- Número gigante como elemento gráfico.
- Textura sutil (grão, linhas de grid, ruído) aplicada com moderação.

---

## 4. Design tokens

Sempre centralize em variáveis CSS (e espelhe no Tailwind se o projeto usar). Exemplo base, adapte ao arquétipo:

```css
:root {
  /* Cores por papel, nunca por nome */
  --bg: #F6F5F2;
  --surface: #FFFFFF;
  --surface-2: #ECEAE4;
  --ink: #141414;
  --ink-muted: #5C5C5C;
  --line: rgba(20, 20, 20, 0.10);
  --accent: #C6F24E;
  --accent-ink: #141414;   /* texto sobre o acento */
  --inverse-bg: #111111;
  --inverse-ink: #F6F5F2;

  /* Tipografia */
  --font-display: "Bricolage Grotesque", system-ui, sans-serif;
  --font-body: "Inter Tight", system-ui, sans-serif;
  --font-accent: "Instrument Serif", Georgia, serif;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.375rem;
  --text-2xl: clamp(1.75rem, 1.2rem + 1.6vw, 2.5rem);
  --text-3xl: clamp(2.25rem, 1.4rem + 2.8vw, 3.75rem);
  --text-hero: clamp(2.75rem, 1.5rem + 5vw, 6rem);

  --leading-tight: 1.02;
  --leading-snug: 1.2;
  --leading-body: 1.6;
  --tracking-display: -0.03em;

  /* Espaçamento (base 4/8) */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px;
  --space-9: 96px; --space-10: 128px;
  --section-y: clamp(72px, 6vw + 40px, 160px);

  /* Raios */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-pill: 999px;

  /* Sombras discretas */
  --shadow-sm: 0 1px 2px rgba(0,0,0,.06);
  --shadow-md: 0 8px 24px -12px rgba(0,0,0,.18);

  /* Movimento */
  --ease-out: cubic-bezier(.22, 1, .36, 1);
  --ease-in-out: cubic-bezier(.65, 0, .35, 1);
  --dur-fast: 160ms;
  --dur-base: 280ms;
  --dur-slow: 600ms;

  /* Camadas */
  --z-nav: 50; --z-overlay: 80; --z-modal: 100;
}
```

### Pares tipográficos aprovados (Google Fonts ou Fontshare)
- Bricolage Grotesque + Inter Tight (moderno, versátil)
- Instrument Serif (acento) + Instrument Sans (editorial elegante)
- Fraunces + Manrope (premium, jurídico, finanças)
- Syne + DM Sans (criativo, agência)
- Space Grotesk + IBM Plex Sans (tech, SaaS)
- Clash Display ou Satoshi (Fontshare) + General Sans (startup, produto)

Regras: no máximo 2 famílias mais 1 de acento. Títulos display com tracking negativo. Corpo entre 16 e 18px, linha de 60 a 75 caracteres.

### Paleta
- 60/30/10: fundo, superfície e texto ocupam quase tudo. O acento aparece em no máximo 10% da tela.
- Contraste AA mínimo (4.5:1 texto, 3:1 elementos grandes).
- Sempre defina `--accent-ink` para garantir legibilidade sobre o acento.

---

## 5. Grid, alinhamento e ritmo

- Container: `max-width: 1280px` (ou 1320px), padding lateral `clamp(16px, 4vw, 40px)`.
- Grid de 12 colunas no desktop, 8 no tablet, 4 no mobile. Gutter de 24px (desktop) e 16px (mobile).
- **Navbar, hero, seções e footer usam exatamente o mesmo container.** A borda esquerda do logo alinha com a borda esquerda do título do hero e com a primeira coluna do footer.
- Espaço vertical entre seções: `--section-y`. Dentro da seção, título para conteúdo: `--space-7`. Entre cards: 16 a 24px.
- Composições recomendadas por seção: 7/5, 5/7, 4/8, 6/6, bento 2x2 com um card ocupando 2 linhas. Evite 4/4/4 em sequência.
- Cards da mesma linha têm a mesma altura (`align-items: stretch`) e o CTA de cada card fica ancorado na base (`margin-top: auto`).
- Todo texto alinhado à esquerda por padrão. Centralize apenas: CTA final, títulos curtos de seção isolados, depoimento único em destaque.

---

## 6. Componentes (sempre com todos os estados)

Estados obrigatórios para tudo que é interativo: default, hover, focus-visible, active, disabled. Quando aplicável: loading, selecionado, erro.

### Navbar
- Altura 64 a 80px, sticky. No topo, fundo transparente sobre o hero. Ao rolar mais de 24px: fundo `--bg` com 85% de opacidade, `backdrop-filter: blur(12px)`, borda inferior `--line` e altura reduzida em 8px, transição de `--dur-base`.
- Opcional: esconder ao rolar para baixo e reaparecer ao rolar para cima.
- Estrutura: logo à esquerda, 4 a 6 links no centro ou à direita, 1 CTA em pill à direita. Nunca mais de um botão primário na navbar.
- Link ativo indicado por sublinhado, ponto ou cor (o mesmo padrão em todas as páginas).
- Mobile (abaixo de 1024px): botão de menu com ícone animado (hambúrguer para X), drawer em tela cheia ou lateral, links grandes (24 a 32px), foco preso dentro do menu, fecha com Esc, `body` sem scroll quando aberto.
- Inclua "Pular para o conteúdo" (skip link) visível no foco.

### Botões
- Variantes: `primary` (fundo acento ou ink), `secondary` (contorno 1px), `ghost` (sem fundo), `link` (texto com sublinhado animado).
- Tamanhos: sm 36px, md 44px, lg 52px de altura. Área de toque mínima 44px no mobile.
- Formato: pill (`--radius-pill`) ou `--radius-md`. Escolha um para o site inteiro.
- Padrão profissional observado: texto + ícone de seta dentro de um círculo à direita. No hover, a seta desloca 3 a 4px ou gira 45 graus, e o círculo inverte as cores.
- Hover: mudança de cor ou leve escurecimento, sem "pulos" de escala maiores que 1.02. Active: `scale(.98)`.
- Focus-visible: anel de 2px na cor de acento com offset de 2px. Nunca remova o outline sem substituto.
- Loading: spinner substitui o ícone, largura do botão não muda.

### Links
- Links de texto: sublinhado que cresce da esquerda para a direita no hover (`background-size` ou pseudo-elemento com `scaleX`).
- Links externos com ícone de seta diagonal. Links "Saiba mais" com seta que desloca no hover.
- Cor de link consistente em todo o site.

### Cards
Defina um card base (raio, padding, borda, superfície) e derive as variações:
- **Serviço/feature:** número ou ícone pequeno, título, descrição curta, link no rodapé. Varie tamanhos em bento em vez de grade uniforme.
- **Imagem/case:** imagem com proporção fixa (4:5, 3:4 ou 16:10), título e categoria abaixo ou sobrepostos com gradiente sutil. Hover: zoom da imagem de 1.04 dentro do container com `overflow: hidden`.
- **Stat:** número grande (fonte display), rótulo curto, opcional microcopy. Use contadores animados.
- **Depoimento:** citação curta (até 3 linhas), foto real, nome, cargo. Aspas tipográficas como elemento gráfico.
- **Pricing:** plano em destaque com fundo invertido ou borda de acento, lista de itens com check, preço com tipografia display, CTA na base.
- **Equipe:** foto em P&B ou com o mesmo tratamento de cor, nome, função, link social no hover.
Hover de card: elevação de 2 a 4px e/ou borda mudando para `--ink`. O mesmo comportamento em todos os cards do site.

### Carrossel
- Base: CSS `scroll-snap` nativo (`scroll-snap-type: x mandatory`) com overflow horizontal, funcionando sem JavaScript.
- Controles: botões anterior/próximo com o mesmo estilo dos botões do site, indicador de progresso (barra ou contador "01 / 06"), arrasto com mouse no desktop.
- Mostre parte do próximo card (peek de 10 a 15%) para sinalizar que há mais conteúdo.
- Acessibilidade: `aria-roledescription="carousel"`, slides com `aria-label="2 de 6"`, navegação por teclado, botões desabilitados nas extremidades.
- Autoplay só se houver botão de pausa e respeitar `prefers-reduced-motion`.
- Para logos ou palavras: marquee infinito em CSS (`@keyframes` com conteúdo duplicado), pausando no hover.
- Biblioteca opcional quando precisar de mais controle: Embla Carousel.

### Accordion (FAQ)
- Use `<details>/<summary>` ou botões com `aria-expanded`. Ícone de + que gira para x. Altura animada com `grid-template-rows: 0fr para 1fr`.

### Formulários
- Labels sempre visíveis, campos de 48px de altura, estados de foco, erro com mensagem abaixo do campo, sucesso claro. Botão de envio com estado de loading.

### Tags e eyebrows
- Antes do título de seção, um rótulo pequeno: "• Sobre nós", "(02) Serviços", "Nossa abordagem". Mesmo estilo em todas as seções: caixa alta ou pill, `--text-xs`, tracking positivo.

### Footer
- Grande e organizado: CTA final ou frase de marca, colunas de links, contato, redes, linha inferior com copyright e links legais. Opcional: wordmark gigante da marca ocupando a largura do container.

---

## 7. Anatomia da landing page

Ordem base (adapte ao objetivo, não use todas por obrigação):

1. **Hero.** Headline específica (benefício + público), subtítulo de 1 a 2 linhas, 1 CTA primário + 1 secundário, prova rápida (avaliação, número de clientes, logos) e imagem forte. Layouts: texto 7/5 imagem, imagem de fundo com texto em bloco, foto recortada sobre cor.
2. **Prova social.** Faixa de logos ou marquee, ou 3 a 4 mini stats.
3. **Problema ou contexto.** Texto grande em 2 colunas (título à esquerda, parágrafo à direita).
4. **Solução / serviços.** Bento grid ou lista com hover que revela imagem.
5. **Como funciona.** 3 a 4 passos numerados, horizontal no desktop, linha do tempo vertical no mobile. Opcional: seção sticky com passos que trocam ao rolar.
6. **Resultados.** Números grandes com contador, com fonte ou contexto de cada número.
7. **Cases / portfólio.** Cards de imagem em grid ou carrossel.
8. **Depoimentos.** Carrossel ou um depoimento grande em destaque.
9. **Sobre / autoridade.** Foto do responsável, história curta, credenciais.
10. **Preços / ofertas.** Quando aplicável.
11. **FAQ.** Accordion com 5 a 8 perguntas reais.
12. **CTA final.** Bloco com fundo invertido ou de acento, headline curta, um botão.
13. **Footer.**

Ritmo: alterne fundo claro, superfície e bloco invertido para criar capítulos. Nunca duas seções seguidas com a mesma composição.

---

## 8. Scroll e animações

Stack recomendada: **Motion** (motion.dev, antigo Framer Motion) para React, ou **GSAP + ScrollTrigger** para efeitos de scroll mais complexos. **Lenis** opcional para smooth scroll (com intensidade baixa, `lerp: 0.1`).

Sistema de movimento:
- **Entrada de seção (reveal):** `opacity 0 para 1` + `translateY 24px para 0`, `--dur-slow`, `--ease-out`, dispara uma única vez quando 15 a 20% do elemento entra na tela.
- **Stagger:** 60 a 90ms entre itens de uma lista ou grid. Máximo de 6 itens em cascata.
- **Hero:** pode ter a única animação "de assinatura": headline revelada por linha (máscara de baixo para cima), imagem com leve scale de 1.06 para 1.
- **Parallax:** só em imagens, deslocamento máximo de 8 a 12%.
- **Contadores:** números animam de 0 ao valor quando entram na tela, uma vez.
- **Seções sticky:** use para "como funciona" ou showcase de produto, nunca para mais de uma seção por página.
- **Microinterações:** hover de botões, links e cards entre 160 e 280ms.
- **Transição entre páginas (opcional):** fade de 200 a 300ms ou View Transitions API.

Regras técnicas:
- Anime apenas `transform` e `opacity`. Nunca `width`, `height`, `top` ou `left`.
- Respeite `@media (prefers-reduced-motion: reduce)`: desligue parallax, marquee, smooth scroll e reduza reveals para fade simples.
- Conteúdo nunca pode depender da animação para aparecer (se o JS falhar, tudo continua visível).
- Sem animação no scroll de elementos acima da dobra no carregamento, exceto a assinatura do hero.

---

## 9. Páginas internas e consistência entre páginas

Quando o site tiver várias páginas (Home, Sobre, Serviços, Serviço detalhe, Cases, Case detalhe, Blog, Contato, Obrigado, 404, Política de privacidade):

- Um único `Layout` com navbar e footer compartilhados. Nenhuma página recria esses componentes.
- **Page hero padrão** para páginas internas: eyebrow + título grande + subtítulo + (opcional) imagem ou breadcrumb. Altura menor que o hero da home.
- Mesma largura de container, mesma escala tipográfica, mesmos estilos de card, botão e link em todas as páginas.
- Toda página interna termina com o mesmo bloco de CTA final antes do footer.
- Link ativo da navbar reflete a página atual.
- Página de obrigado e 404 também seguem a direção de arte, com caminho de volta claro.
- Defina metadados por página: `title`, `description`, Open Graph e favicon.

---

## 10. Stack e estrutura de código

Respeite a stack existente do projeto. Se não houver, use por padrão:
- **Vite + React + TypeScript + Tailwind CSS**, ou **Next.js (App Router)** quando houver várias páginas, blog ou SEO forte.
- Ícones: `lucide-react`. Animação: `motion`. Scroll: `lenis` (opcional). Carrossel: `embla-carousel-react` (opcional).
- Para páginas simples sem framework: HTML semântico + CSS com variáveis + JS vanilla.

Estrutura sugerida:
```
src/
  styles/tokens.css        tokens da seção 4
  components/ui/           Button, Link, Card, Badge, Container, Section, Eyebrow
  components/layout/       Navbar, MobileMenu, Footer, Layout, PageHero
  components/sections/     Hero, LogoMarquee, Services, Process, Stats, Cases,
                           Testimonials, Pricing, FAQ, FinalCTA
  components/motion/       Reveal, Stagger, Counter, Marquee
  content/                 textos e dados das seções (separados do JSX)
  pages/ ou app/           páginas
```
- Componentes `Container` e `Section` garantem alinhamento e espaçamento iguais em todo o site.
- Textos e dados ficam em `content/`, nunca espalhados no markup, para facilitar edição.

---

## 11. Conteúdo e imagens

- Copy em português do Brasil, direta, específica para o público. Nada de clichês da seção 2. Sem travessões no texto final.
- Headline responde "o que eu ganho e para quem é". CTAs com verbo e resultado ("Agendar diagnóstico", "Ver planos"), nunca só "Clique aqui" ou "Saiba mais" repetido.
- Imagens: fotos reais do cliente quando existirem. Aplique o mesmo tratamento em todas (mesma temperatura, contraste, ou P&B/duotone). Placeholders devem ser claramente marcados e ter a proporção final.
- Use `<img>` com `width`/`height`, `loading="lazy"` abaixo da dobra, `fetchpriority="high"` na imagem do hero, formatos WebP/AVIF.

---

## 12. Checklist de QA antes de entregar

Teste no navegador do Antigravity em 1440, 1024, 768 e 390 px e confirme:

**Visual e alinhamento**
- [ ] Logo, título do hero, seções e footer alinham na mesma borda esquerda.
- [ ] Nenhum espaçamento fora da escala. Nenhuma cor fora dos tokens.
- [ ] Botões com mesma altura e raio em toda a página.
- [ ] Cards da mesma linha com mesma altura e CTAs alinhados na base.
- [ ] Nenhum item da seção 2 presente.
- [ ] Sem scroll horizontal em nenhuma largura.

**Interação**
- [ ] Navbar muda ao rolar, link ativo correto, menu mobile abre, fecha com Esc e prende o foco.
- [ ] Todos os estados de hover, focus-visible e active funcionando.
- [ ] Carrossel funciona com toque, mouse, teclado e botões.
- [ ] Âncoras com `scroll-margin-top` igual à altura da navbar.

**Movimento**
- [ ] Reveals disparam uma vez, sem travar a rolagem.
- [ ] `prefers-reduced-motion` desliga os efeitos pesados.

**Acessibilidade e performance**
- [ ] Contraste AA, um `h1` por página, hierarquia de títulos correta, `alt` em imagens.
- [ ] Lighthouse: Performance 90+, Acessibilidade 95+, CLS menor que 0.1.
- [ ] Fontes com `font-display: swap` e pré-carregamento da fonte do título.

Ao final, entregue: screenshots desktop e mobile, o art direction brief, a lista de suposições feitas e os pontos que dependem de material real do cliente (fotos, números, depoimentos).
