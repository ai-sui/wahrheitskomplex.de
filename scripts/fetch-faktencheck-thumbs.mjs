// Lädt og:image jedes Faktencheck-Eintrags und speichert lokal als 16:9-JPEG.
import sharp from 'sharp';
import { readdir, readFile, mkdir, access } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const srcDir = join(root, 'src/content/faktenchecks');
const outDir = join(root, 'public/faktencheck-thumbs');

await mkdir(outDir, { recursive: true });

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15';

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

const files = (await readdir(srcDir)).filter((f) => f.endsWith('.md'));
let ok = 0;
let skipped = 0;
let failed = 0;

for (const f of files) {
  const slug = f.replace(/\.md$/, '');
  const outPath = join(outDir, `${slug}.jpg`);
  try {
    await access(outPath);
    console.log(`= ${slug}`);
    skipped++;
    continue;
  } catch {}

  const md = await readFile(join(srcDir, f), 'utf8');
  const fmm = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmm) continue;
  const url = ff(fmm[1], 'url');
  if (!url) {
    failed++;
    continue;
  }

  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) {
      console.warn(`! ${slug}: HTTP ${res.status}`);
      failed++;
      continue;
    }
    const html = await res.text();
    let imgUrl = pickOgImage(html);
    if (!imgUrl) {
      console.warn(`! ${slug}: kein og:image`);
      failed++;
      continue;
    }
    imgUrl = imgUrl.replace(/&amp;/g, '&');
    if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
    if (imgUrl.startsWith('/')) {
      const u = new URL(url);
      imgUrl = `${u.protocol}//${u.host}${imgUrl}`;
    }
    const imgRes = await fetch(imgUrl, {
      headers: { 'User-Agent': UA, Referer: url },
    });
    if (!imgRes.ok) {
      console.warn(`! ${slug}: Bild HTTP ${imgRes.status}`);
      failed++;
      continue;
    }
    const ctype = (imgRes.headers.get('content-type') ?? '').toLowerCase();
    if (!ctype.startsWith('image/')) {
      console.warn(`! ${slug}: kein Bild (${ctype})`);
      failed++;
      continue;
    }
    const buf = Buffer.from(await imgRes.arrayBuffer());
    await sharp(buf)
      .resize({
        width: 1280,
        height: 720,
        fit: 'cover',
        position: 'attention',
      })
      .jpeg({ quality: 80, progressive: true, mozjpeg: true })
      .toFile(outPath);
    console.log(`+ ${slug}`);
    ok++;
  } catch (err) {
    console.warn(`! ${slug}: ${err.message}`);
    failed++;
  }
}

console.log(`\nBilanz: ${ok} neu · ${skipped} übersprungen · ${failed} fehlgeschlagen`);
