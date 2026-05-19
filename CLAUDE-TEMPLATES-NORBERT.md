# Claude-Templates für Norbert

So pflegst du Inhalte auf wahrheitskomplex.de, ohne ein technisches Backend zu bedienen.

---

## Vorab: Claude.ai-Konto anlegen (einmalig, 2 Min)

1. Öffne https://claude.ai/signup
2. Wähle „Continue with Google" (wenn du ein Gmail-Konto hast — einfachster Weg)
   **oder** „Continue with email" und eine beliebige E-Mail-Adresse
3. Bestätige die E-Mail (Anthropic schickt dir einen Link)
4. Fertig — du bist drin

### Welches Abo brauchst du?

**Der kostenlose Plan (Free) reicht für unseren Workflow vollständig.**
Du kannst pro Tag eine zweistellige Zahl an Nachrichten an Claude schicken — mehr als wir
für die paar Einträge pro Woche je brauchen. Kein Abo, keine Kreditkarte nötig.

Falls Claude dich irgendwann auf ein Limit hinweist („You'll be able to send more
messages in X hours"), wartest du einfach ein paar Stunden — oder schreibst Sui kurz Bescheid.

---

## So funktioniert's

1. Öffne https://claude.ai (Login mit deinem Account von oben)
2. Klick links oben „New Chat" / „Neuer Chat"
3. Wähle unten das passende Template (kopieren mit ⌘C bzw. Strg+C)
4. Füge es im Chat-Fenster ein, ersetze die `<…>`-Platzhalter mit deinen Angaben
5. Schick die Nachricht ab — Claude antwortet mit einem fertigen Text-Stück
6. Kopier diesen fertigen Text und schick ihn per Mail an Sui — er bringt es online

Du musst nichts klicken, nichts hochladen, nichts auf GitHub tun. Nur schreiben und mailen.

---

## Template 1: Neuer Beitrag „Im Gespräch" (Interview, Video, Podcast, Rezension)

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

---

## Template 2: Neuer Faktencheck-Fall

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

---

## Template 3: Neuer Atlas-Akteur (NGO, Stiftung, Faktenchecker, Behörde)

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

## Was du an Sui schickst

Eine Mail mit:

- **Betreff:** „Neuer Eintrag: <Titel>"
- **Inhalt:** das fertige Markdown-Stück, das Claude dir geliefert hat

Sui macht den Rest (15 Sekunden: in den richtigen Ordner legen, committen, fertig).
Die Seite ist 30 Sekunden später live.

## Fragen / Korrekturen

Wenn du an einem bestehenden Eintrag etwas ändern willst, schreib Sui einfach:

> „Im Atlas-Eintrag zur Bertelsmann Stiftung bitte den Satz 'X' ersetzen
> durch 'Y'. Quelle: …"

Sui macht das direkt.
