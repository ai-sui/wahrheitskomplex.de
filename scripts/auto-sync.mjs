// Auto-Sync von norberthaering.de
//
// Liest Härings öffentliche Sammelseiten und legt für neue Artikel
// Markdown-Stubs in src/content/{faktenchecks,medien}/ an.
// Bestehende Einträge bleiben unangetastet — Match per URL.
//
// Aufgerufen entweder lokal (`npm run auto-sync`) oder täglich von
// .github/workflows/auto-sync.yml. Das Workflow-File erstellt aus den
// neuen Markdown-Files automatisch einen Pull-Request.

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 ' +
  '(KHTML, like Gecko) Wahrheitskomplex-AutoSync';

// ---------- Helpers ----------

function decodeHtml(s) {
  return s
    .replace(/&#8222;/g, '„')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8217;/g, '’')
    .replace(/&#8230;/g, '…')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function yamlString(s) {
  // single-quoted YAML: doppelte Apostrophe innen escapen
  return `'${String(s).replace(/'/g, "''")}'`;
}

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`);
  return res.text();
}

function ogImage(html) {
  const m =
    html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
  return m ? m[1] : null;
}

function entryTitle(html) {
  const m = html.match(
    /<h1[^>]*class=["'][^"']*entry-title[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i,
  );
  if (!m) return null;
  return decodeHtml(m[1].replace(/<[^>]+>/g, '').trim());
}

function leadDateAndText(html) {
  // Häring-Stil: erster Absatz beginnt häufig mit „2. 01. 2022 | ..."
  const ec =
    html.match(/<div\s+class="entry-content"[^>]*>([\s\S]*?)<\/div>\s*<footer/i) ||
    html.match(/<div\s+class="entry-content"[^>]*>([\s\S]*?)<\/article>/i);
  if (!ec) return { date: null, text: null };
  const pMatch = ec[1].match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (!pMatch) return { date: null, text: null };
  const raw = decodeHtml(
    pMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
  );
  const dm = raw.match(/^(?:[^\d]*?)(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})\s*\|\s*(.+)/);
  if (dm) {
    return {
      date: `${dm[3]}-${dm[2].padStart(2, '0')}-${dm[1].padStart(2, '0')}`,
      text: dm[4],
    };
  }
  return { date: null, text: raw };
}

// ---------- existing collection scan ----------

async function existingUrls(collection) {
  const dir = join(root, 'src/content', collection);
  let files = [];
  try {
    files = (await readdir(dir)).filter((f) => f.endsWith('.md'));
  } catch {
    return new Set();
  }
  const urls = new Set();
  for (const f of files) {
    const md = await readFile(join(dir, f), 'utf8');
    const m = md.match(/^url:\s*["']?(\S+?)["']?\s*$/m);
    if (m) urls.add(m[1].replace(/^"|"$/g, ''));
  }
  return urls;
}

// ---------- Faktenchecks ----------

function guessFaktenchecker(slug, title) {
  const t = `${slug} ${title}`.toLowerCase();
  if (/correctiv/.test(t)) return 'Correctiv';
  if (/\bdpa\b/.test(t)) return 'dpa-Faktencheck';
  if (/(siggelkow|ard-faktenfinder|ard\b|faktenfinder)/.test(t)) return 'ARD-Faktenfinder';
  if (/tagesschau/.test(t)) return 'Tagesschau (ARD)';
  if (/zdf/.test(t)) return 'ZDF';
  if (/afp/.test(t)) return 'AFP';
  if (/\bdw\b|deutsche welle/.test(t)) return 'Deutsche Welle';
  if (/ndr/.test(t)) return 'NDR';
  if (/(br|faktenfuchs)/.test(t)) return 'BR Faktenfuchs';
  if (/newsguard/.test(t)) return 'NewsGuard';
  return 'mehrere';
}

async function syncFaktenchecks() {
  console.log('— Faktenchecks —');
  const html = await fetchHtml(
    'https://norberthaering.de/wahrheitskomplex/faktenchecks/',
  );
  const links = [
    ...html.matchAll(
      /href="(https:\/\/norberthaering\.de\/(?:news|propaganda-zensur)\/[^"#]+\/)"/g,
    ),
  ]
    .map((m) => m[1])
    .filter((url, i, arr) => arr.indexOf(url) === i);

  const existing = await existingUrls('faktenchecks');
  const newOnes = links.filter((l) => !existing.has(l));
  console.log(`  ${links.length} gelistet · ${newOnes.length} neu`);

  const outDir = join(root, 'src/content/faktenchecks');
  await mkdir(outDir, { recursive: true });

  for (const url of newOnes) {
    try {
      const articleHtml = await fetchHtml(url);
      const title = entryTitle(articleHtml) ?? '(Titel unbekannt)';
      const { date, text } = leadDateAndText(articleHtml);
      const isoDate = date ?? new Date().toISOString().slice(0, 10);
      const slug = url.replace(/\/$/, '').split('/').pop();
      const fileSlug = slugify(slug);
      const fc = guessFaktenchecker(slug, title);
      const summary = (text ?? '').slice(0, 600);

      const md = `---
title: ${yamlString(title)}
faktenchecker: ${yamlString(fc)}
date: "${isoDate}"
themen: []
summary: >-
  ${summary.replace(/\s+/g, ' ').trim()}
url: "${url}"
quellen:
  - "Norbert Häring (norberthaering.de)"
# Auto-Sync-Stub vom ${new Date().toISOString().slice(0, 10)}.
# Bitte vor dem Merge: Themen vergeben, ggf. Faktenchecker korrigieren,
# Summary kürzen/glätten.
---
`;
      await writeFile(join(outDir, `${fileSlug}.md`), md);
      console.log(`  + ${fileSlug}.md`);
    } catch (err) {
      console.warn(`  ! ${url}: ${err.message}`);
    }
  }
}

// ---------- Medien (Interviews, Videos, Rezensionen) ----------

function guessOutlet(url) {
  try {
    const u = new URL(url);
    const h = u.hostname.replace(/^www\./, '');
    const map = {
      'multipolar-magazin.de': 'Multipolar Magazin',
      'overton-magazin.de': 'Overton Magazin',
      'tichyseinblick.de': 'Tichys Einblick',
      'nachdenkseiten.de': 'NachDenkSeiten',
      'berliner-zeitung.de': 'Berliner Zeitung',
      'freie-medienakademie.de': 'Freie Akademie für Medien & Journalismus',
      'weltwoche.ch': 'Weltwoche',
      'barucker.press': 'Barucker (Substack)',
      'youtube.com': 'YouTube',
      'youtu.be': 'YouTube',
      'punkt-preradovic.com': 'Punkt.PRERADOVIC',
      'odysee.com': 'Odysee',
      'apolut.net': 'apolut',
      'ansage.org': 'Ansage',
      'norberthaering.de': 'norberthaering.de',
    };
    return map[h] ?? h;
  } catch {
    return 'Unbekannt';
  }
}

function guessType(url, host) {
  if (/youtube|youtu\.be/.test(host)) return 'video';
  if (/punkt-preradovic|odysee|substack/.test(host)) return 'video';
  if (/tichyseinblick|nachdenkseiten|multipolar|freie-medienakademie|keusch/.test(host)) return 'rezension';
  return 'interview';
}

function youtubeIdFromUrl(url) {
  try {
    const u = new URL(url);
    if (/youtube\.com/.test(u.hostname) && u.searchParams.get('v')) {
      return u.searchParams.get('v');
    }
    if (/youtu\.be/.test(u.hostname)) return u.pathname.slice(1);
  } catch {}
  return null;
}

async function syncMedien() {
  console.log('— Medien (Interviews, Videos, Rezensionen) —');
  const html = await fetchHtml(
    'https://norberthaering.de/wahrheitskomplex/rezensionen-interviews/',
  );
  // Externe Links auf der Sammelseite
  const links = [
    ...html.matchAll(/href="(https?:\/\/[^"#]+)"/g),
  ]
    .map((m) => m[1])
    .filter((url) => {
      // nur externe Links / Häring-Interview-Posts
      if (/^https?:\/\/[^/]*norberthaering\.de/.test(url)) {
        return /\/buchtipps\//.test(url); // gespiegelte Rezensionen wie skambraks
      }
      // Skip Tools/Stuff
      if (/(wordpress\.org|gravatar|gmpg|google)/.test(url)) return false;
      // Skip Verlag-Shops
      if (/(westendverlag|buchkomplizen|ohrenschmauss|freistattsmart|promostoff)\b/.test(url)) return false;
      // Skip Telegram/X-Profile
      if (/^https?:\/\/(t\.me|x\.com|twitter\.com)\//.test(url)) return false;
      return true;
    })
    .filter((url, i, arr) => arr.indexOf(url) === i);

  const existing = await existingUrls('medien');
  const newOnes = links.filter((l) => !existing.has(l));
  console.log(`  ${links.length} gelistet · ${newOnes.length} neu`);

  const outDir = join(root, 'src/content/medien');
  await mkdir(outDir, { recursive: true });

  for (const url of newOnes) {
    try {
      const u = new URL(url);
      const host = u.hostname.replace(/^www\./, '');
      const outlet = guessOutlet(url);
      const type = guessType(url, host);
      const ytId = youtubeIdFromUrl(url);

      // Versuche, eine Beschreibung von der Zielseite zu holen
      let title = '';
      let date = new Date().toISOString().slice(0, 10);
      try {
        const articleHtml = await fetchHtml(url);
        const ogTitle = (articleHtml.match(
          /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i,
        ) || [])[1];
        title = decodeHtml(ogTitle ?? '').trim() || (await guessTitleFromHaering(html, url));
        const pubDate = (articleHtml.match(
          /<meta[^>]*property=["']article:published_time["'][^>]*content=["']([^"']+)["']/i,
        ) || [])[1];
        if (pubDate) date = pubDate.slice(0, 10);
      } catch {
        title = await guessTitleFromHaering(html, url);
      }
      if (!title) title = `${outlet} — Beitrag`;

      const slug = slugify(`${host}-${title.split(/\s+/).slice(0, 6).join('-')}`);
      const md = `---
title: ${yamlString(title)}
type: ${type}
host: ''
outlet: ${yamlString(outlet)}
url: "${url}"${ytId ? `\nyoutubeId: ${ytId}` : ''}
date: "${date}"
paywall: false
themen: []
pullquote: ''
language: de
# Auto-Sync-Stub vom ${new Date().toISOString().slice(0, 10)}.
# Bitte vor dem Merge: Host (Interviewer/Autor) ergänzen, Themen vergeben,
# pullquote setzen und prüfen, ob paywall stimmt.
---
`;
      await writeFile(join(outDir, `${slug}.md`), md);
      console.log(`  + ${slug}.md`);
    } catch (err) {
      console.warn(`  ! ${url}: ${err.message}`);
    }
  }
}

async function guessTitleFromHaering(haeringHtml, targetUrl) {
  // Suche das Link-Element auf der Sammelseite und nimm den Linktext.
  const safe = targetUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`<a[^>]+href=["']${safe}["'][^>]*>([^<]+)<\/a>`, 'i');
  const m = haeringHtml.match(re);
  return m ? decodeHtml(m[1]).trim() : '';
}

// ---------- main ----------

try {
  await syncFaktenchecks();
  await syncMedien();
  console.log('Auto-Sync fertig.');
} catch (err) {
  console.error('Auto-Sync fehlgeschlagen:', err);
  process.exit(1);
}
