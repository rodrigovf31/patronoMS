# Refactoring Report — 2026-04-18

## Resumo executivo

Este refactoring resolve os oito problemas (P1–P8) identificados na auditoria
prévia do PerformanceHub: alinhamento do schema Supabase aos TypeScript types,
rebranding de PatronoMS para PerformanceHub, correcção de rotas e ficheiros,
higiene de `index.html` / `package.json` / `metadata.json`, e migração das
fontes de Google Fonts CDN para self-hosting.

Todas as alterações de código estão **prontas para merge**. O build de produção
passa (`npm run build`) e o typecheck também (`tsc --noEmit`).

Restam três acções manuais a cargo do utilizador (download das fontes e
execução das duas migrations SQL no Supabase Studio) — ver secção
["Acções manuais pendentes"](#acções-manuais-pendentes-do-utilizador).

---

## Alterações por sprint

### Sprint 1 — `chore: clean up template residue and rebrand to PerformanceHub`
Commit: `539dca2`

- [index.html](index.html) — `lang="pt-PT"`, título, meta description, Open Graph, theme-color, favicon.
- [public/favicon.svg](public/favicon.svg) — SVG monocromático `#73242A` (volante estilizado, 24×24).
- [package.json](package.json) — `name: "performancehub"`, remove `express`, `dotenv`, `@types/express`.
- [metadata.json](metadata.json) — descrição alinhada ao projecto.
- [src/layouts/MainLayout.tsx](src/layouts/MainLayout.tsx) — logo e footer com PerformanceHub; dropdown "Destaque" a dizer "Em breve"; zero resíduo de PatronoMS/Veloce.
- [src/pages/HomePage.tsx](src/pages/HomePage.tsx) — `FEATURED_CARS` neutralizado com "Em breve" (sem modelos fictícios); estrutura e design preservados.

### Sprint 2 — `fix(routes): rename CarPages to CarsPage and migrate guides route to slug`
Commit: `d0acc78`

- [src/pages/CarsPage.tsx](src/pages/CarsPage.tsx) — renomeado via `git mv` a partir de `CarPages.tsx` (histórico preservado).
- [src/routes/index.tsx](src/routes/index.tsx) — import actualizado; rota `guides/:id` → `guides/:slug`; bloco de documentação sincronizado.
- [src/data/mocks/cars.mock.ts](src/data/mocks/cars.mock.ts) — comentário interno actualizado para o novo nome de ficheiro.

### Sprint 3 — `perf(fonts): self-host web fonts and extract global styles to index.css`
Commit: `a3e63db`

- [src/index.css](src/index.css) — sete `@font-face` (Orbitron 400/700/900 + Barlow Condensed 300/400/600/700) com `font-display: swap`; design tokens `:root`; classes utilitárias `.glass-panel`, `.tech-grid`, `.liquid-glass-hover`, `.logo-text`, `.custom-scrollbar`; keyframes `slideDown` / `fadeIn` / `slideUp`.
- [src/App.tsx](src/App.tsx) — reduzido a 5 linhas (apenas `<AppRoutes />`); componente `GlobalStyles` eliminado.
- [index.html](index.html) — `<link rel="preload">` para `orbitron-v31-latin-900.woff2` e `barlow-condensed-v12-latin-ext-400.woff2` (fontes mais críticas para LCP).
- [public/fonts/README.md](public/fonts/README.md) — instruções detalhadas para o utilizador descarregar os `.woff2` via Google Webfonts Helper.

### Sprint 4 — `chore(db): add migration to align schema with TypeScript types`
Commit: `ba40405`

- [supabase/migrations/002_align_schema_to_types.sql](supabase/migrations/002_align_schema_to_types.sql) — 10 RENAMES em `cars`, 1 RENAME em `car_images`, 7 DROPs, 17 ADDs; rollback completo comentado no fim.
- [supabase/migrations/AUDIT_TYPES_VS_SCHEMA.md](supabase/migrations/AUDIT_TYPES_VS_SCHEMA.md) — tabela campo-a-campo (`CarDetail` + `CarImage`) com acção SQL e justificação por campo.
- [supabase/migrations/003_create_guides_table.sql](supabase/migrations/003_create_guides_table.sql) — tabela `guides` com `slug UNIQUE`, `is_published`, trigger `updated_at` e policy RLS de leitura pública para conteúdo publicado.

### Sprint 5 — `chore: validate refactoring with typecheck and build`
Commit: `ffa7560` (empty commit)

Sprint de validação — sem alterações a ficheiros. Ver secção
["Verificações executadas"](#verificações-executadas).

### Sprint 6 — `docs: add refactoring report`
Commit: (este ficheiro)

- [REFACTORING_REPORT.md](REFACTORING_REPORT.md) — este documento.

---

## Acções manuais pendentes do utilizador

1. **Descarregar ficheiros `.woff2`** conforme [public/fonts/README.md](public/fonts/README.md).
   - Sete ficheiros, formato `woff2` apenas, via https://gwfh.mranftl.com/fonts.
   - Orbitron charset `latin`, pesos 400/700/900.
   - Barlow Condensed charset `latin-ext` (inclui ç, ã, õ), pesos 300/400/600/700.
   - Colocar directamente em `public/fonts/` sem subpastas.

2. **Executar [supabase/migrations/002_align_schema_to_types.sql](supabase/migrations/002_align_schema_to_types.sql)** no Supabase Studio (SQL Editor).
   - Pré-requisito: migration 001 já aplicada (tabelas `cars`, `car_images`, etc. existem).
   - Inclui `BEGIN`/`COMMIT` — se qualquer ALTER falhar (ex: coluna com nome diferente do assumido), nada é aplicado. Ler mensagem de erro e ajustar nomes de colunas antes de re-executar.

3. **Executar [supabase/migrations/003_create_guides_table.sql](supabase/migrations/003_create_guides_table.sql)** no Supabase Studio.
   - Cria a tabela `guides`, os índices, a função `set_updated_at()`, o trigger, e a policy RLS.

4. **Verificar paths dos `.woff2`** em [src/index.css](src/index.css) e nos `<link rel="preload">` de [index.html](index.html) depois do download.
   - Se o Google Webfonts Helper entregar ficheiros com versão diferente (ex: `v32` em vez de `v31`), renomear para coincidir com o esperado **ou** editar os paths nos dois ficheiros.

---

## Verificações executadas

```
$ tsc --noEmit
TSC: OK

$ npm run build
vite v6.4.1 building for production...
✓ 1694 modules transformed.
dist/index.html                 1.38 kB │ gzip: 0.64 kB
dist/assets/index-Bq--fJEY.css  37.64 kB │ gzip: 6.92 kB
dist/assets/index-Bp9WH7KU.js  286.90 kB │ gzip: 86.10 kB
✓ built in 3.05s

# Warnings de build apenas sobre .woff2 ausentes (esperado — user action
# pendente). Não bloqueiam o build.

$ grep -rni "patrono|PatronoMS|react-example|google ai studio" .
(zero resultados)

$ grep -rn "fonts.googleapis.com" src/ public/
(zero resultados)

$ grep -rn "cars/:id|guides/:id" src/
(zero resultados)

$ wc -l src/App.tsx
5 src/App.tsx

$ ls src/pages/
CarDetails.tsx  CarsPage.tsx  HomePage.tsx
```

### Correspondência problema → resolução

| Problema | Resolvido em | Como |
|---|---|---|
| P1 — Types divergentes do schema | Sprint 4 | Migration 002 + AUDIT doc (Opção A: types = fonte de verdade). |
| P2 — Branding PatronoMS | Sprint 1 | MainLayout + HomePage + metadata + package.json. |
| P3 — `CarPages.tsx` typo | Sprint 2 | `git mv` para `CarsPage.tsx`. |
| P4 — Google Fonts CDN | Sprint 3 | `@font-face` self-hosted + preload. |
| P5 — `<style>` JSX global | Sprint 3 | Migração para `index.css`; `App.tsx` em 5 linhas. |
| P6 — index.html template | Sprint 1 | `lang="pt-PT"`, título, meta description, OG, favicon. |
| P7 — package.json herdado | Sprint 1 | `name: "performancehub"`; remove express/dotenv/@types/express. |
| P8 — `guides/:id` | Sprint 2 | Rota migrada para `guides/:slug`. |

---

## Não feito (fora do escopo deste refactoring)

- **Popular Supabase com carros reais** — responsabilidade de conteúdo editorial; depende da execução das migrations.
- **Migração Phase A → Phase B em [src/services/cars.service.ts](src/services/cars.service.ts)** — depende das migrations estarem aplicadas e de existir dado real na BD.
- **NotFoundPage real** — neste momento todas as 404 usam o componente `PlaceholderPage` em [src/routes/index.tsx](src/routes/index.tsx).
- **SEO operacional:**
  - `react-helmet-async` (meta tags por rota)
  - `vite-plugin-prerender` (gera HTML estático para cada rota, resolve o problema de SPA + SEO)
  - `vercel.json` (redirects, headers, cache-control)
  - `sitemap.xml`
  - `robots.txt`
- **Criação dos ficheiros `.woff2` reais** — não podem ser redistribuídos; ver [public/fonts/README.md](public/fonts/README.md).
- **Implementação das páginas `/compare`, `/calculators/*`, `/guides`** — ainda placeholders.
- **Hint pré-existente** `'React' is declared but its value is never read` em [src/routes/index.tsx](src/routes/index.tsx) — não bloqueia build nem typecheck, e predata este refactoring. Pode ser limpo num próximo sprint de higiene.

---

## Resumo dos commits

```
ffa7560  chore: validate refactoring with typecheck and build
ba40405  chore(db): add migration to align schema with TypeScript types
a3e63db  perf(fonts): self-host web fonts and extract global styles to index.css
d0acc78  fix(routes): rename CarPages to CarsPage and migrate guides route to slug
539dca2  chore: clean up template residue and rebrand to PerformanceHub
27a62c9  feat: Inicialização da Phase B. Push para GitHub de arquitetura melhorada. (anterior)
```
