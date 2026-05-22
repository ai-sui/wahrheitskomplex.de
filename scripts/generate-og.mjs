import sharp from 'sharp';
import { readdir, readFile, mkdir } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '../public');
const ogDir = join(publicDir, 'og');
const actorsDir = resolve(__dirname, '../src/content/actors');

await mkdir(ogDir, { recursive: true });

// XML-escape for safe SVG text content.
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

// Wraps a string into <tspan> lines limited to ~maxChars per line.
function wrapTspan(text, maxChars, x, y, lineHeight) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines
    .map((line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lineHeight}">${esc(line)}</tspan>`)
    .join('');
}

// ---------- Default OG (homepage) ----------

const defaultSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="hairline" width="6" height="6" patternUnits="userSpaceOnUse">
      <path d="M0 6 L6 0" stroke="#1a1a1a" stroke-width="0.4" opacity="0.05"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#f5f1ea"/>
  <rect width="1200" height="630" fill="url(#hairline)"/>
  <rect x="0" y="0" width="1200" height="6" fill="#b8331f"/>

  <g transform="translate(80, 110)">
    <text x="0" y="0" font-family="Iowan Old Style, Palatino Linotype, Georgia, serif" font-size="22" font-weight="600" fill="#6c665a" letter-spacing="3">WAHRHEITSKOMPLEX</text>
    <circle cx="356" cy="-7" r="6" fill="#b8331f"/>
  </g>

  <g transform="translate(80, 250)">
    <text x="0" y="0" font-family="Iowan Old Style, Palatino Linotype, Georgia, serif" font-size="62" font-weight="700" fill="#1a1a1a">Ein Recherche-Atlas</text>
    <text x="0" y="74" font-family="Iowan Old Style, Palatino Linotype, Georgia, serif" font-size="62" font-weight="700" fill="#1a1a1a">zum Buch von</text>
    <text x="0" y="148" font-family="Iowan Old Style, Palatino Linotype, Georgia, serif" font-size="62" font-weight="700" font-style="italic" fill="#b8331f">Norbert Häring.</text>
  </g>

  <line x1="80" y1="540" x2="780" y2="540" stroke="#d8d0c2" stroke-width="1"/>
  <text x="80" y="575" font-family="Iowan Old Style, Palatino Linotype, Georgia, serif" font-size="20" fill="#4a4a4a" font-style="italic">
    Akteure, Faktenchecks, Chronik — recherchiert seit Drucklegung.
  </text>
