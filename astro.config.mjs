// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Site ist 100% statisch — kein Hoster-spezifischer Adapter nötig.
// Cloudflare Pages, Vercel, GitHub Pages oder Netlify können alle das
// Ergebnis aus `dist/` direkt serven.
// https://astro.build/config
export default defineConfig({
  site: 'https://wahrheitskomplex.netlify.app', // wird auf wahrheitskomplex.de umgestellt, sobald Domain steht
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
