// „Was ist …?" — pointierte Definitionen offizieller und halb­offizieller
// Begriffe aus dem Umfeld des Wahrheitskomplexes.
// Der Browser wählt beim Page-Load drei zufällige Einträge aus dem Pool.

export type Definition = {
  term: string;
  antwort: string;
  quelle: string; // Wer hat das so definiert / wer nutzt den Begriff
  link?: { label: string; href: string }; // optionaler Verweis (Atlas, Chronik, Buchkapitel)
};

export const definitionen: Definition[] = [
  {
    term: 'Wahrheit',
    antwort:
      'Im Sprachgebrauch des EU-Digital-Services-Act: das, was von akkreditierten Faktencheck-Stellen als „verlässlich" eingestuft wird. Wahrheit wird so zur prozeduralen Eigenschaft, nicht zum Sachverhalt.',
    quelle: 'Digital Services Act, Erwägungsgründe',
    link: { label: 'Mehr im Buch, Kap. 3', href: '/buch#kapitel-3' },
  },
  {
    term: 'Kognitive Kriegsführung',
    antwort:
      '„Manipulation der menschlichen Wahrnehmung mit dem Ziel, nicht nur zu beeinflussen, was Menschen denken, sondern wie sie denken und handeln" — eine NATO-Definition aus dem Jahr 2020.',
    quelle: 'NATO Innovation Hub, „Cognitive Warfare" (2020)',
    link: { label: 'Buch, Kap. 5', href: '/buch#kapitel-5' },
  },
  {
    term: 'Meinungsfreiheit',
    antwort:
      'Im EU-Aktionsplan gegen Desinformation neu gefasst als „Freiheit vor Desinformation". Aus einem Abwehrrecht gegen den Staat wird ein Schutzanspruch — vor anderen Stimmen.',
    quelle: 'EU-Aktionsplan gegen Desinformation (2018), Digital Services Act',
    link: { label: 'Atlas: EDMO', href: '/atlas/edmo' },
  },
  {
    term: 'Prebunking',
    antwort:
      'Vorbeugende „Inokulation" der Öffentlichkeit gegen Inhalte, die noch gar nicht veröffentlicht sind. Das EU-Parlament hat 2022 eine eigene Entschließung dafür beschlossen.',
    quelle: 'EU-Parlament, Entschließung März 2022',
    link: { label: 'Chronik 2022', href: '/chronik#jahr-2022' },
  },
  {
    term: 'StratCom',
    antwort:
      'Kurz für „Strategic Communications": Bündelung aller Kommunikations­mittel zur Erreichung strategischer — meist militärischer — Ziele. Die NATO unterhält dafür ein eigenes Centre of Excellence in Riga.',
    quelle: 'NATO StratCom Centre of Excellence (gegründet 2014)',
    link: { label: 'Chronik 2014', href: '/chronik#jahr-2014' },
  },
  {
    term: 'Antisemitismus (nach AAS)',
    antwort:
      'Die Amadeu Antonio Stiftung legt die IHRA-Arbeitsdefinition zugrunde, deren Beispiele bestimmte Formen der Israel-Kritik einschließen. Der Begriff dehnt sich damit weit über die klassische Bedeutung hinaus.',
    quelle: 'IHRA-Arbeitsdefinition (2016); AAS-Bildungsmaterial',
    link: {
      label: 'Akteur im Atlas',
      href: '/atlas/amadeu-antonio-stiftung',
    },
  },
  {
    term: 'Delegitimierung',
    antwort:
      'Vom Bundesamt für Verfassungsschutz 2021 als „Phänomenbereich verfassungsschutzrelevante Delegitimierung des Staates" eingeführt — eine Kategorie unterhalb des Extremismus. Im April 2026 wieder abgeschafft.',
    quelle: 'BfV, Lagebericht 2021 / Beendigung 2026',
    link: { label: 'Chronik 2021', href: '/chronik#jahr-2021' },
  },
  {
    term: 'Schädliche Information',
    antwort:
      'EU-Kommissions-Begriff für Inhalte, die zwar legal sind, aber „demokratische Prozesse" oder „öffentliches Vertrauen" gefährden könnten. Im DSA Grundlage für Plattform-Auflagen jenseits des Strafrechts.',
    quelle: 'EU-Kommission, DSA-Begleitdokumente',
    link: { label: 'Buch, Kap. 3', href: '/buch#kapitel-3' },
  },
  {
    term: 'Hybrides Eingreifteam',
    antwort:
      'Vom EU-Rat im April 2024 beschlossene zivil-militärische Schnell­einsatz­einheit gegen „hybride Bedrohungen" — ein Begriff, der von Desinformation bis Sabotage alles umfasst.',
    quelle: 'EU-Rat, Beschluss April 2024',
    link: { label: 'Chronik 2024', href: '/chronik#jahr-2024' },
  },
  {
    term: 'Klimajournalismus',
    antwort:
      'Definiert über die Trainings- und Förder-Programme von Internews und seinem Earth Journalism Network — einem Netzwerk von rund 25.000 Journalist:innen weltweit, überwiegend US-Außenpolitik-finanziert.',
    quelle: 'Internews / Earth Journalism Network (Eigenangaben)',
    link: {
      label: 'Atlas: Internews',
      href: '/atlas/internews-earth-journalism-network',
    },
  },
  {
    term: 'Hybride Kriegsführung',
    antwort:
      'NATO-/EU-Sammelbegriff seit etwa 2014. Umfasst neben militärischen auch politische, wirtschaftliche und vor allem informationelle Mittel — und macht damit zivile Diskursräume zum Schlachtfeld.',
    quelle: 'NATO-Doktrin; EU Hybrid Toolbox',
    link: { label: 'Buch, Kap. 5', href: '/buch#kapitel-5' },
  },
];
