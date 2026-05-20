# Wahrheitskomplex.de

Begleit-Site zum Buch *Der Wahrheitskomplex* von Norbert Häring (Westend Verlag, 2026).
Build mit Astro 6 + Tailwind 4, gehostet auf GitHub Pages — ohne Tracker, ohne Webfonts,
ohne Analytics.

**Live:**
- Custom-Domain (nach DNS-Migration): [wahrheitskomplex.de](https://wahrheitskomplex.de)
- Build-Vorschau: [ai-sui.github.io/wahrheitskomplex.de](https://ai-sui.github.io/wahrheitskomplex.de/)

## Routen

- `/` — Startseite mit Karussells: Neues / NGOs / Chronik / Faktenchecks
- `/atlas` — Akteurs-Übersicht mit Filter-Chips
- `/atlas/[slug]` — Akteurs-Detail (für Akteure mit `fulltext: true`)
- `/buch` — Kapitel-Übersicht des Buchs
- `/faktenchecks` — Faktenchecker im Check (Vollübersicht, gefiltert)
- `/chronik` — Vollständige Chronik
- `/im-gespraech` — Interviews, Videos, Rezensionen, Podcasts
- `/glossar` — Begriffe im Wahrheitskomplex
- `/impressum`, `/datenschutz`

## Lokal entwickeln

```bash
npm install
npm run dev          # http://localhost:4321
```

## Deploy

Automatisch via GitHub Actions auf jeden Push nach `main` —
siehe [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml).
Wird Pages über GitHub-Settings → Pages konfiguriert (Source: GitHub Actions).

Custom-Domain wird über `public/CNAME` aktiviert (Datei vorhanden → base path = '/',
Datei fehlt → base path = '/wahrheitskomplex.de' für die Build-Vorschau-URL).

Operations-Playbook (DNS, OAuth, Secrets, Rollback): [OPERATIONS.md](./OPERATIONS.md)

## Inhalte pflegen

Über das CMS unter `/admin/` (Decap CMS, Login via GitHub OAuth).
Anleitung für Redakteur:innen: [BEDIENUNGSANLEITUNG-NORBERT.md](./BEDIENUNGSANLEITUNG-NORBERT.md)

Akteure und Faktenchecks leben als Markdown-Files unter `src/content/{actors,faktenchecks,medien}/`.
Schema in [`src/content.config.ts`](./src/content.config.ts) (Zod-validiert beim Build).

## Auto-Sync

GitHub Action [`auto-sync.yml`](./.github/workflows/auto-sync.yml) holt täglich um
6:30 CET neue Beiträge von norberthaering.de und erzeugt PRs.

## Was bewusst nicht drin ist

- Newsletter-Backend — Anmeldung läuft über norberthaering.de
- Beziehungsgraph der Geldflüsse
- Volle Liber-Net-Datenintegration
- Mehrsprachigkeit
