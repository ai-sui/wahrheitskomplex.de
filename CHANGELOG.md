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
