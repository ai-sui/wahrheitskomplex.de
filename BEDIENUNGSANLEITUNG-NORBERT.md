# Bedienungsanleitung — Wahrheitskomplex.de

Stand: Mai 2026

Dieses Dokument erklärt dir, was wahrheitskomplex.de ist, wie du selbst
Inhalte pflegen kannst und wie du im Notfall an die Seite herankommst,
auch wenn Sui (der technische Betreuer) gerade nicht erreichbar ist.

---

## 1. Was diese Seite ist

**wahrheitskomplex.de** ist die Begleitseite zum Buch *Der Wahrheitskomplex*
(Westend Verlag, 2026). Sie zeigt:

- **Atlas-Akteure** — die NGOs, Stiftungen und Faktenchecker, die im Buch
  thematisiert werden, in Kurz- oder Volltext-Profilen
- **Faktenchecker im Check** — dokumentierte Fälle, in denen Faktenchecker
  fehlgegangen sind
- **Im Gespräch** — aktuelle Interviews, Videos, Rezensionen und Podcasts
  zum Buch
- **Chronik** — laufende Ereignisse im „Wahrheitskomplex" seit Drucklegung
  im Februar 2026
- **Recherchen** — vertiefende Beiträge von Norbert Häring

Die Seite ergänzt das Buch, läuft fortwährend weiter und kann jederzeit
um neue Inhalte ergänzt werden.

## 2. Wer pflegt was

