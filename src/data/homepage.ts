// Einstiegs-Karten für das Startseiten-Karussell.
// Speist sich aus Buchquellen (Atlas-Akteure, Recherchen) und aktuellen
// Häring-Beiträgen. Bei Pflege: ältesten/passensten Eintrag rausnehmen,
// neuen oben einfügen — Reihenfolge im Array = Reihenfolge im Karussell.

export type HookCard = {
  tag: string;
  punch: string;
  text: string;
  meta: string; // Beleg-Hinweis (Quelle, Buchkapitel)
  href: string;
};

export const hookCards: HookCard[] = [
  {
    tag: 'Geldflüsse',
    punch: '200 Mio. €',
    text:
      'gab die Bundesregierung 2021/2022 jährlich für Werbung in Medien aus — vor allem an Ad Alliance, Springer, FAZ, Funke, Burda, Süddeutsche.',
    meta: 'Parlamentarische Anfragen · Buch Kap. 1',
    href: '/recherchen#werbeausgaben-bundesregierung',
  },
  {
    tag: 'Wissenschaftskommunikation',
    punch: '2.200 Journalist:innen',
    text:
      'sind beim Science Media Center Germany akkreditiert. Die Vorauswahl der Statements bleibt für Leser:innen unsichtbar.',
    meta: 'SMC-Eigenangabe · Buch Kap. 1',
    href: '/atlas/science-media-center-germany',
  },
  {
    tag: 'NATO-Strukturen',
    punch: 'Atlantic Council',
    text:
      'gilt im Buch als politischer Arm der NATO. In den Gremien: ehemalige US-Geheimdienstkoordinatoren, NATO-Generalsekretäre, Konzernchefs.',
    meta: 'Atlantic Council Reports · Buch Kap. 5',
    href: '/atlas/atlantic-council',
  },
  {
    tag: 'DSA & NetzDG',
    punch: 'Aus SOMA wird EDMO',
    text:
      'Die EU finanziert eine Stelle, die EU-bezogene Inhalte auf Verlässlichkeit prüft — und liefert die Daten zugleich in den DSA-Vollzug.',
    meta: 'EU-Kommission · Buch Kap. 3',
    href: '/atlas/edmo',
  },
  {
    tag: 'Klima',
    punch: '25.000 Klimajournalist:innen',
    text:
      'qualifiziert Internews weltweit über das Earth Journalism Network — finanziert überwiegend aus US-Außen­politik-Budgets (USAID, State Department).',
    meta: 'Internews-Jahresberichte · Buch Kap. 5',
    href: '/atlas/internews-earth-journalism-network',
  },
  {
    tag: 'Stiftungs-Faktencheck',
    punch: 'Correctiv',
    text:
      'ist Meta-Partner für deutschsprachige Faktenchecks und gleichzeitig Empfänger von Stiftungs- und Bundesmitteln. Eine Konstellation, die Häring strukturell aufschlüsselt.',
    meta: 'Westend Verlag 2026 · Buch Kap. 2',
    href: '/atlas/correctiv',
  },
  {
    tag: 'Hass und Hetze',
    punch: 'Vom NetzDG zum DSA',
    text:
      'Die jahrelange argumentative Vorarbeit der Amadeu Antonio Stiftung wanderte fast unverändert ins NetzDG — und später in den Digital Services Act.',
    meta: 'Programmberichte „Demokratie leben!" · Buch Kap. 2',
    href: '/atlas/amadeu-antonio-stiftung',
  },
  {
    tag: 'Geheimdienste',
    punch: 'Institute for Strategic Dialogue',
    text:
      'Eine als zivilgesellschaftlich auftretende NGO, die mit Five-Eyes-Geheimdiensten und NATO-Programmen verflochten ist — und maßgeblich DSA und NetzDG geprägt hat.',
    meta: 'Buch Kap. 5 · DCMS-Förderübersichten',
    href: '/atlas/institute-for-strategic-dialogue',
  },
  {
    tag: 'Agentur-Faktencheck',
    punch: 'dpa-Faktencheck',
    text:
      'Eine Nachrichtenagentur, deren Mehrheitsstruktur auf Mediengesellschafter und öffentlich-rechtliche Anstalten zurückgeht, prüft Aussagen genau dieser Sphäre.',
    meta: 'dpa-Eigenangaben · Buch Kap. 2',
    href: '/atlas/dpa-faktencheck',
  },
  {
    tag: 'Aktuelles',
    punch: 'WHO-Gesundheitsnotstand?',
    text:
      'Eine WHO-Kommission fordert wegen des Klimawandels den internationalen Gesundheitsnotstand auszurufen. Ein WHO-Notstand gäbe der EU unter DSA erweiterte Rechte gegenüber Plattformen.',
    meta: 'Häring · Mai 2026',
    href: 'https://norberthaering.de/propaganda-zensur/who-gesundheitsnotstand/',
  },
];
