// Helpers für strukturierte Daten — vermeidet Boilerplate in jeder Seite.
import { withBase } from './url';

type Crumb = { name: string; path: string };

/**
 * Baut ein BreadcrumbList-Schema (https://schema.org/BreadcrumbList) auf.
 * `site` ist die absolute URL der Site (z.B. Astro.site). Beispiel:
 *
 *   const bc = breadcrumbList(Astro.site, [
 *     { name: 'Atlas der Akteure', path: '/atlas' },
 *     { name: actor.data.name, path: `/atlas/${actor.id}` },
 *   ]);
 *
 * Die Start-Crumb wird automatisch vorangestellt.
 */
export function breadcrumbList(site: URL | string | undefined, trail: Crumb[]) {
  const base: URL = site instanceof URL ? site : new URL(site ?? 'https://wahrheitskomplex.de');
  const items: Crumb[] = [{ name: 'Start', path: '/' }, ...trail];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: new URL(withBase(c.path), base).toString(),
    })),
  };
}
