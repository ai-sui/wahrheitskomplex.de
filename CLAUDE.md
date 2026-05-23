# CLAUDE.md — Projekt-Memory für künftige Sessions

## Ansprache und Texte

- **Ralph** ist der Name, mit dem Texte unterschrieben werden. Nicht „Sui".
  „Sui" / „ai-sui" sind nur GitHub-Account und Repo-Owner.
- **Grußformel: „Liebe Grüße"** (nicht „Beste Grüße").
- **Keine Em-Dashes (—) und keine En-Dashes (–)** in von mir verfassten
  Texten. Beide gelten als KI-Marker. Stattdessen: Komma, Klammer, Punkt,
  Doppelpunkt oder Gedankenstrich nur als normaler Bindestrich mit
  Leerzeichen wenn unvermeidbar.
- Sachlich, präzise, keine ChatGPT-Phrasen.

## Projekt-Kontext

- Begleitseite zum Buch „Der Wahrheitskomplex" von Norbert Häring (Westend
  Verlag, 2026).
- Hosting: GitHub Pages, Domain `wahrheitskomplex.de`, DNS bei All-Inkl.
- Stack: Astro 6 + Tailwind 4. Static-Build, kein Tracker.
- CMS: Decap unter `/admin/`, OAuth-Proxy auf Cloudflare Workers.
- Auto-Sync via GitHub Actions täglich 6:30 CET, schreibt PRs (keine
  Direct-Pushes auf main).

## Beteiligte

- **Ralph (Sui)**: Technik, Domain, Hosting.
- **Norbert Häring**: Inhalte, Autor des Buchs. Bekommt Anfragen via Mail.
- **Henry**: Admin bei All-Inkl, macht DNS-Änderungen im KAS.

## Operations- und Bedienungsdokumente

- `OPERATIONS.md`: Setup und Wartung (DNS, OAuth, Secrets, Rollback).
- `BEDIENUNGSANLEITUNG-NORBERT.md`: Für Norbert, wie er Inhalte pflegt.
- `README.md`: Allgemeine Projekt-Übersicht.
