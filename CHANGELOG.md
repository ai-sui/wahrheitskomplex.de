# Änderungsprotokoll wahrheitskomplex.de

Dieses Protokoll führt die inhaltlich relevanten Änderungs-Runden, damit
Norbert und Ralph nachvollziehen können, was wann auf Anregung welcher
E-Mail in die Site eingeflossen ist. Technische Detail-Commits stehen im
Git-Log.

## Rollback

Vor jeder Aufräum-Runde wird ein Git-Tag der Form
`backup-pre-cleanup-YYYYMMDD-HHMMSS` gesetzt und auf das Remote
gepusht. Der Stand vor einer Runde lässt sich jederzeit zurückspielen:

```sh
# Alle Backup-Tags anzeigen
git tag -l 'backup-pre-cleanup-*'

# Stand eines bestimmten Tags ansehen (read-only)
git checkout backup-pre-cleanup-20260524-222335

# Vollständiger Hard-Rollback auf den Tag (überschreibt main!)
git switch main
git reset --hard backup-pre-cleanup-20260524-222335
git push --force-with-lease origin main
```

`--force-with-lease` schützt vor dem versehentlichen Überschreiben von
zwischenzeitlich gepushten Commits anderer.

## Runden

### 28.5.2026 – Norbert-Runde 5 (Kurzhinweis, 28.5.)

Kein Backup-Tag (einzelne Textkorrektur).

Eingeflossene Mail:

- **Re: Wahrheitskomplex** (28.5.) – Korrekturhinweis: Auf der
  Recherchen-Seite stand in der Unterzeile „im Porträts der Akteure",
  Überbleibsel der Umbenennung Atlas → Porträts.

Umgesetzt:

- [`src/pages/recherchen.astro:22`](src/pages/recherchen.astro:22):
  „im Porträts der Akteure" → „in Porträts der Akteure" (Norberts
  Formulierung übernommen).

### 27.5.2026 – Norbert-Runde 4 (1 E-Mail, 27.5.)

Backup-Tag: `backup-pre-chronik-mai26-20260527-164427`

Eingeflossene Mail:

- **Wahrheitskomplex** (27.5., 10:48) – Zwei neue Tiefenartikel für die
  Chronik (Landesmedienanstalten-Stempel und Westend-Boykott durch
  32 frühere Autoren) plus Bitte, das Berliner-Zeitung-Interview
  wegen Paywall zu entfernen.

Umgesetzt in dieser Runde:

- **Chronik um zwei Einträge erweitert** (`src/data/chronik.ts`):
  - 26.5.2026, DE: „Landesmedienanstalten wollen Stempel für
    ‚verbreitungsfähige' Inhalte vergeben" mit Härings Befund als
    Zuspitzung und Screenshot aus dem Diskussionspapier als Thumb.
  - 26.5.2026, DE: „Westend-Verlag gerät ins Visier der Selbstgerechten"
    zum offenen Brief von 32 früheren Westend-Autoren. Bild: Ulrike
    Herrmann (Wikimedia Commons, CC BY-SA 2.0, boellstiftung).
- **Chronik-Schema erweitert**: neue optionale Felder `imageCredit`
  und `imageCreditUrl` in `ChronikEintrag`, gerendert als
  `<figcaption>` unter dem Thumb in `TimelineEvent.astro`. Dadurch
  wird der bislang nicht angezeigte WHO-Thumb auf der Chronik-Seite
  jetzt ebenfalls sichtbar.
- **Berliner-Zeitung-Interview entfernt**
  („Wie EU und Militär heimlich die Meinungskontrolle organisieren",
  Francesco Becchi, 6.5.2026). Norbert: „Das Interview in der
  Berliner Zeitung kann gern raus. Wenn sie auf eine Paywall treffen,
  finden die Leute das nicht so toll."
  Gelöscht: `src/content/medien/berliner-zeitung-becchi-interview.md`
  und der dazugehörige Aufmacher unter `public/article-thumbs/`.

### 25.5.2026 – Norbert-Runde 3 (2 E-Mails, 25.5.)

Backup-Tag: `backup-pre-norbert-runde3-20260525-121313`

Eingeflossene Mails:

- **Re: Was ist Wahrheit?** (25.5., 11:01) – Lob für die Site,
  Schlusstext-Vorschlag für /faktenchecks, Häring-Funktion-Zusatz
  für /ueber, Hinweis zu Klaus Tschira Stiftung, Korrekturen für die
  Buch-Seite (Tippfehler Kap. 1, Akteure und Recherchefragen für
  Kap. 4 und Kap. 6).
- **Foto** (25.5., 11:49) – Aufmacher-Foto für den
  Tagesschau-Vitamin-D-Faktencheck.

Umgesetzt in dieser Runde:

