// Einmaliges Script (kein Build-Hook): durchsucht für jeden Faktencheck-
// Eintrag Härings Artikel nach Links zu bekannten Faktenchecker-Domains,
// holt das og:image dort und speichert es als Thumb. Aktualisiert die
// MD-Datei mit thumbOverride.
//
// Aufruf:
//   node scripts/enrich-faktencheck-thumbs.mjs
//
// Idempotent: Einträge, die bereits `thumbOverride` haben, werden
// übersprungen.
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const srcDir = join(root, 'src/content/faktenchecks');
const outDir = join(root, 'public/faktencheck-thumbs');

await mkdir(outDir, { recursive: true });

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

// Bekannte Faktenchecker-Domains. Mapping vom Stichwort im `faktenchecker:`-
// Feld zu den möglichen Host-Patterns im Original-Link. Der erste Treffer
// in Härings Artikel wird übernommen.
const FAKTENCHECKER_DOMAINS = {
  dpa: ['dpa-factchecking.com'],
  correctiv: ['correctiv.de', 'correctiv.org', 'faktencheck.correctiv.org'],
  ard: [
    'tagesschau.de/faktenfinder',
    'tagesschau.de',
    'ardmediathek.de',
    'daserste.de',
  ],
  tagesschau: ['tagesschau.de'],
  zdf: ['zdf.de', 'zdfheute.de'],
  dw: ['dw.com'],
  ndr: ['ndr.de'],
  br: ['br.de'],
  afp: ['faktencheck.afp.com'],
};

function detectDomains(faktencheckerField) {
  const f = faktencheckerField.toLowerCase();
  const all = [];
  for (const [key, domains] of Object.entries(FAKTENCHECKER_DOMAINS)) {
    if (f.includes(key)) all.push(...domains);
  }
  // Fallback bei "mehrere": versuche alle gängigen
  if (f.includes('mehrere') || all.length === 0) {
    all.push(
      ...FAKTENCHECKER_DOMAINS.ard,
      ...FAKTENCHECKER_DOMAINS.correctiv,
      ...FAKTENCHECKER_DOMAINS.zdf,
      ...FAKTENCHECKER_DOMAINS.dpa,
      ...FAKTENCHECKER_DOMAINS.br,
    );
  }
  return [...new Set(all)];
}

function ff(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
}

