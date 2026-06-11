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

### 11.6.2026 – Norbert-Runde 10 (Meyen-Foto + Klick-Bug, 11.6.)

Backup-Tag: `backup-pre-norbert-runde10-20260611-063538`

Eingeflossene Mail:

- **Meyen und Links** (11.6., 06:18) – Foto von Michael Meyen für die
  Rezension plus ein UX-Bug auf der Startseite: „Die Links in den
  Karton von 'Neues aus dem WK' sind nicht aktiv. Die Links hinter den
  jeweiligen Überschriften schon."

Umgesetzt:

- **Aufmacher Meyen-Rezension**: Foto aus dem Anhang als
  `public/article-thumbs/freie-medienakademie-meyen-rezension.jpg`
  abgelegt (243×207 px). Die Rezension erscheint dadurch automatisch
  mit Bild in der `/im-gespraech`-Liste und im „Neues"-Karussell auf
  der Startseite.
- **Klick-Bug in [`src/components/UnifiedNewsCard.astro`](src/components/UnifiedNewsCard.astro)**
  gefixt: vorher hatte die Karte zwei separate `<a>`-Tags (einer um
  das Bild, einer um die Überschrift). Klicks auf Datum, Quellzeile
  oder leeren Raum landeten nirgends. Jetzt ist die ganze Karte ein
  einziger `<a>`-Tag, ein Klick irgendwo auf der Karte folgt dem Link.
  Hover-Wirkung für die Überschrift bleibt erhalten (jetzt via
  `group-hover:text-accent` statt eigener `<a>`-Hover).

### 10.6.2026 – Norbert-Runde 9B (Häring-Porträts integrieren)

Backup-Tag: `backup-pre-norbert-runde9b-20260610-203402`

Direkt im Anschluss an Runde 9A. Umsetzung des großen Refactorings,
das Norbert in derselben Mail angestoßen hat: die 15 Häring-Tiefenporträts
von norberthaering.de/spinnen-im-netz/ werden direkt in die internen
Porträts auf wahrheitskomplex.de übernommen.

Umgesetzt:

- **15 Akteurs-Bodies durch Häring-Texte ersetzt**: correctiv, atlantic-council,
  institute-for-strategic-dialogue, edmo, science-media-center-germany,
  hateaid, newsguard, gdi, dfrlab, efcsn, casm-technology, dri, gadmo,
  soma, can. Die Härings Steckbriefe und Aktivitäts-Abschnitte sind
  Bestandteil des Bodies, der bestehende Schema-Steckbrief (Akteurstyp,
  Land, Gegründet, Finanzierung, Reichweite, Buch-Kapitel) bleibt in
  der Sidebar wie bisher.
- **fulltext: true** für die 10 Akteure, die vorher als Kurzporträt
  geführt waren (hateaid, newsguard, gdi, dfrlab, efcsn, casm-technology,
  dri, gadmo, soma, can). Jeder bekommt jetzt eine eigene Detail-Seite
  unter `/portraits/{slug}`. Die Site hat damit 18 Volltext-Profile
  (alle außer IFCN und Respect, die Norbert später nachreicht).
- **SMC-Porträt** `haeringLink` korrigiert: von `propaganda-zensur/science-media-center/`
  auf `spinnen-im-netz/snc/` (Norberts Originalpfad).
- **ActorPortraitCard** (`src/components/ActorPortraitCard.astro`):
  Karten-Link verweist jetzt immer intern auf `/portraits/{slug}`,
  nicht mehr extern auf `haeringLink`. Norbert: „Alle Links sollten dann
  auf die Porträts unter wahrheitskomplex.de/porträts zeigen." Der
  CTA-Text lautet einheitlich „Profil ansehen →".