| Person | Verantwortung |
|---|---|
| **Norbert Häring** | Inhalt (Artikel, Profile, Bewertungen) |
| **Sui** *(„ai-sui")* | Technik (Hosting, Code, Updates) |
| **Auto-Sync** *(automatisches Skript)* | Übernimmt neue Beiträge von norberthaering.de täglich von selbst |

Du musst nichts Technisches selbst machen. Wenn der Auto-Sync etwas verpasst
oder wenn du gezielt etwas hinzufügen / ändern willst, gibt es zwei Wege —
siehe Abschnitt 3 und 4.

---

## 3. Inhalte ändern — Variante A (empfohlen, kein technisches Wissen nötig)

So machst du Änderungen, ohne ein Backend zu bedienen: du schreibst Claude,
was du willst, Claude formuliert dir das Markdown, du mailst es Sui.

### 3.1 Claude.ai-Konto anlegen (einmalig, 2 Min)

1. Öffne <https://claude.ai/signup>
2. Wähle „Continue with Google" (wenn du ein Gmail-Konto hast — einfachster Weg)
   **oder** „Continue with email" und eine beliebige E-Mail-Adresse
3. Bestätige die E-Mail (Anthropic schickt dir einen Link)
4. Fertig — du bist drin

**Welches Abo brauchst du?** Der **kostenlose Plan (Free) reicht**.
Du kannst pro Tag eine zweistellige Zahl an Nachrichten an Claude schicken — mehr als wir
für die paar Einträge pro Woche je brauchen. Kein Abo, keine Kreditkarte nötig.
Falls Claude dich irgendwann auf ein Limit hinweist („You'll be able to send more
messages in X hours"), wartest du einfach ein paar Stunden — oder schreibst Sui kurz Bescheid.

### 3.2 So gehst du vor

1. Öffne <https://claude.ai> (Login mit deinem Account von oben)
2. Klick links oben **„New Chat"** / **„Neuer Chat"**
3. Wähle unten in Abschnitt 7 das passende Template (kopieren mit ⌘C bzw. Strg+C)
4. Füge es im Chat-Fenster ein, ersetze die `<…>`-Platzhalter mit deinen Angaben
5. Schick die Nachricht ab — Claude antwortet mit einem fertigen Text-Stück
6. Kopier diesen fertigen Text und schick ihn per Mail an Sui — er bringt es online

Du musst nichts klicken, nichts hochladen, nichts auf GitHub tun. Nur schreiben und mailen.

### 3.3 Was du an Sui schickst

Eine Mail mit:

- **Betreff:** „Neuer Eintrag: \<Titel\>"
- **Inhalt:** das fertige Markdown-Stück, das Claude dir geliefert hat

Sui macht den Rest (15 Sekunden: in den richtigen Ordner legen, committen, fertig).
Die Seite ist 30 Sekunden später live.

### 3.4 Kleine Korrekturen ohne Claude

Wenn du an einem bestehenden Eintrag etwas ändern willst, schreib Sui einfach
in einer normalen Mail:

> „Im Atlas-Eintrag zur Bertelsmann Stiftung bitte den Satz 'X' ersetzen
> durch 'Y'. Quelle: …"

Sui macht das direkt.

---

## 4. Inhalte ändern — Variante B (Direkt im CMS, optional)

Falls du selbst mal etwas ohne Umweg über Sui einstellen willst — etwa,
wenn er gerade nicht erreichbar ist — gibt es ein Web-Backend („CMS")
direkt auf der Seite.

### 4.1 Voraussetzungen (einmaliges Setup)

- Ein **GitHub-Konto** (kostenlos)
- Sui muss dich **als Mitarbeiter im Repo** einladen — Mail an Sui mit deinem
  GitHub-Benutzernamen genügt

Lege ein GitHub-Konto an unter <https://github.com/signup> falls noch nicht
geschehen. Du musst dort nichts tun — du brauchst es nur, um dich am CMS
anzumelden.

### 4.2 Login

1. Öffne in deinem Browser die Seite **/admin/** — also entweder
   - `https://wahrheitskomplex.de/admin/` (sobald die Domain umgezogen ist)
   - oder bis dahin `https://wahrheitskomplex.github-survival631.workers.dev/admin/`
2. Klick „Mit GitHub einloggen"
3. Erlaube den Zugriff auf dein GitHub-Konto (einmalig)
4. Du bist im CMS — du siehst drei Sammlungen:
   - **Im Gespräch**
   - **Faktenchecker im Check**
   - **Atlas-Akteure**

### 4.3 Einen neuen Eintrag erstellen

1. Wähle links die passende Sammlung
2. Klick oben rechts **„Neue(r/s) Beitrag"**
3. Fülle die Felder aus
4. Klick **„Speichern"** (Entwurf) oder direkt **„Publish"** (veröffentlichen)

Bei „Publish" erzeugt das CMS automatisch einen Pull-Request im GitHub-Repo.
Sui (oder du, falls Maintainer-Rechte) muss diesen PR mit einem Klick mergen,
dann ist der Eintrag in ca. 30 Sekunden auf der Seite sichtbar.

---

## 5. Wo die Seite technisch liegt

| Bestandteil | Wo | Was sie tut |
|---|---|---|
| **Domain** | `wahrheitskomplex.de` (bei All-Inkl als Registrar) | Was du in die Adresszeile tippst |
| **Hosting** | Cloudflare (Workers) | Liefert die Seite aus, wenn jemand sie aufruft |
| **Code & Inhalte** | GitHub (`github.com/ai-sui/wahrheitskomplex.de`) | Versions-Historie, „Single source of truth" |
| **CMS-Login** | Cloudflare Worker (OAuth-Proxy) | Authentifiziert dich gegenüber GitHub, wenn du `/admin/` benutzt |
| **Mail-Postfächer `@wahrheitskomplex.de`** | All-Inkl (unverändert) | Bleibt nach dem Domain-Umzug funktional |

**Was das praktisch heißt:**

- Selbst wenn ein einzelner Dienst ausfällt, sind die Inhalte nicht weg —
  alles, was auf der Seite steht, liegt in Klartext (Markdown) im GitHub-Repo
- Backups sind automatisch durch GitHub
- Die Seite ist statisch — kein Risiko durch Datenbank-Schäden, Hacks etc.

---

## 6. Wenn Sui nicht erreichbar ist

Drei realistische Szenarien:

### 6.1 „Sui ist im Urlaub" (1–2 Wochen)

**Du musst nichts tun.** Die Seite läuft autonom weiter, auch ohne Sui.
Der Auto-Sync holt täglich neue Beiträge von norberthaering.de. Wenn du
manuell etwas einstellen willst:

- Variante A (Mail an Sui) — Mail bleibt einfach im Posteingang, wird nach
  Rückkehr abgearbeitet
- Variante B (CMS direkt unter `/admin/`) — sofort wirksam, vorausgesetzt
  du hast den GitHub-Zugang aus Abschnitt 4.1 vorab eingerichtet

**Empfehlung:** Richte den CMS-Zugang einmal jetzt ein, auch wenn du ihn nie
nutzt. Damit hast du die Option.

### 6.2 „Sui ist länger weg" (mehrere Wochen)

**Inhalte:** Variante B (CMS direkt) reicht aus. Du publishst, der PR wird
automatisch gemerged (oder du klickst „Merge" auf GitHub.com selbst).

**Wenn etwas Technisches nicht funktioniert** (Seite offline, Fehlermeldung,
o.ä.):

- E-Mail an [Backup-Kontakt, von Sui auszufüllen]
- oder an einen anderen Entwickler deines Vertrauens. Der Code liegt
  vollständig auf GitHub, jeder Web-Entwickler kann übernehmen
  (Astro + Cloudflare Workers — gängige Technologien)

### 6.3 „Sui ist dauerhaft weg" (Notfall)

Der Code, die Inhalte und die Anleitungen stehen vollständig auf GitHub.
Jeder Entwickler kann:

1. Das Repo klonen (`git clone github.com/ai-sui/wahrheitskomplex.de`)
2. Die Anleitungen in `OPERATIONS.md` lesen
3. Die Seite in seinen eigenen Cloudflare-Account deployen (Anleitung
   ebenfalls in `OPERATIONS.md`)
4. Die DNS auf den neuen Host umstellen (Admin-Aktion im KAS)

**Was du dafür brauchst:**
- Den GitHub-Repo-Zugang (siehe 4.1)
- Den DNS-/KAS-Zugang bei All-Inkl (hat der Admin)

Solange diese zwei Zugänge bestehen, geht der Betrieb weiter — egal, wer
technisch zuständig ist.

---

## 7. Templates für Claude

Hier die drei Vorlagen zum Kopieren-und-Einfügen in Claude.ai
(siehe Abschnitt 3.2).

### Template 1: Neuer Beitrag „Im Gespräch" (Interview, Video, Podcast, Rezension)

```
Bitte erstelle den Markdown-Eintrag für einen neuen Beitrag in der Sammlung
"Im Gespräch" auf wahrheitskomplex.de.

Format des Beitrags: <Video / Podcast / Interview (Text) / Rezension / Vortrag>
Titel: <z.B. "Der Wahrheitskomplex — Interview mit XY">
Interviewer / Autor: <Name>
Medium / Plattform: <z.B. Multipolar, Berliner Zeitung, Barucker Substack, YouTube>
URL: <https://...>
YouTube-ID (nur bei YouTube): <abc123 — oder leer lassen>
Datum: <YYYY-MM-DD>
Dauer in Minuten (optional): <85 — oder leer lassen>
Hinter Bezahlschranke?: <ja / nein>
Themen: <Komma-getrennt, z.B. Pandemie, Klima, DSA & NetzDG, Hass und Hetze>
Sprache: <Deutsch / English>
Kurzbeschreibung / Pullquote (1–3 Sätze): <…>

Bitte gib mir das fertige Markdown-File mit YAML-Frontmatter zurück,
genau im Format der bestehenden Einträge in src/content/medien/.
Schlag mir auch einen Dateinamen (slug.md) vor.
```

### Template 2: Neuer Faktencheck-Fall

```
Bitte erstelle den Markdown-Eintrag für einen neuen Faktencheck-Fall in der
Sammlung "Faktenchecker im Check" auf wahrheitskomplex.de.

Titel des Falls: <kurz, prägnant>
Welcher Faktenchecker?: <Correctiv / dpa-Faktencheck / ARD-Faktenfinder / ZDF / AFP / …>
Atlas-Akteur-Slug (optional): <z.B. correctiv, dpa-faktencheck — wenn der Faktenchecker bei uns ein Profil hat>
Datum: <YYYY-MM-DD>
URL des Häring-Tiefenartikels: <https://norberthaering.de/...>
Themen: <Komma-getrennt>

— Variante A (kompakte Form):
Zusammenfassung (3–5 Sätze, Fließtext): <…>

— Variante B (Drei-Block-Form, wenn keine Zusammenfassung):
Behauptung: <Was wurde behauptet?>
Urteil: <Welches Urteil hat der Faktenchecker gefällt?>
Realität: <Was zeigt deine Recherche?>

Quellen (eine pro Zeile):
- <URL oder Beleg>
- <URL oder Beleg>

Bitte gib mir das fertige Markdown-File mit YAML-Frontmatter zurück,
genau im Format der bestehenden Einträge in src/content/faktenchecks/.
Schlag mir auch einen Dateinamen (slug.md) vor.
```

### Template 3: Neuer Atlas-Akteur (NGO, Stiftung, Faktenchecker, Behörde)

```
Bitte erstelle den Markdown-Eintrag für einen neuen Atlas-Akteur auf
wahrheitskomplex.de.

Name: <z.B. "Bertelsmann Stiftung">
Kategorie (Freitext): <z.B. "Stiftung", "Faktencheck", "Think Tank / NATO-Umfeld">
Akteurstyp: <Behörde / Faktenchecker / Stiftung / Plattform / Medienverbund / NGO / Think Tank / Mittler / NGO / Stiftung / Think Tank / NGO / Geheimdienst-nah>
Land / Region: <z.B. Deutschland, USA, EU>
Gegründet (optional): <Jahreszahl>
Themen: <Komma-getrennt>

Kurzbeschreibung (eine Zeile für die Karte): <…>
Finanzierung (2–4 Sätze): <…>
Reichweite (optional, 1–2 Sätze): <…>
Kernkritik (aus Buch / Recherche, 3–6 Sätze): <…>
Stellungnahme des Akteurs (optional): <…>

Buch-Kapitel (optional): <z.B. "Kapitel 5 — Wahrheitskontrolle im Dienste der NATO">
Häring-Tiefenartikel (URL, optional): <https://...>
Liber-Net-Profil (URL, optional): <https://...>

Quellen (Titel, URL, Verlag, Datum — eine pro Zeile):
- <Titel | URL | Publisher | YYYY>
- <Titel | URL | Publisher | YYYY>

Volltext-Profil?: <ja / nein>
— Wenn ja, hier der ausführliche Text (mehrere Absätze, Markdown):
<…>

Sortierung (kleiner = vorn, Standard 100): <Zahl>

Bitte gib mir das fertige Markdown-File mit YAML-Frontmatter zurück,
genau im Format der bestehenden Einträge in src/content/actors/.
Schlag mir auch einen Dateinamen (slug.md) vor.
```

---

## 8. Kontakt

- **Inhaltliche Fragen** (Beiträge, Korrekturen): Mail an Sui →
  [Sui-Mail-Adresse hier einfügen]
- **Technische Probleme** (Seite offline, Login geht nicht, etc.):
  ebenfalls Mail an Sui
- **Im Notfall** (Sui länger nicht erreichbar): [Backup-Kontakt hier einfügen]

---

## 9. Häufige Fragen

**Was, wenn ich etwas Falsches publish? Kann ich es rückgängig machen?**

Ja. Jede Änderung ist in der GitHub-Versions-Historie protokolliert. Mail an Sui:
„Bitte den letzten Stand der Akteur-XY-Seite wiederherstellen" — er hat einen
Knopf, der das in 10 Sekunden macht.

**Sehe ich, wer wann was geändert hat?**

Ja, alles ist in der GitHub-Historie nachvollziehbar (von außen frei einsehbar
unter <https://github.com/ai-sui/wahrheitskomplex.de/commits/main>).

**Was, wenn die Seite mal nicht erreichbar ist?**

Cloudflare hat eine Verfügbarkeit von ~99,99 %. Wenn die Seite trotzdem mal
weg ist: Mail an Sui. Inhalte bleiben in jedem Fall auf GitHub erhalten.

**Wie viel kostet das Hosting?**

Momentan 0 Euro pro Monat (Cloudflare-Free-Tier reicht für die zu erwartenden
Zugriffe). Falls die Seite jemals so viel Traffic bekommt, dass eine
Bezahl-Variante nötig wird, sind das ca. 5–10 USD/Monat.
