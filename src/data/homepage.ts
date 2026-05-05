export type FactOfTheWeek = {
  kicker: string;
  number: string;
  claim: string;
  source: string;
  bookChapter: string;
  deepLink: { label: string; url: string };
};

export type HookCard = {
  tag: string;
  punch: string;
  text: string;
  verified: string;
  readingTime: string;
  href: string;
};

export const factOfTheWeek: FactOfTheWeek = {
  kicker: 'Fakt der Woche',
  number: '200 Mio. €',
  claim:
    'gab die Bundesregierung 2021 und 2022 jährlich für Werbung in Medien aus. Die größten Empfänger: Ad Alliance (Stern, Brigitte, Capital), Springer (Bild, Welt), FAZ, Funke, Burda, Süddeutsche.',
  source: 'Antworten der Bundesregierung auf Anfragen der AfD-Bundestagsfraktion',
  bookChapter: 'Kapitel 1 — Wie etablierte Medien eingenordet werden',
  deepLink: {
    label: 'Finanzierer-Übersicht auf norberthaering.de',
    url: 'https://norberthaering.de/wahrheitskomplex/finanzierer/',
  },
};

export const hookCards: HookCard[] = [
  {
    tag: 'Wissenschaftskommunikation',
    punch: '2.200 Journalist:innen',
    text: 'sind beim Science Media Center Germany akkreditiert. Vorausgewählte Experten-Zitate erscheinen oft gleichlautend in Dutzenden Redaktionen — die Vorauswahl bleibt für Leser:innen unsichtbar.',
    verified: '3 Quellen',
    readingTime: '8 Min. Lesezeit',
    href: '/atlas/science-media-center-germany',
  },
  {
    tag: 'Geldflüsse',
    punch: '47,5 Mio. €',
    text: 'gab Österreichs Bundesregierung allein im ersten Corona-Jahr für Medienwerbung aus. Als die Werbeausgaben 2025 zusammengestrichen wurden, mussten beim Standard fast 20 % der Redaktion gehen.',
    verified: 'Medien-Transparenzdatenbank Österreich',
    readingTime: '5 Min. Lesezeit',
    href: '/atlas',
  },
  {
    tag: 'NATO-Strukturen',
    punch: 'Atlantic Council',
    text: 'gilt als politischer Arm der NATO. In den Gremien sitzen frühere US-Geheimdienstkoordinatoren, NATO-Generalsekretäre, sowie die Chefs von Pfizer, Blackstone, Airbus und Edelman.',
    verified: '2 Quellen',
    readingTime: '6 Min. Lesezeit',
    href: '/atlas/atlantic-council',
  },
];