- **Externe Häring-Links bleiben sichtbar** im aside-Block der
  Detail-Seite („Vertiefungen: Tiefenartikel auf norberthaering.de"),
  damit der Leser jederzeit zum Original wechseln kann.

Bewusst aufgeschoben: Die Steckbrief-Felder in der Sidebar (Schema-Felder
`finanzierung`, `reichweite` etc.) wurden NICHT durch Härings detailliertere
Steckbriefe ersetzt. Härings Steckbriefe sind heterogen strukturiert
(jeder Akteur hat andere Schlüssel) und passen nicht in ein einheitliches
Schema. Sie sind als `## Steckbrief`-Section im Body sichtbar, damit
nichts verloren geht. Falls Norbert die Sidebar-Variante komplett raus
will, kann das in einer Folge-Runde geschehen.

### 10.6.2026 – Norbert-Runde 9A (große Mail, 10.6.)

Backup-Tag: `backup-pre-norbert-runde9a-20260610-185841`

Eingeflossene Mail:

- **Wahrheitskomplex.de** (10.6., 16:09) – Norberts umfangreichste Mail
  bisher. Chronik-Ergänzungen, neue Meyen-Rezension, mehrere Korrekturen
  an den Porträts (AAS, EDMO, „Stellungnahme"-Feld raus, doppelter
  Porträt-Strang vereinheitlichen), neues IFCN-Porträt sowie eine
  geänderte Zählung im schwarzen Kasten.

Runde 9A deckt die kleineren und mittleren Punkte ab. Das größere
Refactor (Häring-Porträt-Texte für 15 Akteure in die wahrheitskomplex.de-
Porträts übernehmen, Steckbrief in die Seitenleiste verschieben) folgt
in Runde 9B.

Umgesetzt:

- **Chronik** in [`src/data/chronik.ts`](src/data/chronik.ts):
  - Neuer Eintrag 31.5.2026 DE „Tichys juristischer Sieg gegen die
    Schlapphüte", Themen Ukraine & NATO + Hass und Hetze.
  - Neuer Eintrag 5.6.2026 DE „Stadtbücherei Münster nimmt Buch, vor
    dem es nicht mehr warnen darf, aus dem Leihprogramm", Thema Hass
    und Hetze.
  - Beim Westend-Eintrag (26.5.2026) wurde das Ulrike-Herrmann-Foto
    inkl. `imageCredit` entfernt (Norbert: „könnte man vielleicht
    rausnehmen"). Die Datei `public/chronik-thumbs/westend-offener-brief.jpg`
    bleibt vorerst im Repo, falls die Entscheidung später anders ausfällt.
- **Neue Rezension** „Der Wahrheitskomplex" von Michael Meyen auf der
  Freien Akademie für Medien & Journalismus (4.6.2026), Pullquote: „In
  Sachen Recherche macht Norbert Häring niemand etwas vor. In keinem
  anderen Buch gibt es eine solche Fülle an Material zum Thema."
  Datei: [`src/content/medien/freie-medienakademie-meyen-rezension.md`](src/content/medien/freie-medienakademie-meyen-rezension.md).
- **AAS-Porträt** ([`src/content/actors/amadeu-antonio-stiftung.md`](src/content/actors/amadeu-antonio-stiftung.md)):
  „Beratet Bundes- und Landesregierungen" aus `reichweite` gestrichen
  (Norbert: fehlerhaft, keine Korrektur-Vorlage geliefert).
- **EDMO-Porträt** ([`src/content/actors/edmo.md`](src/content/actors/edmo.md)):
  `kurzbeschreibung` auf Norberts Wortlaut umgestellt („Instituten,
  Unternehmen, Faktencheckern und anderen NGOs"), „Behörden" raus.
- **„Stellungnahme"-Feld komplett entfernt** aus dem Akteurs-Schema und
  aus allen 8 Porträt-Dateien, die es hatten. Norbert: „Wort erweckt
  den falschen Eindruck, es wären explizite Stellungnahmen auf Anfrage."
  Geändert: [`src/content.config.ts`](src/content.config.ts),
  [`src/components/ActorDetail.astro`](src/components/ActorDetail.astro),
  [`src/pages/portraits/[slug].astro`](src/pages/portraits/[slug].astro)
  und die 8 betroffenen `.md`-Dateien.
- **Neues IFCN-Porträt** als 20. Akteur,
  [`src/content/actors/ifcn.md`](src/content/actors/ifcn.md). Erstmal
  als Kurzporträt (`fulltext: false`); Norbert hat angekündigt, das
  selbst zu überarbeiten, sobald er mit AAS, dpa, Respect und Internews
  durch ist.
- **Startseite-Karussell**: Headline-Zähler zeigt jetzt
  `allActors.length` statt nur die `fulltext`-Akteure (also „20" statt
  „8"). Der schwarze Kasten am Ende des Karussells (vormals
  `SpinnenImNetzCard`, jetzt eine interne Brücke):
  - Text auf „N weitere Porträts auf wahrheitskomplex.de" umgestellt,
    Zähler dynamisch aus `allActors.length − actors.length` berechnet
    (aktuell 12).
  - Link zeigt jetzt auf [`/portraits`](src/pages/portraits/index.astro),
    nicht mehr nach norberthaering.de. Damit ist Norberts „zwei
    konkurrierende Stränge"-Punkt für diese Stelle gelöst.

Offen für Runde 9B (Häring-Porträt-Texte für die 15 Akteure mit
Tiefenartikel auf norberthaering.de/spinnen-im-netz, Steckbrief in die
Seitenleiste, alle weiteren Porträt-Links auf eigene Seite zeigen lassen).

#### Nachschlag (4 Punkte, nach Sorgfalts-Review)

- **AAS-„Vollständiges Porträt"-Link** war Norberts erster konkret
  benannter Bug („zeigt auf Porträt-Übersichtsseite, da es das Porträt
  auf norberthaering.de noch nicht gibt"). `haeringLink` ist aus
  `amadeu-antonio-stiftung.md` entfernt. Die ActorPortraitCard zeigt
  jetzt für AAS „Profil ansehen →" und führt auf die interne Seite.
  Der Häring-Finanzierer-Artikel bleibt im `quellen`-Block erhalten.
- **Dieselbe Behandlung** für `dpa-faktencheck.md`,
  `internews-earth-journalism-network.md` und `respect.md`. Norbert
  nennt diese 4 explizit als Akteure ohne eigenständiges
  Häring-Porträt auf norberthaering.de. Die Häring-Tiefenartikel
  bleiben jeweils im `quellen`-Block bzw. (bei respect) in einer
  künftigen Erweiterung durch Norbert ergänzbar.
- **„Stellungnahme"-Erwähnung in [`src/pages/ueber.astro:74`](src/pages/ueber.astro:74)**
  entfernt. Norberts Begründung gegen das Wort gilt überall, nicht nur
  in den Porträt-Karten.

### 4.6.2026 – Norbert-Runde 8 (1 E-Mail, 4.6.)

Backup-Tag: `backup-pre-norbert-runde8-20260604-133801`

Eingeflossene Mail:

- **Wahrheitskomplex.de** (4.6., 11:14) – Zwei neue Beiträge: ein
  Faktencheck zur dpa und ihr „Wahl-Prebunking"-Whitepaper, plus die
  Videoaufzeichnung einer Autorenlesung bei den Frankfurter
  FriedensGesprächen.

Umgesetzt in dieser Runde:

- **Neuer Faktencheck** „Nachrichtenagentur dpa veröffentlicht
  Anleitung zur vorsorglichen Diskreditierung von Kritik an Wahlen"
  (dpa, 3.6.2026, Themen Wahlen + DSA & NetzDG, summary-Variante).
  Aufmacher: Bildschirmfoto-Anhang als
  `public/faktencheck-thumbs/dpa-wahl-prebunking.jpg`.
  Datei: [`src/content/faktenchecks/dpa-wahl-prebunking.md`](src/content/faktenchecks/dpa-wahl-prebunking.md).
- **Neuer Vortrag** „Autorenlesung „Der Wahrheitskomplex""
  (Frankfurter FriedensGespräche, 2.6.2026, 76 Min). Erster Eintrag
  mit `type: vortrag` und `host: Norbert Häring` (Lesender statt
  Interviewer). Thumb: YouTube-Auto-Bild über `youtubeId`,
  abgelegt als `public/yt-thumbs/cPsTgxiShmk.jpg`.
  Datei: [`src/content/medien/frankfurter-friedensgespraeche-lesung.md`](src/content/medien/frankfurter-friedensgespraeche-lesung.md).

### 1.6.2026 – Service-Notiz-Feld + AUF1-Hinweis sauber positionieren

Ralph-Hinweis nach Runde 7: Norberts „Interview ab Minute 13:30" steckte
zunächst im `pullquote`, das in der MediaCard mit Anführungszeichen und
kursiv gerendert wird, also wie ein Zitat. Service-Info passt nicht
ins Zitat-Gewand.

Umgesetzt:

- **Schema-Erweiterung** in [`src/content.config.ts`](src/content.config.ts):
  Neues optionales Feld `note` für die `medien`-Collection. Gedacht
  für kurze Service-Notizen (Zeitmarken, Paywall-Workarounds u.ä.),
  ausdrücklich kein Zitat-Stil.
- **Rendering** in [`src/components/MediaCard.astro`](src/components/MediaCard.astro):
  `note` wird unter dem Pullquote als kleiner accent-farbiger Absatz
  ohne Anführungszeichen gerendert.
- **AUF1-Eintrag** auf das neue Feld umgestellt: Pullquote raus, der
  13:30-Hinweis steht jetzt im `note`-Feld.
- **Suchindex** in [`src/pages/search-index.json.ts`](src/pages/search-index.json.ts):
  `note` ins Snippet aufgenommen, damit der Hinweis auch über die
  Site-Suche gefunden wird.

### 1.6.2026 – Norbert-Runde 7 (1 E-Mail, 31.5. Abend)

Backup-Tag: `backup-pre-norbert-runde7-20260601-084832`

Eingeflossene Mail:

- **Re: Wahrheitskomplex.de** (31.5., 22:30) – Norbert stimmt der
  Aufnahme des AUF1-Interviews zu („sehe das mit Auf1 auch so") und
  bittet um den vorgeschlagenen Hinweis auf den Interview-Start.
  Zusätzlich liefert er einen konkreten Vorspann für den
  APA-Rotoren-Faktencheck nach.

Umgesetzt in dieser Runde:

- **Neues Video** „Der Wahrheitskomplex – das System hinter Zensur &
  Meinungsmacht" (Thomas Eglinski, AUF1, 30.5.2026). Themen: Ukraine
  & NATO, DSA & NetzDG. Pullquote weist darauf hin, dass das Interview
  mit Häring bei Minute 13:30 startet. Aufmacher: `Auf1.png` aus
  Norberts Mail vom 31.5. Vormittag, als
  `public/article-thumbs/auf1-eglinski-interview.jpg` abgelegt.
  Datei: [`src/content/medien/auf1-eglinski-interview.md`](src/content/medien/auf1-eglinski-interview.md).
- **APA-Rotoren-Faktencheck** auf Norberts Vorspann umgestellt
  (`summary` statt der drei Blöcke). Karte zeigt jetzt seine
  zusammenfassende Wertung als kompakte Form, analog zu
  dpa-gerichtsurteil und pistorius-faktenfuchs.
  Datei: [`src/content/faktenchecks/apa-rotoren.md`](src/content/faktenchecks/apa-rotoren.md).

### 31.5.2026 – Doppelung Faktenchecks auf der Startseite

Norbert-Hinweis kurz nach Runde 6: „Den APA-Rotoren-Beitrag haben wir
zweimal auf der Seite." Stimmte: auf der Startseite tauchte jeder
Faktencheck einmal im oberen „Neues aus dem Wahrheitskomplex"-Karussell
und einmal im darunter liegenden „Faktenchecker-Check"-Karussell auf.

Fix in [`src/pages/index.astro`](src/pages/index.astro): Faktenchecks
sind aus dem `newsFeed` für das Top-Karussell entfernt, analog zu den
Chronik-Einträgen, die seit längerer Zeit schon aus demselben Grund
ausgeschlossen sind. Das Top-Karussell zeigt jetzt nur noch Medien
(Videos, Podcasts, Interviews, Rezensionen). Faktenchecker-Check und
Chronik haben ihre eigenen Blöcke weiter unten.

### 31.5.2026 – Norbert-Runde 6 (1 E-Mail, 31.5.)

Backup-Tag: `backup-pre-norbert-runde6-20260531-141924`

Eingeflossene Mail:

- **Wahrheitskomplex.de** (31.5., 12:53) – Drei neue Beiträge
  (Matuschek-Rezension, APA-Rotoren-Faktencheck, Lapuente-Overton-Video)
  plus Chronik-Korrekturen: präzise Daten und Quellen-Links für drei
  Mai-Einträge, deren Reihenfolge in der Rendering-Ansicht durch das
  generische „2026-05" verrutscht war.

Umgesetzt in dieser Runde:

- **Neue Rezension** „Die privatisierte Inquisition" (Milosz Matuschek,
  Freischwebende Intelligenz, 31.5.2026). Themen: DSA & NetzDG, Hass
  und Hetze. Aufmacher: „Matuschek Panoptikum.png" aus der Mail.
  Datei: [`src/content/medien/freischwebende-matuschek-rezension.md`](src/content/medien/freischwebende-matuschek-rezension.md).
- **Neuer Faktencheck** „APA weist Vorwurf arglistiger Täuschung von
  Schülern zurück" (APA, 31.5.2026, Thema Klima, Drei-Block-Form).
  Aufmacher: „Rotorblätter.png" aus der Mail.
  Datei: [`src/content/faktenchecks/apa-rotoren.md`](src/content/faktenchecks/apa-rotoren.md).
- **Neues Video** „Wer lenkt das Internet, Herr Häring?" (Roberto De
  Lapuente, Overton Magazin, YouTube-ID `djWyHDn9mW8`). Themen: Ukraine
  & NATO, DSA & NetzDG. Thumb: „Overton-Video1.png" aus der Mail (mit
  Buch im Bild), als `public/yt-thumbs/djWyHDn9mW8.jpg` abgelegt.
  Datei: [`src/content/medien/overton-haering-internet-lenkung.md`](src/content/medien/overton-haering-internet-lenkung.md).
- **Chronik-Korrekturen** in [`src/data/chronik.ts`](src/data/chronik.ts):
  - WHO-Klima: `2026-05` → `2026-05-17`.
  - SPD, Grüne, Linke verlassen X: `2026-05` → `2026-05-04`, mit
    `sourceLink` auf tagesschau.de.
  - Weimer YouTube-Regulierung: `2026-05` → `2026-05-13`, mit
    `sourceLink` direkt auf welt.de (Originalbeitrag, wie Norbert
    gewünscht).
  - Damit stimmt auch die Reihenfolge in der gerenderten Chronik. Die
    drei Einträge hingen vorher fälschlich oben, weil die Datums-Pad-Logik
    `2026-05` zu `2026-05-31` ergänzt.

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
