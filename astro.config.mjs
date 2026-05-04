// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://wahrheitskomplex.netlify.app',
  output: 'static',
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
  },
});
