export type Recherche = {
  slug: string;
  tag: string;
  frage: string;
  mainstream: string;
  recherche: string;
  quelle: string;
  haeringLink?: string;
  atlasLink?: string;
  buchKapitel?: string;
};

export const recherchen: Recherche[] = [
  {
    slug: 'werbeausgaben-bundesregierung',
    tag: 'Geldflüsse',
    frage: 'Wie viel Werbung kauft die Bundesregierung in deutschen Medien?',
    mainstream:
      'Staatliche Werbung wird in der Berichterstattung selten thematisiert; wenn doch, gilt sie als „normale Öffentlichkeitsarbeit".',
    recherche:
      'Antworten auf parlamentarische Anfragen zeigen rund 200 Mio. € pro Jahr (2021/2022). Die größten Empfänger sind exakt die Verlage, die im redaktionellen Teil über Regierungsarbeit berichten — Ad Alliance, Springer, FAZ, Funke, Burda, Süddeutsche.',
    quelle: 'Antworten der Bundesregierung auf parlamentarische Anfragen',
    haeringLink: 'https://norberthaering.de/wahrheitskomplex/finanzierer/',
    buchKapitel: 'Kapitel 1',
  },
  {
    slug: 'science-media-center-statements',
    tag: 'Wissenschaftskommunikation',
    frage: 'Sind Experten-Statements in Pandemie-Berichten redaktionell ausgewählt?',
    mainstream:
      'Wissenschaftliche Einordnungen erscheinen in Redaktionen als unabhängige journalistische Recherche.',
    recherche:
      'Das Science Media Center Germany liefert akkreditierten Journalist:innen vorausgewählte Statements. Die Auswahl ist für Leser:innen nicht erkennbar — gleiche Zitate erscheinen gleichzeitig in Dutzenden Medien.',
    quelle: 'SMC-Website, eigene Verlautbarungen, Recherchen Norbert Häring',
    haeringLink: 'https://norberthaering.de/propaganda-zensur/science-media-center/',
    atlasLink: '/atlas/science-media-center-germany',
    buchKapitel: 'Kapitel 1',
  },
  {
    slug: 'netzdg-amadeu-antonio',
    tag: 'DSA & NetzDG',
    frage: 'Woher kam die Logik des NetzDG?',
    mainstream:
      'Das NetzDG (2017) wurde als Reaktion auf „Hass im Netz" aus der Mitte der Gesellschaft beschrieben.',
    recherche:
      'Die argumentative Vorarbeit lieferten über Jahre staatlich kofinanzierte Stiftungen, allen voran die Amadeu Antonio Stiftung. Ihre Vorschläge — Plattformen müssen melden, löschen, dokumentieren — wanderten nahezu unverändert ins Gesetz und später in den DSA.',
    quelle: 'Programmberichte „Demokratie leben!“, Stiftungsdokumente',
    haeringLink: 'https://norberthaering.de/wahrheitskomplex/finanzierer/',
    atlasLink: '/atlas/amadeu-antonio-stiftung',
    buchKapitel: 'Kapitel 2',
  },
  {
    slug: 'atlantic-council-faktencheck',
    tag: 'NATO-Strukturen',
    frage: 'Wer formulierte die theoretische Begründung des Faktencheckens?',
    mainstream:
      'Faktencheckerei wird als neutrale, methodisch strenge Form des Journalismus dargestellt.',
    recherche:
      'Eine zentrale theoretische Begründung kommt aus Publikationen des Atlantic Council — eines Think Tanks, dessen Beiräte mit ehemaligen US-Geheimdienstkoordinatoren, NATO-Generalsekretären und Konzernchefs besetzt sind. Die Empfehlungen wandern in westliche Plattform-Regulierung.',
    quelle: 'Atlantic Council Reports, NATO-Publikationen, Recherchen Norbert Häring',
    haeringLink: 'https://norberthaering.de/spinnen-im-netz/atlantic-council/',
    atlasLink: '/atlas/atlantic-council',
    buchKapitel: 'Kapitel 5',
  },
  {
    slug: 'klima-journalismus-internews',
    tag: 'Klima',
    frage: 'Wie unabhängig ist die globale Klima-Berichterstattung?',
    mainstream:
      'Klimajournalismus erscheint als Reaktion einer freien Presse auf wissenschaftliche Befunde.',
    recherche:
      'Internews und sein Earth Journalism Network qualifizieren rund 25.000 Klimajournalist:innen weltweit. Finanziert wird das überwiegend aus US-Bundesmitteln (USAID, State Department) und großen Stiftungen — eine in den Beiträgen nicht ausgewiesene Förderkette.',
    quelle: 'Förderübersichten USAID, Internews-Jahresberichte',
    haeringLink: 'https://norberthaering.de/propaganda-zensur/internews/',
    atlasLink: '/atlas/internews-earth-journalism-network',
    buchKapitel: 'Kapitel 5',
  },
  {
    slug: 'edmo-dsa-rolle',
    tag: 'DSA & NetzDG',
    frage: 'Wer beobachtet die EU-Faktencheck-Landschaft?',
    mainstream:
      'Faktencheck-Netzwerke werden als unabhängige Mehrwerts-Schicht gegenüber Plattformen beschrieben.',
    recherche:
      'Das European Digital Media Observatory (EDMO) wird von der EU-Kommission finanziert, prüft Inhalte mit EU-Bezug und liefert seine Daten zugleich in den DSA-Vollzug. Auftraggeber, Prüfer und Vollzieher sitzen so eng beieinander, dass die Sphären verschwimmen.',
    quelle: 'EDMO-Charta, EU-Kommissions-Förderübersichten',
    haeringLink: 'https://norberthaering.de/spinnen-im-netz/edmo/',
    atlasLink: '/atlas/edmo',
    buchKapitel: 'Kapitel 3',
  },
];
