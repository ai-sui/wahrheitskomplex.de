// Lädt YouTube-Thumbnails der Medien-Einträge lokal nach /public/yt-thumbs/.
// Damit lädt die Seite keine Drittanbieter-Ressourcen vor Klick auf Play.
// Aufruf: npm run yt-thumbs
import { readdir, readFile, mkdir, access } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const medienDir = join(root, 'src/content/medien');
const outDir = join(root, 'public/yt-thumbs');

await mkdir(outDir, { recursive: true });

function getFrontmatterField(md, field) {
  const m = md.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
}

const files = (await readdir(medienDir)).filter((f) => f.endsWith('.md'));
const candidates = [];
for (const f of files) {
  const md = await readFile(join(medienDir, f), 'utf8');
  const fm = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) continue;
  const id = getFrontmatterField(fm[1], 'youtubeId');
  if (id) candidates.push(id);
}

console.log(`${candidates.length} YouTube-Thumbnails zu laden…`);

// Versuche maxresdefault, fallback auf hqdefault.
const sizes = ['maxresdefault.jpg', 'hqdefault.jpg'];

for (const id of candidates) {
  const outPath = join(outDir, `${id}.jpg`);
  try {
    await access(outPath);
    console.log(`= ${id} (vorhanden)`);
    continue;
  } catch {}

  let buf = null;
  for (const size of sizes) {
    const url = `https://i.ytimg.com/vi/${id}/${size}`;
    const res = await fetch(url);
    if (res.ok) {
      const ab = await res.arrayBuffer();
      // YouTube returns a tiny 120x90 placeholder for missing maxres
      if (ab.byteLength > 5000) {
        buf = Buffer.from(ab);
        break;
      }
    }
  }
  if (!buf) {
    console.warn(`! ${id} — kein Thumbnail erreichbar`);
    continue;
  }

  // Optimize: max 1280 wide, progressive JPEG, ~80 quality
  await sharp(buf)
    .resize({ width: 1280, withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(outPath);
  console.log(`+ ${id}`);
}
