# Wahrheitskomplex.de — Demo

Begleit-Site zum Buch *Der Wahrheitskomplex* von Norbert Häring (Westend Verlag, 2026).
Build mit Astro 6 + Tailwind 4. Deployt auf Netlify ohne Tracker, ohne Webfonts, ohne Analytics.

**Live:** [wahrheitskomplex.netlify.app](https://wahrheitskomplex.netlify.app)

## Routen

- `/` — Startseite mit „Fakt der Woche", drei Hook-Karten, Newsletter-Teaser
- `/atlas` — Akteurs-Übersicht mit Filter-Chips (Thema, Akteurstyp)
- `/atlas/[slug]` — Akteurs-Detail (Volltext für Science Media Center, Atlantic Council, ISD)
- `/impressum` — Platzhalter
- `/datenschutz` — Platzhalter

## Lokal entwickeln

```bash
npm install
npm run dev          # http://localhost:4321
```

## Deploy auf Netlify

Die Site ist mit Netlify verknüpft (Site-ID liegt in `.netlify/state.json`).
Deploys laufen aus dem Projektordner per Netlify-CLI:

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

Beim ersten Mal nötig: `npx netlify login`.

## Inhalte pflegen

Die Akteure leben als Markdown-Files unter `src/content/actors/`. Schema in
[`src/content.config.ts`](./src/content.config.ts) (Zod-validiert beim Build).

Felder:

| Feld | Pflicht | Bemerkung |
|------|---------|-----------|
| `name`, `kategorie`, `akteurstyp`, `land` | ja | |
| `themen` | ja | Array aus Strings, sollte zu den Filter-Chips in `/atlas` passen |
| `finanzierung`, `kernkritik` | ja | Prosa |
| `kurzbeschreibung` | ja | Eine Zeile für die Karte |
| `fulltext` | ja | `true` → Detail-Seite wird generiert |
| `gegruendet`, `reichweite`, `stellungnahme`, `buchKapitel` | nein | |
| `haeringLink`, `libernetLink` | nein | URLs |
| `quellen` | nein | Array von `{ title, url, publisher, date }` |
| `order` | nein | Sortierung im Atlas-Grid (kleiner = weiter oben) |

Der Markdown-Body (unter den Frontmatter-Strichen) wird im Detail-Profil als
„Hintergrund"-Block gerendert.

## Startseite-Inhalte

Hartkodiert in [`src/data/homepage.ts`](./src/data/homepage.ts).
Spätere CMS-Anbindung tauscht nur diese Datei aus.

## Was bewusst nicht drin ist

- Newsletter-Backend (Phase 2): Anmeldung läuft vorerst über norberthaering.de
- Beziehungsgraph der Geldflüsse
- Volle Liber-Net-Datenintegration
- Mehrsprachigkeit
- CMS-Anbindung
