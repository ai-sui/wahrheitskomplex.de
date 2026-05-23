export type GlossarEintrag = {
  term: string;
  longForm?: string;
  definition: string;
  siehe?: { label: string; href: string }[];
};

export const glossar: GlossarEintrag[] = [
  {
    term: 'DSA',
    longForm: 'Digital Services Act',
    definition:
      'EU-Verordnung von 2022, die Plattform-Betreiber zu Transparenz, Risiko­bewertung und Inhalts-Moderation verpflichtet. Wird seit 2024 schrittweise vollzogen; EDMO und nationale Faktenchecker sind in den Vollzug eingebunden.',
    siehe: [
      { label: 'EDMO', href: '/portraits/edmo' },
      { label: 'Amadeu Antonio Stiftung', href: '/portraits/amadeu-antonio-stiftung' },
    ],
  },
  {
    term: 'NetzDG',
    longForm: 'Netzwerkdurchsetzungsgesetz',
    definition:
      'Deutsches Gesetz von 2017, das soziale Netzwerke verpflichtet, „offensichtlich rechtswidrige" Inhalte binnen 24 Stunden zu löschen. Vorläufer der DSA-Logik. Seine Argumentation wurde maßgeblich von zivilgesellschaftlichen Akteuren mitgeprägt.',
    siehe: [{ label: 'Amadeu Antonio Stiftung', href: '/portraits/amadeu-antonio-stiftung' }],
  },
  {
    term: 'IFCN',
    longForm: 'International Fact-Checking Network',
    definition:
      'Verbund von Faktencheck-Organisationen unter dem Dach des Poynter Institute (USA). Zertifiziert die Methodik seiner Mitglieder; gilt als Eingangsticket für Faktencheck-Partnerschaften mit Plattformen wie Meta.',
    siehe: [
      { label: 'Correctiv', href: '/portraits/correctiv' },
      { label: 'dpa-Faktencheck', href: '/portraits/dpa-faktencheck' },
    ],
  },
  {
    term: 'EDMO',
    longForm: 'European Digital Media Observatory',
    definition:
      'EU-finanziertes Dachnetzwerk aus Faktencheckern, Forschungs­einrichtungen und Behörden. Liefert Lageberichte zu Desinformation an die EU-Kommission und ist eingebunden in den DSA-Vollzug.',
    siehe: [{ label: 'EDMO-Profil', href: '/portraits/edmo' }],
  },
  {
    term: 'SMC',
    longForm: 'Science Media Center',
    definition:
      'Vermittlungsstelle, die akkreditierten Journalist:innen Statements ausgewählter Wissenschaftler:innen liefert. Das deutsche SMC sitzt in Köln, wurde 2015 gegründet und ist überwiegend von der Klaus Tschira Stiftung finanziert.',
    siehe: [{ label: 'SMC-Profil', href: '/portraits/science-media-center-germany' }],
  },
  {
    term: 'Five Eyes',
    definition:
      'Geheimdienst-Verbund aus USA, Großbritannien, Kanada, Australien und Neuseeland. Tauschen seit 1946 Signal- und Cyber-Aufklärung aus; zunehmend auch Informationen über „Online-Bedrohungen" und Desinformation.',
    siehe: [{ label: 'ISD', href: '/portraits/institute-for-strategic-dialogue' }],
  },
  {
    term: 'USAID',
    longForm: 'U.S. Agency for International Development',
    definition:
      'US-Bundesbehörde für Entwicklungszusammenarbeit; einer der größten staatlichen Geldgeber für Medien-NGOs in Entwicklungs- und Transformationsländern. 2025 unter Trump aufgelöst; Folgestrukturen befinden sich im Umbau.',
    siehe: [{ label: 'Internews', href: '/portraits/internews-earth-journalism-network' }],
  },
  {
    term: 'DCMS',
    longForm: 'Department for Science, Innovation and Technology (UK)',
    definition:
      'Britisches Ministerium für Digitales — bis 2023 unter dem Namen DCMS (Department for Digital, Culture, Media & Sport) bekannt. Hauptauftraggeber für Programme zur Online-Inhaltsregulierung; finanziert u.a. das ISD.',
    siehe: [{ label: 'ISD', href: '/portraits/institute-for-strategic-dialogue' }],
  },
  {
    term: 'Demokratie leben!',
    definition:
      'Bundesförderprogramm des BMFSFJ (heute BMFSFJ/BMI), das seit 2015 Stiftungen, Vereine und Trägern der politischen Bildung finanziert. Die Amadeu Antonio Stiftung gehört zu den größten Empfängern.',
    siehe: [{ label: 'Amadeu Antonio Stiftung', href: '/portraits/amadeu-antonio-stiftung' }],
  },
  {
    term: 'Liber-Net',
    definition:
      'Internationale Datenbank, die Akteure, Geldflüsse und Strukturen rund um Faktencheck- und Plattform­regulierungs-Politik dokumentiert. Wird in den Akteurs-Profilen als ergänzende Quelle verlinkt.',
  },
];
