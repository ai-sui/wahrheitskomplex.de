import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '../public/og.png');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="hairline" width="6" height="6" patternUnits="userSpaceOnUse">
      <path d="M0 6 L6 0" stroke="#1a1a1a" stroke-width="0.4" opacity="0.05"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#f5f1ea"/>
  <rect width="1200" height="630" fill="url(#hairline)"/>

  <!-- Akzent-Linie oben -->
  <rect x="0" y="0" width="1200" height="6" fill="#b8331f"/>

  <!-- Logo / Kicker -->
  <g transform="translate(80, 120)">
    <text x="0" y="0" font-family="Iowan Old Style, Palatino Linotype, Georgia, serif" font-size="22" font-weight="600" fill="#8a8378" letter-spacing="3">WAHRHEITSKOMPLEX</text>
    <circle cx="356" cy="-7" r="6" fill="#b8331f"/>
  </g>

  <!-- Headline -->
  <g transform="translate(80, 290)">
    <text x="0" y="0" font-family="Iowan Old Style, Palatino Linotype, Georgia, serif" font-size="92" font-weight="700" fill="#1a1a1a">Ein Atlas zum Buch</text>
    <text x="0" y="100" font-family="Iowan Old Style, Palatino Linotype, Georgia, serif" font-size="92" font-weight="700" fill="#1a1a1a">von <tspan fill="#b8331f" font-style="italic">Norbert Häring</tspan>.</text>
  </g>

  <!-- Subzeile mit Trennlinie -->
  <line x1="80" y1="500" x2="1120" y2="500" stroke="#d8d0c2" stroke-width="1"/>
  <text x="80" y="540" font-family="Iowan Old Style, Palatino Linotype, Georgia, serif" font-size="24" fill="#4a4a4a" font-style="italic">
    Faktenchecker, Stiftungen, Geldflüsse — durchsuchbar, mit Quellen.
  </text>

  <!-- Footer -->
  <text x="80" y="585" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#8a8378" letter-spacing="2">WESTEND VERLAG · 2026</text>
  <text x="1120" y="585" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="#8a8378" letter-spacing="1">wahrheitskomplex.netlify.app</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(out);

console.log(`Wrote ${out}`);