function pickOgImage(html) {
  const ps = [
    /<meta[^>]*property=["']og:image:secure_url["'][^>]*content=["']([^"']+)["']/i,
    /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image:secure_url["']/i,
    /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
    /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i,
    /<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i,
  ];
  for (const re of ps) {
    const m = html.match(re);
    if (m) return m[1];
  }
  return null;
}

function extractExternalLinks(html, sourceUrl) {
  const sourceHost = new URL(sourceUrl).host;
  const links = [];
  const re = /href=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    const href = m[1];
    if (!/^https?:\/\//i.test(href)) continue;
    try {
      const u = new URL(href);
      if (u.host === sourceHost) continue;
      links.push(href);
    } catch {}
  }
  return links;
}

function findFaktencheckerLink(links, domains) {
  for (const link of links) {
    const lower = link.toLowerCase();
    for (const d of domains) {
      if (lower.includes(d.toLowerCase())) return link;
    }
  }
  return null;
}

const files = (await readdir(srcDir)).filter((f) => f.endsWith('.md'));
let processed = 0;
let succeeded = 0;
let skipped = 0;
let failed = 0;
const failures = [];

for (const f of files) {
  const slug = f.replace(/\.md$/, '');
  const mdPath = join(srcDir, f);
  const md = await readFile(mdPath, 'utf8');

  // Schon thumbOverride? Überspringen.
  if (/^thumbOverride:/m.test(md)) {
    console.log(`= ${slug}: hat schon thumbOverride`);
    skipped++;
    continue;
  }

  const fmm = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmm) {
    console.warn(`! ${slug}: kein Frontmatter`);
    failed++;
    continue;
  }

  const haeringUrl = ff(fmm[1], 'url');
  const faktencheckerField = ff(fmm[1], 'faktenchecker');
  if (!haeringUrl || !faktencheckerField) {
    console.warn(`! ${slug}: url oder faktenchecker fehlt`);
    failed++;
    continue;
  }

  processed++;

  try {
    // 1. Härings Artikel laden
    const haeringRes = await fetch(haeringUrl, { headers: { 'User-Agent': UA } });
    if (!haeringRes.ok) {
      throw new Error(`Häring HTTP ${haeringRes.status}`);
    }
    const haeringHtml = await haeringRes.text();

    // 2. Externe Links extrahieren, auf Faktenchecker-Domains filtern
    const links = extractExternalLinks(haeringHtml, haeringUrl);
    const domains = detectDomains(faktencheckerField);
    const fcUrl = findFaktencheckerLink(links, domains);
    if (!fcUrl) {
      throw new Error(`kein Faktenchecker-Link gefunden (${domains.join(', ')})`);
    }

    console.log(`> ${slug}: ${fcUrl.slice(0, 80)}${fcUrl.length > 80 ? '…' : ''}`);

    // 3. Original-Artikel laden, og:image extrahieren
    const fcRes = await fetch(fcUrl, { headers: { 'User-Agent': UA } });
    if (!fcRes.ok) {
      throw new Error(`Faktenchecker HTTP ${fcRes.status}`);
    }
    const fcHtml = await fcRes.text();
    let imgUrl = pickOgImage(fcHtml);
    if (!imgUrl) {
      throw new Error('kein og:image im Original-Artikel');
    }
    imgUrl = imgUrl.replace(/&amp;/g, '&');
    if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
    if (imgUrl.startsWith('/')) {
      const u = new URL(fcUrl);
      imgUrl = `${u.protocol}//${u.host}${imgUrl}`;
    }

    // Generische Faktenchecker-Site-Logos überspringen
    if (/logo|placeholder|default[-_]?og/i.test(imgUrl)) {
      throw new Error(`og:image sieht nach Logo aus: ${imgUrl.slice(0, 60)}`);
    }

    // 4. Bild laden, validieren, resize, speichern
    const imgRes = await fetch(imgUrl, {
      headers: { 'User-Agent': UA, Referer: fcUrl },
    });
    if (!imgRes.ok) {
      throw new Error(`Bild HTTP ${imgRes.status}`);
    }
    const ctype = (imgRes.headers.get('content-type') ?? '').toLowerCase();
    if (!ctype.startsWith('image/')) {
      throw new Error(`kein Bild (${ctype})`);
    }
    const buf = Buffer.from(await imgRes.arrayBuffer());

    // 5. Resize + speichern
    const outPath = join(outDir, `${slug}.jpg`);
    await sharp(buf)
      .resize({
        width: 1280,
        height: 720,
        fit: 'cover',
        position: 'attention',
      })
      .jpeg({ quality: 85, progressive: true, mozjpeg: true })
      .toFile(outPath);

    // 6. MD-Datei aktualisieren: thumbOverride einfügen vor `quellen:` oder
    //    vor `---` (Ende des Frontmatter)
    const thumbLine = `thumbOverride: "/faktencheck-thumbs/${slug}.jpg"`;
    let updated = md;
    if (/^quellen:/m.test(md)) {
      updated = md.replace(/^(quellen:)/m, `${thumbLine}\n$1`);
    } else {
      // Vor dem schließenden --- einfügen
      updated = md.replace(/\n---\n/, `\n${thumbLine}\n---\n`);
    }
    await writeFile(mdPath, updated, 'utf8');

    console.log(`+ ${slug}: ${(buf.length / 1024).toFixed(0)} KB → ${outPath}`);
    succeeded++;
  } catch (err) {
    console.warn(`! ${slug}: ${err.message}`);
    failures.push({ slug, reason: err.message });
    failed++;
  }
}

console.log(
  `\nBilanz: ${succeeded} neu · ${skipped} übersprungen · ${failed} fehlgeschlagen (von ${processed} versucht)`,
);
if (failures.length) {
  console.log('\nFehlgeschlagen:');
  for (const { slug, reason } of failures) {
    console.log(`  - ${slug}: ${reason}`);
  }
}
