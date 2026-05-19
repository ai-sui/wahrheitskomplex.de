# Operations — Playbook für wiederkehrende Aufgaben

Dieses Dokument ersetzt zukünftiges Raten. Jeder Setup-Schritt steht hier
mit verifizierten Klick-Pfaden und Verantwortlichkeiten.

---

## OAuth-Worker für Decap CMS (jetzt fällig)

**Ziel:** Decap CMS (unter `/admin/`) authentifiziert via GitHub. Statt
dem kaputten Netlify-OAuth-Provider hosten wir den OAuth-Vermittler selbst
als Cloudflare Worker.

**Code:** liegt bereits in `cms-oauth/` (das hat Claude vorbereitet).

### Was du tun musst (Sui · ~5 Min)

#### Schritt 1: Wrangler installieren (einmalig, falls noch nicht da)

```bash
npm install -g wrangler
wrangler login          # öffnet Browser, du loggst dich bei Cloudflare ein
```

Wenn du `wrangler` schon hast: `wrangler whoami` zeigt, ob du eingeloggt bist.

#### Schritt 2: Worker deployen

```bash
cd /Users/ralphsuikat/code/wahrheitskomplex-de/cms-oauth
wrangler deploy
```

Output am Ende zeigt dir die URL:
```
Published wahrheitskomplex-cms-auth
  https://wahrheitskomplex-cms-auth.<dein-konto>.workers.dev
```

**Diese URL kopierst du dir** — wir brauchen sie gleich.

#### Schritt 3: GitHub-Client-ID + Secret als Worker-Secrets setzen

```bash
wrangler secret put GITHUB_CLIENT_ID
# fragt nach dem Wert, du fügst die Client-ID ein, Enter
# Wert: 0v23lin4uRyr3GRZ92Xr  (deine bestehende OAuth-App)

wrangler secret put GITHUB_CLIENT_SECRET
# fügst dein neues Secret ein, Enter
```

(Alternative ohne CLI: Cloudflare-Dashboard → Worker → Settings → Variables and Secrets → Add → Type: Secret)

#### Schritt 4: GitHub-OAuth-App Callback-URL ändern

In github.com → Settings → Developer settings → OAuth Apps → **Wahrheitskomplex CMS**:

- **Authorization callback URL** ändern von
  `https://api.netlify.com/auth/done`
  auf
  `https://wahrheitskomplex-cms-auth.<dein-konto>.workers.dev/callback`

- **Update application** klicken.

#### Schritt 5: Sag Claude die Worker-URL

Sobald Worker läuft, sagst du Claude:
> „Worker-URL: https://wahrheitskomplex-cms-auth.<dein-konto>.workers.dev"

Claude passt dann `public/admin/config.yml` an und pusht. Cloudflare baut neu.

#### Schritt 6 (Test, ~1 Min)

`/admin/` aufrufen → **„Login with GitHub"** klicken → autorisieren → drin.

---

## Domain wahrheitskomplex.de umstellen (folgt später)

**Voraussetzung:** Norbert teilt Sui die Zugangsdaten zum DNS-Provider seiner Domain.

### Was du tun musst (sobald Daten da)

1. **Cloudflare Pages-Projekt** (oder Worker) → Custom Domains → **wahrheitskomplex.de** hinzufügen
2. **DNS-Records** in Norberts Provider-Dashboard eintragen — Cloudflare zeigt dir exakte Werte (typisch: CNAME oder A-Record auf einen Cloudflare-Endpoint)
3. **Warten** (5 Min bis 24 h) bis DNS propagiert
4. **Claude sagen**: „Domain steht" — Claude passt `astro.config.mjs` (site:) und sitemap-/JSON-LD-URLs an

---

## Neuen Inhalt veröffentlichen

### Variante A: über das CMS (für Norbert)

`/admin/` → Login → Sammlung wählen → Eintrag anlegen → Publish.

### Variante B: direkt im Repo (für Sui)

- Markdown-File unter `src/content/{actors,faktenchecks,medien}/` erstellen
- `git add` + `git commit` + `git push`
- Cloudflare baut automatisch

### Variante C: Auto-Sync (für Häring-Blog-Posts)

GitHub Action `auto-sync.yml` läuft täglich 6:30 CET. Bei neuen Inhalten auf norberthaering.de:
- erzeugt PR mit Label `auto-sync`
- Sui review't, klickt Merge
- Cloudflare deployt

Manuell auslösen: GitHub → Actions → „Auto-Sync von norberthaering.de" → „Run workflow".

---

## OAuth-Secret rotieren

Wenn das Client Secret kompromittiert ist:

1. GitHub → OAuth Apps → Wahrheitskomplex CMS → **Generate a new client secret** → kopieren
2. Altes Secret in der OAuth-App löschen
3. Im Cloudflare-Worker neu setzen:
   ```bash
   cd cms-oauth
   wrangler secret put GITHUB_CLIENT_SECRET
   ```

---

## Custom-Domain umziehen

(später dokumentiert, sobald Domain steht)
