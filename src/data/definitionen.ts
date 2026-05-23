// „Was ist …?" — pointierte Definitionen offizieller und halb­offizieller
// Begriffe aus dem Umfeld des Wahrheitskomplexes.
// Der Browser wählt beim Page-Load drei zufällige Einträge aus dem Pool.
//
// Begriffe mit `slug` und `volltext` bekommen eine eigene Detail-Seite
// unter /glossar/[slug] mit dem Volltext, einer strukturierten
// Quellen-Liste und BreadcrumbList-Schema. Die „Was ist …?"-Karte zeigt
// dann zusätzlich einen „Mehr →"-Link auf diese Seite.

export type Quelle = {
  label: string;
  href?: string;
};

export type Definition = {
  term: string;
  antwort: string;
  quelle: string; // Wer hat das so definiert / wer nutzt den Begriff (Kurz-Form)
  link?: { label: string; href: string }; // optionaler Verweis (Atlas, Chronik, Buchkapitel)
  slug?: string; // wenn vorhanden: Detail-Seite /glossar/[slug]
  volltext?: string[]; // Absätze in Reihenfolge (Markdown-freier Fließtext)
  quellenDetail?: Quelle[]; // strukturierte Quellen mit optionaler URL
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
    slug: 'kognitive-kriegsfuehrung',
    antwort:
      'Laut NATO Teil des Kriegskunst-Imperativs der kognitiven Überlegenheit durch Verbesserung unserer kognitiven Prozesse. Einsatzgebiet sind laut NATO alle Menschen, ob Freund oder Feind.',
    quelle: 'NATO Innovation Hub, „Cognitive Warfare" (2020)',
    volltext: [
      'Laut NATO Teil des Kriegskunst-Imperativs der kognitiven Überlegenheit durch Verbesserung unserer kognitiven Prozesse. Einsatzgebiet sind laut NATO alle Menschen, ob Freund oder Feind (zitiert nach Tögel).',
      'Der [NATO Innovation Hub](https://innovationhub-act.org/) schreibt über „Cognitive Warfare", sie sei der militärische Kampf auf einem neuen Schlachtfeld – unseren Köpfen. Kognitive Kriegsführung bedeute eine Verlagerung von Konflikten auf die Beeinflussung des menschlichen Denkens. Diese ergebe sich durch Fortschritte in den Neurowissenschaften, KI und Ausbreitung der Sozialen Medien.',
      'Kognitive Kriegsführung ist ein Teilgebiet der hybriden Kriegsführung, die alle feindlichen Aktivitäten jenseits des traditionellen Kriegs mit Zerstörungs- und Tötungsgeräts umfasst.',
      'Um den Krieg um die Köpfe besser führen zu können, gründete die NATO 2014 unter deutscher Beteiligung in Riga das [Strategic Communications Center of Excellence](https://stratcomcoe.org/), kurz: StratCom COE. »Strategische Kommunikation« ist das höfliche Wort für (militärische) Propaganda. Das Bundesverteidigungsministerium nennt als Beispiele für hybride Bedrohungen „gezielte Falschinformationen und -meldungen in den Medien, Beeinflussung des Meinungsklimas und Wahlbeeinflussung in liberalen Demokratien und offenen Gesellschaften". (Wahlbeeinflussung in aus westlicher Sicht nicht-demokratischen Ländern fällt nicht unter hybride Kriegsführung, sondern unter Demokratieförderung.)',
      'Ziel der Angreifer sei es, »Gesellschaften zu destabilisieren und die öffentliche Meinung zu beeinflussen«, schreibt das Bundesverteidigungsministerium. Um dem zu begegnen, fasse die Bundesregierung zivile, militärische und polizeiliche Mittel zusammen und binde diese in das internationale und multilaterale Vorgehen ein. NATO und Geheimdienste dürfen sich also in Kooperation mit NGOs und Wissenschaftlern um die Verhinderung der Verbreitung von Desinformation und der Beeinflussung von Wahlen kümmern.',
    ],
    quellenDetail: [
      { label: 'Buch „Der Wahrheitskomplex", Kap. 5' },
      {
        label: 'NATO Innovation Hub: Cognitive Warfare (2020)',
        href: 'https://innovationhub-act.org/',
      },
      {
        label: 'NATO Strategic Communications Centre of Excellence, Riga',
        href: 'https://stratcomcoe.org/',
      },
    ],
    link: { label: 'Buch, Kap. 5', href: '/buch#kapitel-5' },
  },
  {
    term: 'Meinungsfreiheit',
    slug: 'meinungsfreiheit',
    antwort:
      'Wenn es nach der UN und den Unterzeichnerstaaten einer UN-Erklärung geht, setzt Meinungsfreiheit diverse und verlässliche Informationsquellen und die staatliche Bekämpfung von Desinformation voraus.',
    quelle: 'UN „Global Principles on Information Integrity" (2024)',
    volltext: [
      'Traditionell versteht man unter Meinungs- und Informationsfreiheit das Recht und die Möglichkeit, seine Meinung frei von Repressionen zu äußern und sie zu verbreiten und sich aus selbst gewählten und frei zugänglichen Quellen zu informieren. Gemäß den [„Global Principles on Information Integrity"](https://www.un.org/sites/un2.un.org/files/un-global-principles-for-information-integrity-en.pdf) der UN von 2024 setzt die Ausübung dieser Rechte voraus, dass die Öffentlichkeit „konsistenten Zugang zu diversen und verlässlichen Informationsquellen hat", da die Menschen nur so „wohlinformierte und unabhängige Entscheidungen" treffen können. Die Staaten sollen für diese „Informationsintegrität" sorgen, insbesondere durch Bekämpfung von Desinformation. Meinungs- und Informationsfreiheit wird so in ein „Recht auf verlässliche Informationen" umgedeutet, für die wohlmeinende Regenten zu sorgen haben.',
      'Eine Suche nach dem Ursprung dieser pervertierten UN-Definition von Meinungs- und Informationsfreiheit führt zu einer der dicksten Spinnen im internationalen Netz der Wahrheitskontrolleure: dem [Institute for Strategic Dialogue](/portraits/institute-for-strategic-dialogue). ISD-Gründerin und Chefin Sasha Havlicek gründete nämlich zusammen mit der maßgeblich vom französischen Staat finanzierten Organisation [Reporter ohne Grenzen](https://rsf.org/de) und anderen das „Forum on Information and Democracy". Dieses Forum setzte eine Kommission unter Leitung des Generalsekretärs von Reporter ohne Grenzen ein, die 2018 eine „Internationale Erklärung über Information und Demokratie" verabschiedete. Diese enthielt die Umdefinition des Rechts auf Informationsfreiheit zum Recht, sich blind auf alle veröffentlichten Informationen verlassen zu können, und die dadurch implizierte Notwendigkeit, irreführende Informationen zu beseitigen.',
      'Anschließend organisierte Havlicek auf der UN-Vollversammlung im September 2019 eine „Internationale Partnerschaft für Information und Demokratie" mit rund 50 Ländern, darunter auch Deutschland. Die Unterzeichnerstaaten verpflichteten sich dazu, „nationale und internationale Rechtsrahmen zu fördern, die die Meinungsfreiheit und den Zugang zu verlässlichen Informationen fördern". Was vielen Delegierten vielleicht nicht klar war: Durch Verweis auf die „Internationale Erklärung über Information und Demokratie" verpflichteten sie sich damit gleichzeitig auf die umgedeutete Informationsfreiheit im Sinne einer von oben hergestellten Informationsverlässlichkeit. Die UN arbeitete auf dieser Basis weiter mit dem Ergebnis der besagten [Globalen Prinzipien für Informationsintegrität](https://www.un.org/sites/un2.un.org/files/un-global-principles-for-information-integrity-en.pdf).',
    ],
    quellenDetail: [
      { label: 'Buch „Der Wahrheitskomplex", S. 183 ff.' },
      {
        label: 'UN-PDF, insbesondere S. 3 und S. 12',
        href: 'https://www.un.org/sites/un2.un.org/files/un-global-principles-for-information-integrity-en.pdf',
      },
    ],
    link: { label: 'Im Porträt: Institute for Strategic Dialogue', href: '/portraits/institute-for-strategic-dialogue' },
  },
  {
    term: 'Prebunking',
    slug: 'prebunking',
    antwort:
      'Vorbeugende Immunisierung der Öffentlichkeit gegen aufkommende machtkritische Thesen, bevor diese eine breite Öffentlichkeit erreichen, z.B. indem man die Verbreiter oder deren übliche Stilmittel in Misskredit bringt.',
    quelle: 'Buch „Der Wahrheitskomplex", Kap. 2, 3 und 5',
    volltext: [
      'Vorbeugende Immunisierung der Öffentlichkeit gegen aufkommende machtkritische Thesen, bevor diese eine breite Öffentlichkeit erreichen, z.B. indem man die Verbreiter oder deren bevorzugte Stilmittel in Misskredit bringt.',
      'Prebunking ist eine sprachliche Abwandlung von „Debunking", dem Widerlegen von Behauptungen. Ein von Google finanziertes Projekt namens [„Prebunking at Scale"](https://blog.google/around-the-globe/google-europe/prebunking-misinformation/) will ein KI-Werkzeug entwickeln, das vorhersagt, in welcher Sprache und zu welchem Thema sich „Desinformation" bald verbreiten wird. Diese können kooptierte Influencer und Faktenchecker dann vorsorglich durch entsprechende Kontext-Artikel konterkarieren. Im Resümee eines transatlantischen Projekts zur Vernetzung von Influencern mit dem Wahrheitssektor heißt es, die teilnehmenden Influencer seien bereit, sich im Prebunking zu betätigen.',
      'Im Sinne der vorgeschlagenen „strategischen Allianz von Influencern und zivilgesellschaftlichen Organisationen" darf man sich das so vorstellen: Der informationstechnisch hochgerüstete NGO-Sektor weist Influencer frühzeitig auf kritische Narrative hin, die heiß werden könnten. Diese diskreditieren vorbeugend die kritischen Narrative oder deren wichtigste potenzielle Verbreiter. Wichtige Themen für das Prebunking sind Impfungen, Klimakrise, Militär und Geopolitik, Migration, KI und Digitale Identität.',
      'Schon Schulkinder sollen gegen das Virus dissidenten Gedankenguts geimpft werden. Sie sollen lernen, dass alles, was die typischen Merkmale regierungs- und NATO-kritischer Beiträge aufweist, wahrscheinlich Desinformation ist. Entsprechende „Medienkompetenz" soll laut einer Entschließung des EU-Parlaments in allen Schulen der Mitgliedsstaaten gelehrt werden. Dazu werden unter anderem Lernspiele eingesetzt, die in Kooperation mit der NATO entwickelt wurden.',
      'Für die Immunisierung Erwachsener gegen abweichende Gedanken hat die Google-Tochter [Jigsaw](https://jigsaw.google.com/) YouTube-Videos entwickelt, die Millionen Nutzern per YouTube ausgespielt werden. Die EU-Kommission empfiehlt solche „Inokulationsmaßnahmen" ausdrücklich allen großen Online-Plattformen in ihren Richtlinien für die Anwendung des DSA im Zusammenhang mit Wahlen. Damit sollen sie vorbeugend Widerstandsfähigkeit der Nutzer und Wähler gegen Desinformationsnarrative und Manipulationstechniken aufbauen.',
    ],
    quellenDetail: [
      { label: 'Buch „Der Wahrheitskomplex", Kap. 2, 3 und 5' },
      { label: 'Google Jigsaw', href: 'https://jigsaw.google.com/' },
      {
        label: 'EU-Parlament: Resolution gegen ausländische Einflussnahme (März 2022)',
        href: 'https://www.europarl.europa.eu/doceo/document/TA-9-2022-0064_DE.html',
      },
    ],
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
    term: 'Antisemitismus',
    slug: 'antisemitismus',
    antwort:
      'Viel mehr als judenfeindliches Gedankengut. Wenn es nach Amadeu Antonio Stiftung und Verfassungsschutz geht, ist jegliche Kritik an mächtigen oder geheimniskrämerischen Menschen und Institutionen antisemitisch.',
    quelle: 'Buch „Der Wahrheitskomplex", Kap. 3 und Chronik (2. Aufl.)',
    volltext: [
      '… ist viel mehr als judenfeindliches Gedankengut. Wenn es nach Amadeu Antonio Stiftung und Verfassungsschutz geht, ist jegliche Kritik an mächtigen oder geheimniskrämerischen Menschen und Institutionen antisemitisch.',
      'Die [Amadeu Antonio Stiftung](/portraits/amadeu-antonio-stiftung) ist eine der staatlicherseits bestfinanzierten und einflussreichsten NGOs des Wahrheitskomplexes. Die Stiftung engagiert sich gegen Rechtsextremismus, Antisemitismus und Ausländerfeindlichkeit. Im Aufsichtsgremium sitzt unter anderem der Präsident des Thüringer Verfassungsschutzes. Die Gründerin und langjährige Vorsitzende Annetta Kahane war zuvor Informelle Mitarbeiterin des Staatsschutzes der DDR gewesen.',
      'Nach der – allen Gesetzen der Logik widersprechenden – Argumentation der Stiftung ist alles, was als Verschwörungstheorie abgewertet werden kann, gleichzeitig antisemitisch. Denn Antisemitismus sei die Mutter aller Verschwörungstheorien. Eine Verschwörungstheorie – im Gegensatz zu legitimer Machtkritik – liegt vor, wenn den Mächtigen unterstellt wird, dass sie anderes als das Beste der Machtlosen im Sinne hätten.',
      'Das Bundesamt für Verfassungsschutz übernahm diese absurde Definition von Antisemitismus weitgehend. Er nahm sich, wie von Kahane gefordert, intensiv der coronamaßnahmenkritischen Bewegung und unterstellte ihr pauschal eine Nähe zum Rechtsextremismus und Antisemitismus. In einer Ausarbeitung zur Unterfütterung der Einstufung der AfD als „gesichert rechtsextrem" und in einer Broschüre über angeblich „Antisemitische Codes und Chiffren" entlarvt der Verfassungsschutz Kritik an Bill Gates, den Rockefellers, dem Weltwirtschaftsforum, Big Pharma, Wall Street und vielen weiteren nichtjüdischen Personen und Institutionen als angebliche antisemitische Chiffren.',
      'Personen und Institutionen, die von der Stiftung und dieser folgenden NGOs des Wahrheitskomplexes auf diese Weise als antisemitisch diffamiert werden, müssen damit rechnen, dass ihre Auftritte verhindert werden (Cancel Culture), ihre Beiträge auf den sozialen Medien gelöscht oder ausgebremst werden und sie mit Werbeboykotten belegt werden. Wer vom Verfassungsschutz als Person oder Institution als antisemitischer/rechtsradikaler Verdachtsfall eingestuft wird, kann schwerwiegende Nachteile erleiden, bis hin zum Verlust des Arbeitsplatzes oder des passiven Wahlrechts oder einem Parteiverbot.',
    ],
    quellenDetail: [
      { label: 'Buch „Der Wahrheitskomplex", Kap. 3 und Chronik (2. Aufl.)' },
      {
        label: 'Bundesamt für Verfassungsschutz: „Antisemitische Codes und Chiffren"',
        href: 'https://www.verfassungsschutz.de/',
      },
    ],
    link: { label: 'Im Porträt: Amadeu Antonio Stiftung', href: '/portraits/amadeu-antonio-stiftung' },
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
      label: 'Im Porträt: Internews',
      href: '/portraits/internews-earth-journalism-network',
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
