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

## Architektur (Stand Mai 2026)

| Komponente | Wo |
|---|---|
| **Website** | GitHub Pages — Auto-Deploy aus `main` via `.github/workflows/deploy-pages.yml` |
| **Repo & Inhalte** | github.com/ai-sui/wahrheitskomplex.de |
| **OAuth-Proxy für CMS** | Cloudflare Worker `wahrheitskomplex-cms-auth.github-survival631.workers.dev` |
| **Domain (live)** | wahrheitskomplex.de (DNS bei All-Inkl, A-Records auf GitHub Pages) |
| **Test-URL bis DNS-Migration** | https://ai-sui.github.io/wahrheitskomplex.de/ |
| **Mail @wahrheitskomplex.de** | All-Inkl (unverändert) |

---

## Domain wahrheitskomplex.de auf GitHub Pages umstellen

### Schritt 1 — DNS-Records bei All-Inkl eintragen (Admin)

Folgende DNS-Werte schickst du dem Admin (oder trägst sie selbst im KAS ein):

**Apex `wahrheitskomplex.de` — vier A-Records auf GitHub Pages:**

```
Type    Name    Value             TTL
A       @       185.199.108.153   3600
A       @       185.199.109.153   3600
A       @       185.199.110.153   3600
A       @       185.199.111.153   3600
```

**`www.wahrheitskomplex.de` — CNAME:**

```
Type    Name    Value                            TTL
CNAME   www     ai-sui.github.io.                3600
```

**MX-Records (Mail)** bleiben unverändert bei All-Inkl.

### Schritt 2 — Auf Propagation warten (1 h–24 h)

```bash
dig wahrheitskomplex.de +short
# Sollte ergeben: 185.199.108.153 (+ die anderen drei)
```

### Schritt 3 — CNAME-Datei wieder ins Repo

Während der Vorschau-Phase ist `public/CNAME` bewusst entfernt
(sonst zeigen alle Links auf die unerreichbare Custom-Domain). Sobald
die DNS-Records gesetzt sind:

```bash
echo "wahrheitskomplex.de" > public/CNAME
git add public/CNAME
git commit -m "hosting: CNAME aktivieren — Custom-Domain live"
git push
```

Astro erkennt die Datei automatisch und schaltet `base` auf `/` um.
GitHub Pages validiert daraufhin die Domain und stellt HTTPS um.

Status checken:

```bash
gh api /repos/ai-sui/wahrheitskomplex.de/pages | jq '{cname, status, protected_domain_state}'
```

`cname: "wahrheitskomplex.de"` und `status: "built"` = fertig.

---

## Neuen Inhalt veröffentlichen

### Variante A — Norbert publiziert direkt im CMS

`/admin/` → Login → Sammlung wählen → Eintrag anlegen → **Publish**.

Decap commitet wegen `publish_mode: simple` direkt auf `main`. GitHub
Pages baut automatisch — in 30–60 Sek ist die Änderung live.

### Variante B — Direkt im Repo (für Sui)

- Markdown-File unter `src/content/{actors,faktenchecks,medien}/` erstellen
- `git add` + `git commit` + `git push`
- GitHub Pages baut automatisch

### Variante C — Auto-Sync (für Häring-Blog-Posts)

GitHub Action `auto-sync.yml` läuft täglich 6:30 CET. Bei neuen Inhalten auf norberthaering.de:
- erzeugt PR mit Label `auto-sync`
- Sui review't, klickt Merge
- GitHub Pages deployt automatisch

Manuell auslösen: GitHub → Actions → „Auto-Sync von norberthaering.de" → „Run workflow".

---

## OAuth-Secret rotieren

Wenn das Client Secret kompromittiert ist:

1. GitHub → OAuth Apps → Wahrheitskomplex CMS → **Generate a new client secret** → kopieren
2. Altes Secret in der OAuth-App löschen
3. Im Cloudflare-Worker neu setzen — **per printf-Pipe, NICHT interaktiv:**
   ```bash
   cd cms-oauth
   printf 'DER_NEUE_WERT' | wrangler secret put GITHUB_CLIENT_SECRET
   ```

### Warum printf statt interaktiv?

Beim interaktiven `wrangler secret put` (ohne Pipe) tippt/pastet man den Wert in einen Prompt — und dabei können
**unsichtbar Zeichen verloren gehen** (Trunkierung beim Paste, Leerzeichen, Zeilenumbrüche).
Genau das ist uns beim Erst-Setup zweimal passiert:

- **Client-ID:** letztes `r` fehlte → GitHub-404 bei Login
- **Client Secret:** kompletter Wert falsch → "Invalid state key" / Endlosschleife

Verifizieren, dass der Wert korrekt gesetzt wurde, geht so:

```bash
# Was schickt der Worker tatsächlich an GitHub?
curl -sI 'https://wahrheitskomplex-cms-auth.github-survival631.workers.dev/auth?provider=github&site_id=wahrheitskomplex.github-survival631.workers.dev' \
  | grep -i '^location'
# Erwartung: location: https://github.com/login/oauth/authorize?client_id=<VOLLSTÄNDIGE_ID>&...
```

### Debug-Logging temporär aktivieren

Wenn der Login-Flow wieder bricht, kann man in `cms-oauth/src/index.js` in `handleCallback`
temporär `console.log(...)` einfügen (was rein/raus geht), redeployen, und mit
`wrangler tail` live mitlesen. **Nicht vergessen, das wieder zu entfernen, bevor man fertig ist —
sonst landen Tokens in den Logs.**

---

## Custom-Domain umziehen

(später dokumentiert, sobald Domain steht)
