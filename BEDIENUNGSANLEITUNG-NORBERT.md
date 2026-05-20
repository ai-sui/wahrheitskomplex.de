# Bedienungsanleitung — Wahrheitskomplex.de

Stand: Mai 2026

Dieses Dokument erklärt dir, was wahrheitskomplex.de ist, wie du selbst
Inhalte pflegst und veröffentlichst, und wie du im Notfall an die Seite
herankommst, falls Sui (der technische Betreuer) nicht erreichbar ist.

**Wichtigste Botschaft:** Du veröffentlichst direkt selbst — Sui muss
nicht mehr für jeden Eintrag tätig werden. Du klickst „Publish", und
30 Sekunden später ist es online.

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
- **Recherchen** — vertiefende Beiträge

Die Seite ergänzt das Buch, läuft fortwährend weiter und kann jederzeit
um neue Inhalte ergänzt werden.

## 2. Wer macht was

| Person | Verantwortung |
|---|---|
| **Norbert Häring** | Inhalt (Artikel, Profile, Bewertungen) — komplett autonom |
| **Auto-Sync** *(automatisches Skript)* | Holt neue Beiträge von norberthaering.de täglich von selbst auf die Seite |
| **Sui** *(„ai-sui")* | Nur noch Technik — wenn etwas Technisches nicht funktioniert |

---

## 3. Einmaliges Setup (10 Minuten)

Bevor du loslegst, musst du einmalig zwei Dinge tun. Danach nie wieder.

### 3.1 GitHub-Konto anlegen

GitHub ist die Plattform, auf der die Inhalte und der Code der Seite
liegen. Du musst GitHub nicht bedienen — du brauchst nur ein Konto,
um dich am CMS einzuloggen.

1. Öffne <https://github.com/signup>
2. E-Mail-Adresse eingeben, Passwort wählen, Username wählen
   (Vorschlag: `norberthaering` oder `n-haering`)
3. Bestätigungs-Mail von GitHub anklicken
4. **Sui deinen GitHub-Username mailen** — er trägt dich als Maintainer
   ins Projekt ein, dann hast du Schreibrechte

### 3.2 Erste Anmeldung im CMS

1. Öffne im Browser:
   - `https://wahrheitskomplex.de/admin/` (sobald die Domain steht)
   - oder solange noch: `https://ai-sui.github.io/wahrheitskomplex.de/admin/`
2. Klick **„Mit GitHub einloggen"**
3. GitHub fragt dich, ob du den Zugriff erlaubst → **„Authorize"**
4. Du bist im CMS und siehst drei Sammlungen:
   - Im Gespräch
   - Faktenchecker im Check
   - Atlas-Akteure

Der Browser merkt sich das. Beim nächsten Mal reicht ein Klick.

---

## 4. Inhalte ändern oder ergänzen

### 4.1 Neuer Eintrag (z.B. ein neues Interview, ein neuer Faktencheck)

1. Wähle links die passende Sammlung (Im Gespräch / Faktenchecker / Atlas-Akteure)
2. Klick oben rechts **„Neue(r/s) Beitrag"** bzw. **„Schnell-Erstellung"**
3. Fülle die Felder aus (Pflichtfelder sind markiert)
4. Klick **„Speichern"** (Entwurf, geht nicht online) **oder** **„Publish"** (sofort online)

Bei „Publish" wird die Änderung direkt veröffentlicht. Cloudflare baut die
Seite in ca. 30 Sekunden neu auf — danach ist dein Eintrag live.

### 4.2 Bestehenden Eintrag ändern

1. Sammlung wählen, gewünschten Eintrag in der Liste anklicken
2. Felder bearbeiten
3. Klick **„Publish"**

### 4.3 Eintrag löschen

1. Eintrag öffnen
2. Oben rechts auf den Drei-Punkte-Knopf (`⋮`) → **„Delete entry"**

### 4.4 Bilder hochladen

Bei Atlas-Akteuren oder Faktenchecks kannst du Bilder hochladen
(Logos, Aufmacherfotos):

1. Im Bearbeitungs-Modus auf das Bild-Feld klicken
2. **„Upload"** oder Datei reinziehen
3. Bild auswählen
4. Speichern

Bilder landen unter `/uploads/` und sind unter
`wahrheitskomplex.de/uploads/<dateiname>` erreichbar.

---

## 5. Wenn du Hilfe beim Schreiben brauchst (optional: Claude.ai)

Manchmal ist es einfacher, einen Text zuerst grob mit Claude zu skizzieren
und dann ins CMS zu kopieren, statt direkt im CMS zu schreiben.
Besonders nützlich für **lange Atlas-Volltext-Profile** mit mehreren
Absätzen.

### 5.1 Claude-Konto anlegen (einmalig, kostenlos)

1. <https://claude.ai/signup>
2. „Continue with Google" (falls Gmail) oder „Continue with email"
3. E-Mail bestätigen, fertig

**Welches Abo?** Der **kostenlose Plan reicht** — du hast pro Tag mehr als
genug Anfragen für die Seite. Kein Abo, keine Kreditkarte nötig.

### 5.2 So nutzt du Claude als Schreibhilfe

1. Auf <https://claude.ai> einloggen
2. **„New Chat"** öffnen
3. In Abschnitt 8 unten das passende Template kopieren
4. Im Chat einfügen, deine Angaben einsetzen
5. Claude antwortet mit einem fertigen Text-Block
6. Diesen Text in die entsprechenden Felder im CMS einfügen
7. Im CMS: Publish

---

## 6. Wo die Seite technisch liegt

| Bestandteil | Wo | Wofür |
|---|---|---|
| **Domain** | `wahrheitskomplex.de` (bei All-Inkl als Registrar) | Was Besucher in die Adresszeile tippen |
| **Hosting** | GitHub Pages (kostenlos) | Liefert die Seite aus, wenn jemand sie aufruft |
| **Code & Inhalte** | GitHub (`github.com/ai-sui/wahrheitskomplex.de`) | Versions-Historie, „Single source of truth" |
| **CMS-Login** | Cloudflare Worker (OAuth-Proxy) | Authentifiziert dich gegenüber GitHub, wenn du `/admin/` benutzt |
| **Mail-Postfächer `@wahrheitskomplex.de`** | All-Inkl (unverändert) | Bleiben funktional |

**Was das praktisch heißt:**

- Selbst wenn ein einzelner Dienst ausfällt, sind die Inhalte nicht weg —
  alles, was auf der Seite steht, liegt in Klartext (Markdown) im GitHub-Repo
- Backups sind automatisch durch GitHub
- Die Seite ist statisch — kein Risiko durch Datenbank-Schäden oder Hacks

---

## 7. Wenn Sui nicht erreichbar ist

### 7.1 „Sui ist im Urlaub" (1–2 Wochen)

**Du musst nichts tun.** Inhalte pflegen geht autonom über das CMS.
Falls die Seite versehentlich offline geht oder das CMS-Login nicht
funktioniert — Mail an Sui, er kümmert sich nach Rückkehr.

Die laufenden Inhalte (neue Blog-Posts) holt der Auto-Sync täglich
selbst — die laufen auch ohne Sui weiter.

### 7.2 „Sui ist länger weg" (mehrere Wochen)

**Inhalte:** Über das CMS publizierst du weiter wie gewohnt.

**Wenn etwas Technisches kaputtgeht** (Seite offline, Fehlermeldung,
CMS-Login geht nicht):

- E-Mail an den Backup-Kontakt: *[Backup-Kontakt von Sui einzutragen]*
- oder an einen anderen Web-Entwickler deines Vertrauens — der Code
  liegt vollständig auf GitHub, jeder kann ihn lesen und anpassen
  (Astro + Cloudflare Workers — gängige Technologien)

### 7.3 „Sui ist dauerhaft weg" (Notfall-Übernahme durch jemand anderen)

Der Code, die Inhalte und alle Anleitungen liegen vollständig auf GitHub.
Jeder Entwickler kann:

1. Das Repo klonen (`git clone github.com/ai-sui/wahrheitskomplex.de`)
2. Die Anleitungen in `OPERATIONS.md` lesen
3. Die Seite in seinen eigenen Cloudflare-Account deployen (Schritte stehen
   in `OPERATIONS.md`)
4. Die DNS bei All-Inkl auf den neuen Host umstellen (Admin-Aktion im KAS)

**Was du dafür brauchst:**
- Den GitHub-Repo-Zugang (hast du nach dem Setup oben)
- Den DNS-/KAS-Zugang bei All-Inkl (hat der Admin)

Solange diese zwei Zugänge bestehen, geht der Betrieb weiter — egal,
wer technisch zuständig ist.

---

## 8. Templates für Claude (optional, siehe Abschnitt 5)

Die folgenden Templates sind eine Schreibhilfe für claude.ai. Nutzen kannst
du sie, wenn du einen Eintrag erst formulieren willst, bevor du ins CMS
gehst. Du **musst** sie nicht benutzen — direkt im CMS zu schreiben geht
genauso.

### Template 1: Neuer Beitrag „Im Gespräch" (Interview, Video, Podcast, Rezension)

```
Bitte erstelle den Inhalt für einen neuen Beitrag in der Sammlung
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

Bitte liefere mir den fertigen Text feldweise, damit ich ihn direkt in
die CMS-Felder kopieren kann. Schlag mir auch einen Slug für die URL vor.
```

### Template 2: Neuer Faktencheck-Fall

```
Bitte erstelle den Inhalt für einen neuen Faktencheck-Fall in der
Sammlung "Faktenchecker im Check" auf wahrheitskomplex.de.

Titel des Falls: <kurz, prägnant>
Welcher Faktenchecker?: <Correctiv / dpa-Faktencheck / ARD-Faktenfinder / ZDF / AFP / …>
Atlas-Akteur-Slug (optional): <z.B. correctiv, dpa-faktencheck>
Datum: <YYYY-MM-DD>
URL des Tiefenartikels: <https://norberthaering.de/...>
Themen: <Komma-getrennt>

— Variante A (kompakte Form):
Zusammenfassung (3–5 Sätze, Fließtext): <…>

— Variante B (Drei-Block-Form, wenn keine Zusammenfassung):
Behauptung: <Was wurde behauptet?>
Urteil: <Welches Urteil hat der Faktenchecker gefällt?>
Realität: <Was zeigt die Recherche?>

Quellen (eine pro Zeile):
- <URL oder Beleg>
- <URL oder Beleg>

Bitte liefere mir den fertigen Text feldweise, damit ich ihn direkt in
die CMS-Felder kopieren kann. Schlag mir auch einen Slug für die URL vor.
```

### Template 3: Neuer Atlas-Akteur (NGO, Stiftung, Faktenchecker, Behörde)

```
Bitte erstelle den Inhalt für einen neuen Atlas-Akteur auf
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

Bitte liefere mir den fertigen Text feldweise, damit ich ihn direkt in
die CMS-Felder kopieren kann. Schlag mir auch einen Slug für die URL vor.
```

---

## 9. Kontakt

- **Technische Probleme** (Seite offline, CMS-Login geht nicht, Fehler-Meldungen):
  Mail an Sui → *[Sui-Mail-Adresse einzutragen]*
- **Im Notfall** (Sui länger nicht erreichbar): *[Backup-Kontakt einzutragen]*

---

## 10. Häufige Fragen

**Was, wenn ich etwas Falsches publish? Kann ich es rückgängig machen?**

Im CMS einfach den Eintrag erneut bearbeiten oder löschen — sofort wirksam.
Falls du eine **frühere Version** wiederherstellen willst (z.B. wenn du
zwei Versionen zurück möchtest): Mail an Sui, er holt die alte Version aus
der GitHub-Historie zurück.

**Sehe ich, wer wann was geändert hat?**

Ja, alles ist in der GitHub-Historie nachvollziehbar (frei einsehbar
unter <https://github.com/ai-sui/wahrheitskomplex.de/commits/main>).
Jede Änderung trägt einen Zeitstempel und den GitHub-Username des
Bearbeiters.

**Was, wenn die Seite mal nicht erreichbar ist?**

GitHub Pages hat eine sehr hohe Verfügbarkeit (>99,9 %). Wenn die Seite
trotzdem mal weg ist: Mail an Sui. Inhalte bleiben in jedem Fall auf
GitHub erhalten — sie können nicht „verloren gehen".

**Wie viel kostet das Hosting?**

0 Euro pro Monat — GitHub Pages ist für Open-Source-Repos dauerhaft
kostenlos und hat für unsere Datenmenge keine relevanten Limits.

**Brauche ich für die Pflege eine bestimmte Software?**

Nein. Alles läuft im Browser (CMS unter `/admin/`, Claude unter `claude.ai`).
Du brauchst keine App installieren, keinen Editor, kein Terminal.
