# Migration zu Cloudflare Pages

## Schritt 1: Pages-Projekt anlegen (du)

1. Im Cloudflare Dashboard auf **Workers & Pages** → **Pages** → **Connect to Git**
2. **GitHub** als Provider wählen → ggf. Cloudflare zu deinem Account autorisieren
3. Repository auswählen: **`ai-sui/wahrheitskomplex.de`**
4. **Begin setup**

## Schritt 2: Build-Konfiguration

| Feld | Wert |
|---|---|
| **Project name** | `wahrheitskomplex` (oder eigener Wunsch) |
| **Production branch** | `main` |
| **Framework preset** | **Astro** (sollte automatisch erkannt werden) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | (leer lassen) |

**Environment variables**:
- `NODE_VERSION` = `22`

**Save and Deploy** klicken.

## Schritt 3: Erste Erfolgskontrolle

- Cloudflare baut ~1-2 Min
- Du bekommst eine `*.pages.dev`-URL (z.B. `wahrheitskomplex.pages.dev`)
- Öffnen → Site sollte exakt wie auf Netlify aussehen
- Wenn ja: alles gut. Wenn nein: Build-Log in Cloudflare Pages checken

## Schritt 4: Auto-Deploys

Sind ab sofort an. Jeder Push auf `main` (von dir, von der Auto-Sync-Action, von Decap-CMS-Merges) baut automatisch neu.

## Schritt 5 (später, wenn Domain steht): Custom Domain

Cloudflare Dashboard → Pages-Projekt → **Custom domains** → `wahrheitskomplex.de` hinzufügen → Cloudflare gibt dir die DNS-Records, die bei Norberts Provider eingetragen werden müssen.

## Was passiert mit Netlify?

Aktuelle Netlify-Site bleibt für den Moment live. Wenn Cloudflare läuft, kannst du Netlify-Site löschen (Netlify-Dashboard → Site Settings → Danger zone). Kein Eile — auch beide parallel ist okay.

## CMS-OAuth — folgt im nächsten Schritt

Wir hosten den OAuth-Proxy als Cloudflare Worker (15 Min Setup auf meiner Seite), du musst nur 2 Werte (Client ID + Secret) in Cloudflare als Worker-Secrets eintragen. Anleitung folgt, sobald Pages-Setup steht.
