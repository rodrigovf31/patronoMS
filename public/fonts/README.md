# Fontes self-hosted — PerformanceHub

Este diretório aloja as fontes web usadas pela plataforma. As fontes são
servidas a partir da própria origem (em vez de Google Fonts CDN) para eliminar
o render-blocking do `@import`, melhorar o LCP e remover dependência externa.

## Ação manual pendente

Os ficheiros `.woff2` **não estão neste repositório** (não são redistribuídos
pelo Google/autores). Tens de os descarregar tu próprio através do
**Google Webfonts Helper**:

- https://gwfh.mranftl.com/fonts

## Ficheiros necessários

Ao gerar o pack no gwfh, escolhe:

- **Formato:** `woff2` (apenas — sem `woff`, `ttf`, etc.)
- **Estilo:** `font-display: swap` (já configurado no CSS, só descarrega os ficheiros)

### Orbitron — charset `latin`, pesos 400 / 700 / 900

```
orbitron-v31-latin-400.woff2
orbitron-v31-latin-700.woff2
orbitron-v31-latin-900.woff2
```

### Barlow Condensed — charset `latin-ext` (inclui ç, ã, õ, etc.), pesos 300 / 400 / 600 / 700

```
barlow-condensed-v12-latin-ext-300.woff2
barlow-condensed-v12-latin-ext-400.woff2
barlow-condensed-v12-latin-ext-600.woff2
barlow-condensed-v12-latin-ext-700.woff2
```

## Onde colocar

Extrai cada `.woff2` directamente para este diretório:

```
public/fonts/orbitron-v31-latin-400.woff2
public/fonts/orbitron-v31-latin-700.woff2
public/fonts/orbitron-v31-latin-900.woff2
public/fonts/barlow-condensed-v12-latin-ext-300.woff2
public/fonts/barlow-condensed-v12-latin-ext-400.woff2
public/fonts/barlow-condensed-v12-latin-ext-600.woff2
public/fonts/barlow-condensed-v12-latin-ext-700.woff2
```

Não crias subpastas — os caminhos declarados em `src/index.css` assumem este
layout exacto.

## Se o Google Webfonts Helper devolver nomes diferentes

O `v31` / `v12` no nome é o versionamento do Google e muda ao longo do tempo.
Se descarregares ficheiros com outro número de versão:

1. Renomeia-os para coincidir exactamente com a lista acima **ou**
2. Actualiza os `url(...)` em [`src/index.css`](../../src/index.css) e o
   `<link rel="preload">` em [`index.html`](../../index.html) para reflectir
   os novos nomes.

## Porque é que isto não é um `npm install`

`@fontsource/*` podia automatizar isto, mas traria 7 pacotes e aumentaria o
`node_modules`. Para 7 ficheiros estáticos, o trade-off não compensa.
