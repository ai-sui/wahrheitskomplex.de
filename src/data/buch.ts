// Kapitel-Struktur des Buchs auf Basis des Inhaltsverzeichnisses
// auf norberthaering.de/wahrheitskomplex/inhaltsverzeichnis/

export type Kapitel = {
  nr: number;
  title: string;
  matches: string; // String, der im actor/recherche-buchKapitel-Feld vorkommt
  abstract: string;
  unterabschnitte: string[];
};

export const kapitel: Kapitel[] = [
  {
    nr: 1,
    title: 'Der Wahrheitskomplex bei der Arbeit',
    matches: 'Kapitel 1',
    abstract:
      'Bestandsaufnahme: Wie der Komplex tagtäglich wirkt, vom „Einnorden" etablierter Medien über Faktencheck-Verfahren und Werbeboykotte bis zu Meldestellen und Cancel-Culture-Mustern.',
    unterabschnitte: [
      'Wie etablierte Medien eingenordet werden',
      'Die Faktenchecker, ihre Zielscheiben und Methoden',
      'Werbeboykott und Kontenkündigungen',
      '»Staatsferne« Aufsicht über unabhängige Medien',
      'Wider die gefährlichen Bücher',
      'Cancel Culture: Maulkörbe für Abweichler',
      'Meldestellen: Einäugige Tugendwächter',
    ],
  },
  {
    nr: 2,
    title: 'Die Errichtung des deutschen Wahrheitskomplexes',
    matches: 'Kapitel 2',
    abstract:
      'Die deutsche Ausprägung — von Heiko Maas und der Amadeu Antonio Stiftung zu Facebook, über stiftungsfinanzierte Faktencheck-Strukturen bis zur Andockung an US-Vorgaben.',
    unterabschnitte: [
      'Heiko Maas und die Amadeu Antonio Stiftung nehmen sich Facebook vor',
      'Faktenchecker aus dem Schoß der Stiftung',
      'Der offizielle Schulterschluss mit den USA',
      'Influencer werden angedockt',
      'Ist der Wahrheitskomplex unangreifbar?',
    ],
  },
  {
    nr: 3,
    title: 'Die EU baut ihren Wahrheitskomplex auf',
    matches: 'Kapitel 3',
    abstract:
      'Die EU-Architektur: vom Verhaltenskodex über SOMA und EDMO bis zum Digital Services Act als „Wahrheitsgesetz" — und wie eine EU-Lizenz für Faktenchecker das System abrundet.',
    unterabschnitte: [
      'Ein Netzwerk aus Faktencheckern und Behörden',
      'Ein Verhaltenskodex gegen Desinformation',
      'Aus SOMA wird EDMO',
      'Eine EU-Lizenz für Faktenchecker',
      'DSA: Ein Wahrheitsgesetz als Krönung',
    ],
  },
  {
    nr: 4,
    title: 'Wahrheitskontrolle durch WHO und UN',
    matches: 'Kapitel 4',
    abstract:
      'Die internationale Ebene: Wie WHO und UN den Anspruch auf eine globale „wissenschaftliche Wahrheit" formulieren — und an welchen Stellen diese Wahrheit politisch verhandelt wurde.',
    unterabschnitte: ['UN: »Die Wissenschaft gehört uns«'],
  },
  {
    nr: 5,
    title: 'Wahrheitskontrolle im Dienste der NATO',
    matches: 'Kapitel 5',
    abstract:
      'Der Kern der These: Wahrheitskontrolle als Funktion militärischer Strategie. NATO-Strukturen, geheimdienstliche Vorgeschichten des Internets, Wahlsicherung, Propaganda-Krieg.',
    unterabschnitte: [
      'Das International Fact-Checking Network',
      'Europa steigt in den Propagandakrieg ein',
      'Die geheime militärische Geschichte des Internets',
      'Russia-Gate als inszenierter Anlass',
      'Feindeslisten für die USA und für Europa',
      'Militärische Steuerung des Wahrheitskomplexes',
      'Corona als Probe aufs Exempel',
      'Wahlsicherung im Dienste der NATO',
      'NATO-Informationskrieg in Deutschland',
      'Die EU schaltet auf Kriegsmodus',
    ],
  },
  {
    nr: 6,
    title: 'Ausblick und Gegenmaßnahmen',
    matches: 'Kapitel 6',
    abstract:
      'Was lässt sich tun. Häring skizziert Rückabwicklungsschritte, Plattform-Regulierung, individuelle Strategien — und plädiert für dezentrale, analoge Resilienz.',
    unterabschnitte: [
      'Den Wahrheitskomplex rückabwickeln',
      'Plattformen einhegen',
      'Was wir als Einzelne tun können',
      'Dezentral entscheiden, analog leben',
    ],
  },
];