- **Faktenchecker-Check (Karte Vitamin D)**
  - Von Norbert gesandtes Foto als
    `public/faktencheck-thumbs/tagesschau-vitamin-d.jpg` eingebaut.
- **/faktenchecks Schlusstext**
  - Vorigen Erläuterungstext „Wir verkürzen für die Karten-Form …"
    durch Norberts knappere Formulierung ersetzt: „Diese
    Faktenchecker-Checks ergänzen die im Buch angeführten Beispiele.
    Sie stammen von der Website norberthaering.de."
- **/ueber**
  - Zusatz angefügt: „Dasselbe gilt für die parteipolitische Funktion
    von Norbert Häring."
- **Porträts**
  - Klaus Tschira Stiftung als eigenständiger Akteur entfernt
    (`src/content/actors/klaus-tschira-stiftung.md`). Norbert: „Zur
    Klaus Tschira Stiftung weiß ich nicht viel zu sagen. Stiftungen
    wollte ich eigentlich nicht porträtieren." Die Erwähnung der KTS
    bleibt in der Finanzierungsangabe des Science Media Center und
    im Kurz-Glossar erhalten.
- **Buch-Seite**
  - Kapitel 1 abstract: Schreibweise korrigiert – „Eingenorden" →
    „Einnorden".
  - NewsGuard bekommt `buchKapitel: "Kapitel 4"`, sodass die Karte
    in der „Akteure im Porträt"-Spalte von Kapitel 4 erscheint.
  - Vier neue Recherchefragen ergänzt – zwei für Kap. 4 (WHO/Wikipedia
    und WHO/UN-Influencer), zwei für Kap. 6 (Digitalisierung/Zentrali-
    sierung/Meinungskontrolle und Teile-und-herrsche-Gegenmaßnahmen).

Nachgezogen:

- freistattsmart.de wird statt als Akteur als externer Link in einer
  neuen „Weiterführend"-Spalte unter Kapitel 6 aufgeführt. Dazu hat
  das `Kapitel`-Schema in `src/data/buch.ts` ein optionales Feld
  `weiterfuehrend?: Array<{label, url, beschreibung?}>` bekommen. Das
  Akteur-Schema bleibt sauber für Wahrheitskomplex-Kritik reserviert.

### 25.5.2026 – Norbert-Runde 2 (5 E-Mails, 23.5.–24.5.)

Backup-Tag: `backup-pre-norbert-runde2-20260524-235131`

Eingeflossene Mails:

- **zwei weitere Begriffe und mehr** (23.5., 11:41) – Antisemitismus
  und Prebunking als Glossar-Volltexte; UI-Bitten zu „Was ist …",
  NGO-Kacheln, Buchcover-Position und externen Links.
- **Was ist Wahrheit?** (23.5., 14:35) – Volltext „Wahrheit" mit Bitte
  als erster Karte.
- **Faktencheck-Anläufe** (23.5., 17:56) – sieben harmonisierte
  Vorspänne (vier davon zur Streichung markiert).
- **Faktenchecker-Checks, dpa und Impressum** (24.5., 14:35) – neuer
  dpa-Akteurstext mit Anteilseigner-Konflikt, EDMO und Staatsgeld,
  Anläufe für drei Faktencheck-Checks, Überschriften-Vorschläge,
  Impressum-Zusatz.
- **Re: Was ist Wahrheit?** (24.5., 17:02) – Bestätigung des
  Über-uns-Texts, Hinweise zur Achgut-Bildquelle für die
  dpa-Gericht-Karte und ZDF-Nordstream-Foto im Anhang.

Umgesetzt in dieser Runde:

- **Faktenchecker-Check (Karten)**
  - Dachzeile jeder Karte von „Faktencheck" auf „Faktenchecker-Check"
    umbenannt (FaktencheckCard.astro).
  - ZDF-Nordstream-Aufmacher: von Norbert gesandtes PNG als
    `public/faktencheck-thumbs/zdf-nordstream.jpg` eingebaut.
  - dpa-Gericht-Karte: Buch Kap. 1 als zusätzliche Quelle ergänzt
    (Achgut-Hochwasser-Bild war bereits als Aufmacher gesetzt).
  - Vier redundante Stubs entfernt: correctiv-anti-journalisten,
    correctiv-nanolipide, spahn-wieler-faktenchecker,
    zdf-nordstream-sabotage (durch zdf-nordstream ersetzt).
- **Glossar**
  - „Was ist …?" → „Was ist …" auf der Detail-Seite (`/glossar/[slug]`)
    und in der Glossar-Übersicht. Das Fragezeichen steht nur noch
    einmal hinter dem Begriff selbst, nicht mehr zusätzlich in der
    Dachzeile.
