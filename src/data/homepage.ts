// Einstiegs-Karten für das Startseiten-Karussell.
// Reine Fakten/Punchline-Hooks — die Akteurs-Profile werden im
// separaten Akteurs-Karussell präsentiert. Hier zeigen die Karten auf
// Recherchen, Chronik, Buchkapitel oder direkt zu Häring-Artikeln.

export type HookCard = {
  tag: string;
  punch: string;
  text: string;
  meta: string;
  href: string;
};

export const hookCards: HookCard[] = [
  {
    tag: 'Geldflüsse',
    punch: '200 Mio. €',
    text:
      'gab die Bundesregierung 2021 und 2022 jährlich für Werbung in Medien aus — die größten Empfänger sind die größten Verlage.',
    meta: 'Parlamentarische Anfragen · Buch Kap. 1',
    href: '/recherchen#werbeausgaben-bundesregierung',
  },
  {
    tag: 'DSA-Vollzug',
    punch: '120 Mio. €',
    text:
      'verhängte die EU-Kommission im Dezember 2025 als Strafe gegen X — wegen „ungenügendem Datenzugang für Forscher" unter dem Digital Services Act.',
    meta: 'EU-Kommission · Dezember 2025',
    href: '/chronik',
  },
  {
    tag: 'Militärische Steuerung',
    punch: 'DISARM',
    text:
      'ist das im Auftrag des US-Militärs entwickelte Rahmenwerk zur Klassifizierung von „Desinformation". Seit 2023 offizieller EU-US-Standard für den Erkenntnisaustausch.',
    meta: 'US-Verteidigungsministerium · Buch Kap. 5',
    href: '/chronik',
  },
  {
    tag: 'Wahlsicherung',
    punch: 'Rapid Response System',
    text:
      'Die EU aktivierte das System vor der Ungarn-Wahl im April 2026. Plattformen müssen Inhalte, die Faktenchecker und NGOs markieren, besonders schnell löschen oder ausbremsen.',
    meta: 'EU-Kommission · März 2026',
    href: '/chronik',
  },
  {
    tag: 'Faktenchecker im Faktencheck',
    punch: '35 von 100',
    text:
      'Mit dieser Bewertung führte NewsGuard das Portal Achgut als einen der zehn größten Verbreiter von Desinformation 2022. Im Februar 2026 untersagt das OLG Frankfurt diese Lesart.',
    meta: 'OLG Frankfurt · AZ 6 U 92/25',
    href: '/faktenchecks',
  },
  {
    tag: 'Hass und Hetze',
    punch: 'Vom NetzDG zum DSA',
    text:
      'Die argumentative Vorarbeit lieferten Stiftungen über Jahre. Ihre Vorschläge — Plattformen müssen melden, löschen, dokumentieren — wanderten unverändert ins Gesetz und später in den DSA.',
    meta: 'Buch Kap. 2 & 3',
    href: '/buch#kapitel-2',
  },
  {
    tag: 'Stiftungs-Förderung',
    punch: '191 Mio. €',
    text:
      'Aktueller Etat des Bundesprogramms „Demokratie leben!". Im März 2026 streicht Bundesbildungs­ministerin Karin Prien 200 der 3.000 Projektförderungen — betroffen unter anderem HateAid, Correctiv und Amadeu Antonio Stiftung.',
    meta: 'BMFSFJ · Chronik März 2026',
    href: '/chronik',
  },
  {
    tag: 'Pressefreiheit',
    punch: 'EU-Sanktionen',
    text:
      'Der EU-Rat verhängte im Mai 2025 Sanktionen gegen drei deutsche Journalisten wegen „Unterstützung russischer Propaganda" — und sanktionierte im Dezember 2025 weitere Publizisten.',
    meta: 'EU-Rat · Mai und Dezember 2025',
    href: '/chronik',
  },
  {
    tag: 'EU-Faktencheck-Architektur',
    punch: '5 Mio. €',
    text:
      'erhielt das European Fact-Checking Standards Network im März 2026 — im Rahmen des „Europäischen Demokratieschilds" zur Förderung „geeigneter" Faktenchecker.',
    meta: 'EU-Kommission · März 2026',
    href: '/chronik',
  },
  {
    tag: 'Aktuelles',
    punch: 'WHO-Gesundheitsnotstand?',
    text:
      'Eine WHO-Kommission fordert im Mai 2026, wegen des Klimawandels den internationalen Gesundheitsnotstand auszurufen. Ein WHO-Notstand gäbe der EU unter DSA erweiterte Eingriffsrechte gegenüber Plattformen.',
    meta: 'Häring · Mai 2026',
    href: 'https://norberthaering.de/propaganda-zensur/who-gesundheitsnotstand/',
  },
];
