# Redaktions-System (Decap CMS)

Die Site nutzt **Decap CMS** als Pflegewerkzeug — eine git-basierte
Redaktionsoberfläche. Edits laufen über GitHub-Pull-Requests, Netlify
deployt automatisch beim Merge.

## Wer wann was tut

| Rolle | Aufgabe |
|---|---|
| **Häring** | Inhalte pflegen — Beiträge, Faktenchecks, Akteurs-Profile |
| **Sui** | Reviews + Merges der Pull-Requests, technische Pflege |

## Einmaliges Setup (TODO Sui)

Stand: aktuell ist das Projekt **nur lokal** in `/Users/ralphsuikat/code/wahrheitskomplex-de`. Die CMS-Files (`public/admin/`) sind da, funktionieren aber erst nach folgenden Schritten.

### 1 · GitHub-Repo anlegen + push

```bash
# Neues, privates Repo auf github.com erstellen (z.B. ralphsuikat/wahrheitskomplex-de).
# Dann:
cd /Users/ralphsuikat/code/wahrheitskomplex-de
git remote add origin git@github.com:ralphsuikat/wahrheitskomplex-de.git
git push -u origin main
```

### 2 · Netlify-Site mit GitHub verbinden

Im Netlify-Dashboard:
- Site Settings → Build & Deploy → Continuous Deployment → Link site to Git
- GitHub-Repo `wahrheitskomplex-de` auswählen
- Build-Command: `npm run build`
- Publish-Dir: `dist`

Damit committet jeder CMS-Edit ins Repo, Netlify baut automatisch.

### 3 · Netlify Identity aktivieren

Im Netlify-Dashboard:
- Site Settings → Identity → **Enable Identity**
- Registration: **Invite only** (sonst kann jeder ein Konto anlegen)
- External providers (optional): Google, GitHub aus, falls Häring nur per Mail will

### 4 · Git Gateway aktivieren

Same Dashboard:
- Identity → Services → **Enable Git Gateway**

Damit kann Decap im Namen des angemeldeten Users committen, ohne dass jeder Editor einen GitHub-Account braucht.

### 5 · Häring einladen

Im Netlify-Dashboard:
- Identity → **Invite users** → Häringes Mail-Adresse eintragen
- Häring bekommt eine Mail mit Invite-Link → klickt → wählt Passwort → ist drin

### 6 · Erster Test

- Häring öffnet `https://wahrheitskomplex.de/admin/`
- Loggt sich ein
- Erstellt einen Test-Beitrag in einer Collection
- Sui bekommt PR-Notification auf GitHub
- Sui merged → Netlify deployt → neuer Beitrag live

---

## Pflegeanleitung für Häring (Kurzfassung)

### Zugang
- URL: **`https://wahrheitskomplex.de/admin/`** (oder vor Domain-Umstellung: `https://wahrheitskomplex.netlify.app/admin/`)
- Login mit Mail/Passwort aus der Einladung

### Drei Sammlungen aktuell pflegbar

**1. Im Gespräch** — neue Interviews, Videos, Rezensionen, Podcasts
- Neuer Eintrag → Felder ausfüllen → „Save"
- YouTube-Videos: nur die ID eintragen (bei `youtube.com/watch?v=ABC123` ist die ID `ABC123`). Vorschaubild wird automatisch geholt.
- Bei externem Artikel/Video: einfach die URL eintragen, die Seite zieht das og:image-Bild beim nächsten Build.

**2. Faktenchecker im Check** — Faktencheck-Fälle
- Zwei Darstellungs-Varianten: entweder „Zusammenfassung" (Fließtext) oder die drei Felder „Behauptung / Urteil / Realität". Nur eine ausfüllen.

**3. Atlas-Akteure** — NGOs / Stiftungen / Faktenchecker
- Häkchen „Volltext-Profil" entscheidet, ob ein eigenes Detail-Profil unter `/atlas/NAME` erzeugt wird oder die Karte nur auf Härings Tiefenartikel verweist.
- Markdown-Body unten ausfüllen, wenn Volltext aktiv ist.

### Editorial Workflow
Edits gehen als **Draft → Review → Ready → Published** durch.

- Häring klickt „Publish" → es entsteht ein PR
- Sui (oder ein anderer Reviewer) bekommt Notification
- Beim Merge → Netlify deployt
- 30 Sekunden später ist's live

Wenn Häring direkt veröffentlichen soll (ohne Review-Step), in `public/admin/config.yml` `publish_mode` auf `simple` setzen.

### Bilder hochladen
- Im Editor: Drag&Drop in die Media-Library
- Dateien landen unter `/uploads/`
- Direkt im Inhalt referenzierbar

### Was Häring NICHT über das CMS pflegt (aktuell)
- **Chronik** — liegt in TypeScript-Datei (`src/data/chronik.ts`), 130+ Einträge. Migration nach Markdown ist Phase 2.
- **Definitionen** („Was ist…?") — TS-Datei
- **Glossar** — TS-Datei
- **Recherchen** — TS-Datei (6 statische Karten)
- **Hero-Texte** der Startseite

Diese kann Sui per Code-Edit pflegen. Wenn Häring sie selbst pflegen soll, in Phase 2 ebenfalls migrieren.

---

## Technische Hinweise

### Schema-Änderungen
- Die Definition liegt in `public/admin/config.yml` (Decap)
- UND in `src/content.config.ts` (Astro/Zod, für die Build-Validierung)
- Beide müssen konsistent sein

### Fallback ohne CMS
Solange das CMS nicht aktiviert ist (Schritte 1-5 oben nicht durchgeführt), kann jeder mit Repo-Zugang die Markdown-Files direkt unter `src/content/` editieren und committen. CMS ist nur ein UX-Layer obendrauf.

### Privacy
Decap CMS und Netlify Identity laden NUR auf `/admin/` externe Scripts (von unpkg.com bzw. netlify.com). Die öffentliche Site bleibt vollständig drittanbieter-frei.
