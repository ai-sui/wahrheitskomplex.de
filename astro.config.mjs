// @ts-check
import fs from 'node:fs';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Site ist 100% statisch — kein Hoster-spezifischer Adapter nötig.
// Wir deployen auf GitHub Pages (siehe .github/workflows/deploy-pages.yml).
//
// Solange keine Custom-Domain hinterlegt ist, läuft die Seite unter
//   https://ai-sui.github.io/wahrheitskomplex.de/
// und braucht `base: '/wahrheitskomplex.de'`.
//
// Sobald die DNS-Records für wahrheitskomplex.de auf GitHub zeigen und in
// /public/ eine CNAME-Datei liegt, läuft die Seite unter
//   https://wahrheitskomplex.de/
// und `base` muss '/' sein.
//
// Wir erkennen das automatisch über die CNAME-Datei.

const hasCustomDomain = fs.existsSync(new URL('./public/CNAME', import.meta.url));
const site = hasCustomDomain
  ? 'https://wahrheitskomplex.de'
  : 'https://ai-sui.github.io';
const base = hasCustomDomain ? '/' : '/wahrheitskomplex.de';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  output: 'static',
  integrations: [sitemap()],
  // /atlas/* → /portraits/* (Atlas wurde im Mai 2026 umbenannt; Norbert
  // hatte den Begriff zu kartografisch gefunden). Astro generiert
  // statische Meta-Refresh-HTML-Dateien für beide Pfade, sodass alte
  // Links extern (Backlinks, Norbert-Blog) weiter funktionieren.
  redirects: {
    '/atlas': '/portraits',
    '/atlas/[slug]': '/portraits/[slug]',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
