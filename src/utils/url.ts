// Hilfsfunktion: macht interne Pfade base-aware, damit die Seite sowohl
// unter dem Custom-Domain-Root (https://wahrheitskomplex.de/...) als auch
// unter dem GitHub-Pages-Subpath (https://ai-sui.github.io/wahrheitskomplex.de/...)
// korrekt verlinkt.
//
// Hintergrund: Astro setzt nur Asset-URLs (CSS, JS, Images via Imports) automatisch
// auf base, NICHT die Werte in <a href>. Deshalb dieser Wrapper.
//
// Verwendung in .astro-Dateien:
//   ---
//   import { withBase } from '../utils/url';
//   ---
//   <a href={withBase('/buch')}>Zum Buch</a>
//
// Externe URLs (mit `http://` oder `https://`) werden unverändert zurückgegeben.

export function withBase(path: string): string {
  if (/^https?:\/\//.test(path) || path.startsWith('mailto:') || path.startsWith('#')) {
    return path;
  }
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