- **Externe Links**
  - Auf Anregung von Norberts Grafiker bekommen alle externen Verweise
    im gesamten Repo (FaktencheckCard, UnifiedNewsCard, TimelineEvent,
    ActorCard, ActorDetail, BookSection, Footer, RechercheCard,
    MediaCard, SpinnenImNetzCard, FactWeek, NewsletterForm, pages/*)
    zusätzlich zu `rel="noopener"` ein `target="_blank"`, damit der
    Leser nicht aus der Begleitseite herausfällt.

Bestätigt als bereits umgesetzt (keine Aktion in dieser Runde nötig):

- dpa-Faktencheck-Akteur (Anteilseigner / EDMO / Staatsgeld / Facebook
  News) – Text entspricht Norberts neuer DOCX-Version 1:1.
- Drei „neue" Faktencheck-Karten: Pflanzensprengstoff,
  Tagesschau-Ganser/Guérot, ARD-Merz – Karten und Vorspänne sind
  bereits im Repo.
- Bestehende Überschriften – sind bereits in Norberts kürzeren,
  einheitlicheren Fassungen hinterlegt.
- Buchcover-Sektion ist auf der Startseite bereits ganz unten.
- „Neues"-Karussell zeigt für Faktenchecks `norberthaering.de`,
  nicht mehr AFP.
- Fundort-Schema „source →" (statt „bei source") ist in der
  UnifiedNewsCard bereits umgesetzt.
- Impressum-Zusatz „Etwaige Fehler werden auf Hinweis per Mail
  umgehend und anstandslos korrigiert" steht.
- Hybrides Eingreifteam hat bereits Buch Kap. 5 als Quelle.
- NGO-Kacheln in der /portraits-Übersicht sind durch CSS-Grid
  zeilenweise gleich hoch.

Offen / nicht in dieser Runde:

- Tombstone-Mechanismus im Auto-Sync gegen Wiederauferstehung
  gelöschter Faktenchecks.
- Drittes Glossar-Stichwort (Bringschuld Norbert).
- Karussell-Höhen-Sync nach Pages-Deploy visuell bestätigen.

### 24.5.2026 – Norbert-Sammel-Runde (5 E-Mails, 20.5.–22.5.)

Backup-Tag: `backup-pre-cleanup-20260524-222335`

Eingeflossene Mails:

- **Wahrheitskomplex Umzug** (20.5.) – initiale Feedback-Runde zu
  NGO-Porträts, Dachzeilen, Chronik und Faktenchecks.
- **P.s.** (21.5.) – Kanada-Eintrag für die Chronik
  (norberthaering.de/propaganda-zensur/kanadas-armee-covid).
- **Re: 🎉** (21.5.) – Glossar-Vorschlag „Meinungsfreiheit".
- **Chronik und Verlinkungen** (22.5., 09:29) – Footer-Text für die
  Chronik, Frage nach Inline-Quellenlinks im Volltext.
- **Re: 🎉** (22.5., 09:47) – Leseprobe-Hinweis, Bedenken zum Begriff
  „Atlas".
- **Re: 🎉** (22.5., 19:43) – Volltext „Kognitive Kriegsführung".

Umgesetzt in dieser Runde:

- **Chronik**
  - Themen-Schlagwörter und Region-Pill je Eintrag entfernt
    (`compact=true`), Description ausgeblendet — entsprechend Norberts
    „ohne magere Unterzeile und Schlagwörter".
  - Link zur laufenden Chronik-Fortsetzung von oben nach unten unter den
    letzten Eintrag verschoben.
  - Norberts Hinweis-Satz aus der zweiten Buchauflage als Footer ergänzt:
    „Weitere Aktualisierungen und Links zu den Quellen für diese
    Aktualisierung finden Sie auf norberthaering.de/wahrheitskomplex".
- **Porträts**
  - Übersicht: Kategorie-Dachzeile aus den NGO-Karten entfernt, Land
    bleibt als kompakte Verortung oben rechts.
  - Detail-Seite: Dachzeile auf typspezifisches „NGO im Porträt:" /
    „Faktenchecker im Porträt:" / „Behörde im Porträt:" etc. gemäß
    Norberts Vorschlag in der Re-🎉-Mail.

Nicht in dieser Runde umgesetzt (offen / klärungsbedürftig):

- Visuelle Bestätigung des Karussell-Höhen-Sync (letzter Push: 418e590).
- Aufräumen der offenen Pull Requests
  (Cloudflare-Worker-Reste, Auto-Sync-Vorschläge).
- Tombstone-Mechanismus im Auto-Sync gegen Wiederauferstehung
  gelöschter Faktenchecks.

### Davor

Frühere Runden sind ausschließlich im Git-Log nachvollziehbar. Tag-Backups
existieren ab dieser Runde.
