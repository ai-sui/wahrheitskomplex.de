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
  vite: {
    plugins: [tailwindcss()],
  },
});
