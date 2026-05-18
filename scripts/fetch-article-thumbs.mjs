// Lädt og:image jedes Medien-Eintrags und speichert lokal als 16:9-JPEG.
// Aufruf: npm run article-thumbs
import sharp from 'sharp';
import { readdir, readFile, mkdir, access } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const medienDir = join(root, 'src/content/medien');
const outDir = join(root, 'public/article-thumbs');

await mkdir(outDir, { recursive: true });

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 ' +
  '(KHTML, like Gecko) Version/17.0 Safari/605.1.15';

function ff(frontmatter, key) {
  const m = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!m) return null;
  return m[1].trim().replace(/^["']|["']$/g, '');
}

function pickOgImage(html) {
  const patterns = [
    /<meta\s+[^>]*property=["']og:image:secure_url["'][^>]*content=["']([^"']+)["']/i,
    /<meta\s+[^>]*content=["']([^"']+)["'][^>]*property=["']og:image:secure_url["']/i,
    /<meta\s+[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
    /<meta\s+[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i,
    /<meta\s+[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i,
    /<meta\s+[^>]*content=["']([^"']+)["'][^>]*name=["']twitter:image["']/i,
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1];
  }
  return null;
}

const files = (await readdir(medienDir)).filter((f) => f.endsWith('.md'));
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

  const md = await readFile(join(medienDir, f), 'utf8');
  const fmm = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmm) continue;
  const fm = fmm[1];

  // Skip YouTube entries — sie nutzen das YT-Thumbnail.
  if (ff(fm, 'youtubeId')) {
    console.log(`- ${slug} (YouTube)`);
    skipped++;
    continue;
  }

  const url = ff(fm, 'url');
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
      console.warn(`! ${slug}: kein og:image gefunden`);
      failed++;
      continue;
    }
    // HTML-Entities in URLs (& → &amp;) auflösen
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
      console.warn(`! ${slug}: kein Bild (content-type=${ctype})`);
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