</svg>`;

// Composite: paper background + book cover on the right.
const coverPath = join(publicDir, 'cover-wahrheitskomplex.jpg');
const coverHeight = 540;
const coverY = (630 - coverHeight) / 2;

const coverBuf = await sharp(coverPath)
  .resize({ height: coverHeight, fit: 'contain' })
  .toBuffer();
const coverMeta = await sharp(coverBuf).metadata();
const coverX = 1200 - coverMeta.width - 60;

await sharp(Buffer.from(defaultSvg))
  .composite([
    { input: coverBuf, left: coverX, top: coverY },
  ])
  .png({ compressionLevel: 9 })
  .toFile(join(publicDir, 'og.png'));
console.log(`Wrote ${join(publicDir, 'og.png')}`);

// ---------- Per-actor OGs ----------

// Splits text into lines of <= maxChars without breaking words.
function splitLines(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function actorSvg({ name, kategorie, kurzbeschreibung, land, gegruendet }) {
  // Pick name font-size based on length; longer names get smaller type to keep <= 2 lines.
  let nameSize, nameMax, nameLineHeight;
  if (name.length <= 18) {
    nameSize = 86; nameMax = 18; nameLineHeight = 96;
  } else if (name.length <= 30) {
    nameSize = 70; nameMax = 22; nameLineHeight = 80;
  } else {
    nameSize = 56; nameMax = 28; nameLineHeight = 64;
  }

  const nameLineArr = splitLines(name, nameMax);
  const nameLines = nameLineArr
    .map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : nameLineHeight}">${esc(line)}</tspan>`)
    .join('');
  const nameStartY = 240;
  const nameEndY = nameStartY + (nameLineArr.length - 1) * nameLineHeight;

  const descStartY = nameEndY + 70;
  const descLines = splitLines(kurzbeschreibung, 64)
    .slice(0, 2)
    .map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : 32}">${esc(line)}</tspan>`)
    .join('');

  const meta = [land, gegruendet ? `Gegründet ${gegruendet}` : null]
    .filter(Boolean)
    .join(' · ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="hairline" width="6" height="6" patternUnits="userSpaceOnUse">
      <path d="M0 6 L6 0" stroke="#1a1a1a" stroke-width="0.4" opacity="0.05"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#f5f1ea"/>
  <rect width="1200" height="630" fill="url(#hairline)"/>
  <rect x="0" y="0" width="1200" height="6" fill="#b8331f"/>

  <g transform="translate(80, 120)">
    <text x="0" y="0" font-family="Iowan Old Style, Palatino Linotype, Georgia, serif" font-size="20" font-weight="600" fill="#6c665a" letter-spacing="3">WAHRHEITSKOMPLEX · ATLAS</text>
    <circle cx="446" cy="-7" r="5" fill="#b8331f"/>
  </g>

  <text x="80" y="170" font-family="system-ui, sans-serif" font-size="18" letter-spacing="2" fill="#b8331f">${esc(kategorie.toUpperCase())}</text>

  <text x="80" y="${nameStartY}" font-family="Iowan Old Style, Palatino Linotype, Georgia, serif" font-size="${nameSize}" font-weight="700" fill="#1a1a1a">
    ${nameLines}
  </text>

  <text x="80" y="${descStartY}" font-family="Iowan Old Style, Palatino Linotype, Georgia, serif" font-size="24" font-style="italic" fill="#4a4a4a">
    ${descLines}
  </text>

  <line x1="80" y1="540" x2="1120" y2="540" stroke="#d8d0c2" stroke-width="1"/>
  <text x="80" y="580" font-family="system-ui, sans-serif" font-size="18" fill="#6c665a" letter-spacing="1">${esc(meta)}</text>
  <text x="1120" y="580" text-anchor="end" font-family="system-ui, sans-serif" font-size="18" fill="#6c665a" letter-spacing="1">wahrheitskomplex.de</text>
</svg>`;
}

// Minimal frontmatter parser for our limited schema (key: value, lists, multiline >- ).
function parseFrontmatter(md) {
  const match = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const lines = match[1].split(/\r?\n/);
  const data = {};
  let lastKey = null;
  let multiline = null; // { key, parts }
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '');
    if (multiline) {
      if (/^\s/.test(line) && line.trim() !== '') {
        multiline.parts.push(line.trim());
        continue;
      }
      data[multiline.key] = multiline.parts.join(' ');
      multiline = null;
    }
    const m = line.match(/^([A-Za-z][\w]*):\s*(.*)$/);
    if (m) {
      const [, key, rest] = m;
      lastKey = key;
      if (rest === '>-' || rest === '>' || rest === '|-' || rest === '|') {
        multiline = { key, parts: [] };
      } else if (rest === '') {
        data[key] = [];
      } else if (/^['"].*['"]$/.test(rest)) {
        data[key] = rest.slice(1, -1);
      } else if (/^\d+$/.test(rest)) {
        data[key] = Number(rest);
      } else if (rest === 'true' || rest === 'false') {
        data[key] = rest === 'true';
      } else {
        data[key] = rest;
      }
    } else if (/^\s*-\s+/.test(line) && lastKey && Array.isArray(data[lastKey])) {
      data[lastKey].push(line.replace(/^\s*-\s+/, '').replace(/^['"]|['"]$/g, ''));
    }
  }
  if (multiline) data[multiline.key] = multiline.parts.join(' ');
  return data;
}

const files = (await readdir(actorsDir)).filter((f) => f.endsWith('.md'));

for (const file of files) {
  const md = await readFile(join(actorsDir, file), 'utf8');
  const data = parseFrontmatter(md);
  if (!data || !data.fulltext) continue;
  const slug = file.replace(/\.md$/, '');
  const svg = actorSvg({
    name: data.name,
    kategorie: data.kategorie,
    kurzbeschreibung: data.kurzbeschreibung,
    land: data.land,
    gegruendet: data.gegruendet,
  });
  const outPath = join(ogDir, `${slug}.png`);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(outPath);
  console.log(`Wrote ${outPath}`);
}
