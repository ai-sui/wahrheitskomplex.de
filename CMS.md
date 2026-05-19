# Redaktions-System

Die Site nutzt **Decap CMS** (Open Source, kostenlos) für manuelle Pflege
und einen **Auto-Sync** aus norberthaering.de für die Hauptlast der
Inhalte.

## Architektur in einem Satz

> Norbert publiziert wie gewohnt auf seinem Blog. Ein nächtlicher
> GitHub-Action-Cron erzeugt aus neuen Beiträgen automatisch
> Markdown-Stubs und schiebt sie als Pull-Request ins Repo. Sui (oder
> ein anderer Reviewer) prüft kurz, klickt Merge — und 30 Sekunden
> später ist's live.

| Komponente | Verantwortlich | Aufwand pro neuem Eintrag |
|---|---|---|
| Härings Blog (Quelle) | Norbert | wie immer, kein Extra |
| Auto-Sync GitHub Action | (läuft automatisch) | 0 |
| PR-Review + Merge | Sui | ~30 Sek pro Eintrag |
| Decap CMS unter /admin/ | Sui (bei Bedarf) | für eigene Inhalte |

---

## Einmaliges Setup (TODO Sui)

### 1 · GitHub-Repo anlegen + push

Auf github.com privates Repo anlegen, dann:

```bash
cd /Users/ralphsuikat/code/wahrheitskomplex-de
git remote add origin git@github.com:DEIN-USER/wahrheitskomplex-de.git
git push -u origin main
```

### 2 · `public/admin/config.yml` anpassen

Eine Zeile editieren:

```yaml
backend:
  name: github
  repo: DEIN-USER/wahrheitskomplex-de   # ← hier deinen GitHub-User eintragen
  branch: main
```

Dann commit + push.

### 3 · Netlify mit GitHub-Repo verbinden

Im Netlify-Dashboard:
- Site Settings → **Build & Deploy** → **Continuous Deployment** → **Link site to Git**
- GitHub-Repo auswählen
- Build-Command: `npm run build` · Publish-Dir: `dist`

Ab jetzt deployt Netlify automatisch bei jedem Push (einschließlich CMS-Edits und Auto-Sync-PRs).

### 4 · GitHub-OAuth-App anlegen

GitHub → rechts oben Avatar → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**:

- Application name: `Wahrheitskomplex CMS`
- Homepage URL: `https://wahrheitskomplex.netlify.app` (oder später die echte Domain)
- Authorization callback URL: **`https://api.netlify.com/auth/done`** (genau so, Netlify hostet den OAuth-Proxy gratis)

→ **Register application**.

Auf der nächsten Seite **Client ID** kopieren, dann **Generate a new client secret** → auch **Client Secret** kopieren.

### 5 · OAuth-Daten in Netlify hinterlegen

Netlify-Dashboard → **Site settings** → **Access** → **OAuth** → **Install provider** → **GitHub** → Client ID + Secret einfügen.

(Falls dieser Menüpunkt nicht da ist: in der älteren Netlify-UI heißt er „Authorization providers".)

### 6 · Norbert als Collaborator einladen

Auf GitHub im Repo → **Settings** → **Collaborators** → **Add people** → Norberts GitHub-Username.

Norbert braucht **nur einen ganz normalen GitHub-Account** — nichts Spezielles. Er bekommt eine Mail mit Invite-Link, akzeptiert, fertig.

### 7 · Erster Test

- Norbert öffnet `https://wahrheitskomplex.netlify.app/admin/` (später: `wahrheitskomplex.de/admin/`)
- Klickt „Login with GitHub" → wird zu GitHub umgeleitet → autorisiert → ist drin
- Erzeugt einen Test-Beitrag
- Klickt „Publish" → GitHub-Commit entsteht → Netlify deployt

---

## Pflegeanleitung (für Norbert, Kurzfassung)

### Zugang

URL: `https://wahrheitskomplex.netlify.app/admin/` (später: `wahrheitskomplex.de/admin/`)

Login mit GitHub-Account. Beim ersten Mal: GitHub fragt nach Autorisierung — einmal „Authorize" klicken.

### Drei Sammlungen pflegbar

**1. Im Gespräch** — Interviews, Videos, Rezensionen, Podcasts
- Bei YouTube-Videos: nur die ID eintragen (bei `youtube.com/watch?v=ABC123` ist die ID `ABC123`)
- Vorschaubild wird automatisch geholt

**2. Faktenchecker im Check** — Faktencheck-Fälle
- Zwei Varianten: entweder *Zusammenfassung* (Fließtext) oder *Behauptung/Urteil/Realität* (drei Blöcke). Nur eine ausfüllen.

**3. Atlas-Akteure** — NGOs / Stiftungen
- Häkchen „Volltext-Profil" entscheidet, ob ein eigenes Detail-Profil unter `/atlas/SLUG` erzeugt wird
- Markdown-Body unten ausfüllen, wenn Volltext aktiv

### Editorial Workflow (PR-basiert)

1. Norbert klickt im CMS „Publish" → Decap erzeugt einen Pull-Request
2. Sui (oder ein anderer Reviewer) bekommt Notification
3. Beim Merge → Netlify deployt automatisch
4. ~30 Sekunden später ist der Eintrag live

Wer das nicht will (Norbert publiziert direkt ohne Review): in `public/admin/config.yml` `publish_mode: editorial_workflow` entfernen.

### Bilder hochladen
Drag&Drop in die Media-Library, landet unter `/public/uploads/`.

---

## Auto-Sync (passiert von alleine)

`.github/workflows/auto-sync.yml` läuft täglich um 6:30 Uhr CET und prüft:

| Quelle auf norberthaering.de | Zielsammlung |
|---|---|
| `/wahrheitskomplex/faktenchecks/` | Faktenchecks |
| `/wahrheitskomplex/rezensionen-interviews/` | Im Gespräch |

Wenn neue Beiträge gefunden werden:
- Markdown-Stubs werden erzeugt
- og:image-Vorschaubilder werden gezogen
- Ein Pull-Request wird angelegt, Label `auto-sync`
- Sui ergänzt im PR fehlende Felder (Themen, Host, Pullquote) und merged

**Manuell auslösen**: GitHub-Actions-UI → „Auto-Sync von norberthaering.de" → **Run workflow**.

---

## Was NICHT auto-synct ist (vorerst)

- **Chronik** — liegt als TS-Datei (`src/data/chronik.ts`). 130+ Einträge. Migration nach Markdown ist Phase 2. Für jetzt: Sui pflegt direkt im Code, wenn Norbert was Neues meldet.
- **Definitionen** (`Was ist …?`) — TS-Datei
- **Glossar** — TS-Datei
- **Recherchen** — TS-Datei
- **Hero-Texte** der Startseite

Diese Inhalte ändern sich selten. Sui pflegt sie per Code-Edit oder über das CMS in einer späteren Erweiterung.

---

## Privacy

Decap CMS lädt externes JavaScript **nur auf `/admin/`** (von unpkg.com). Die öffentliche Site bleibt vollständig drittanbieter-frei. Kein Tracker, kein Webfont, kein CDN-Aufruf.

Die Auth-Flow geht direkt zwischen Browser ↔ GitHub ↔ Netlify-OAuth-Proxy — keine zusätzlichen Daten an Dritte.
