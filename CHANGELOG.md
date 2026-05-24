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
