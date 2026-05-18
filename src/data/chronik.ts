// Chronik des Wahrheitskomplexes.
//
// Aufbau:
//   - Historische Anker-Ereignisse (1998–2025): rekonstruiert aus dem
//     Chronik-Anhang des Buchs und den Akteurs-Profilen.
//   - Aktuelle Einträge (Feb–Mai 2026): aus Härings „Chronik-Fortsetzung"
//     auf norberthaering.de/chronik-fortsetzung/.
//
// Datumsformat: YYYY-MM-DD wenn bekannt, sonst YYYY-MM (gerendert als
// „im Monat XY" / „Frühjahr XY" je nach Genauigkeit).

export type ChronikEintrag = {
  date: string; // YYYY-MM-DD oder YYYY-MM oder YYYY
  title: string;
  description: string;
  themen?: string[];
  actorSlug?: string; // wenn ein Atlas-Akteur betroffen ist
  haeringLink?: string;
  sourceLink?: string; // externer Beleg
};

export const chronik: ChronikEintrag[] = [
  // ---------- HISTORISCHE ANKER ----------
  {
    date: '1998',
    title: 'Amadeu Antonio Stiftung gegründet',
    description:
      'Anetta Kahane gründet die Stiftung zum Gedenken an den 1990 in Eberswalde ermordeten Vertragsarbeiter Amadeu Antonio. Sie wird in den 2010er Jahren zu einer der prägenden Stimmen für die spätere NetzDG-Gesetzgebung.',
    themen: ['Hass und Hetze', 'DSA & NetzDG'],
    actorSlug: 'amadeu-antonio-stiftung',
  },
  {
    date: '2006',
    title: 'Institute for Strategic Dialogue (ISD) gegründet',
    description:
      'In London entsteht eine als zivilgesellschaftlich auftretende Organisation gegen Radikalisierung. Sie wird sich zur zentralen Schnittstelle zwischen Geheimdiensten, NATO-Programmen und Online-Inhaltsregulierung entwickeln.',
    themen: ['Ukraine & NATO', 'DSA & NetzDG'],
    actorSlug: 'institute-for-strategic-dialogue',
  },
  {
    date: '2014',
    title: 'Correctiv gegründet',
    description:
      'Erste explizit non-profit organisierte Investigativ-Redaktion Deutschlands. Wenig später kommt die Faktencheck-Sparte hinzu, die zum Partner von Meta wird.',
    themen: ['Hass und Hetze'],
    actorSlug: 'correctiv',
  },
  {
    date: '2015',
    title: 'Science Media Center Germany gegründet',
    description:
      'Vermittlungsstelle für vorausgewählte Wissenschaftler-Statements an Redaktionen. Wird über die folgenden Jahre zu einem kaum sichtbaren, aber zentralen Akteur der deutschen Wissenschaftsberichterstattung.',
    themen: ['Pandemie', 'Klima'],
    actorSlug: 'science-media-center-germany',
  },
  {
    date: '2015',
    title: 'Bundesprogramm „Demokratie leben!" startet',
    description:
      'BMFSFJ-Förderprogramm, das in den Folgejahren zur Hauptfinanzierungsquelle vieler im Buch behandelter Stiftungen und NGOs wird — darunter Amadeu Antonio, HateAid, Teile von Correctiv.',
    themen: ['DSA & NetzDG', 'Hass und Hetze'],
  },
  {
    date: '2017-10-01',
    title: 'NetzDG tritt in Kraft',
    description:
      'Das Netzwerkdurchsetzungsgesetz verpflichtet Plattformen, „offensichtlich rechtswidrige" Inhalte binnen 24 Stunden zu löschen. Die argumentative Vorarbeit lieferten Stiftungen, allen voran die Amadeu Antonio Stiftung. Wird zur Blaupause für den EU-Digital-Services-Act.',
    themen: ['DSA & NetzDG'],
    actorSlug: 'amadeu-antonio-stiftung',
  },
  {
    date: '2020',
    title: 'EDMO (European Digital Media Observatory) gegründet',
    description:
      'EU-finanziertes Dachnetzwerk aus Faktencheckern, Forschungseinrichtungen und Behörden. Wird in den Folgejahren in den DSA-Vollzug eingebunden — die Kommission finanziert die Stelle, die ihrerseits Inhalte mit EU-Bezug bewertet.',
    themen: ['DSA & NetzDG'],
    actorSlug: 'edmo',
  },
  {
    date: '2021',
    title: 'Atlantic Council positioniert sich als „Wahrheits-Theoretiker"',
    description:
      'Eine Reihe von Publikationen des Atlantic Council formuliert die theoretische Begründung für institutionalisierte Faktencheckerei. Die Empfehlungen wandern in westliche Plattform-Regulierung — und in den späteren DSA.',
    themen: ['Ukraine & NATO', 'DSA & NetzDG'],
    actorSlug: 'atlantic-council',
  },
  {
    date: '2022-10-19',
    title: 'EU verabschiedet Digital Services Act (DSA)',
    description:
      'Die EU verabschiedet den DSA. Die Mechanismen — Melden, Löschen, Risiko-Audits, Faktencheck-Netzwerke — bauen auf NetzDG und ISD-Empfehlungen auf. Vollzug ab 2024.',
    themen: ['DSA & NetzDG'],
  },
  {
    date: '2024',
    title: 'DSA-Vollzug beginnt',
    description:
      'Die EU-Kommission startet den eigentlichen Vollzug des DSA. Plattformen müssen Risiken bewerten, Faktencheck-Daten integrieren, Maßnahmen dokumentieren. EDMO und Mitgliedstaat-Stellen liefern Lageberichte.',
    themen: ['DSA & NetzDG'],
    actorSlug: 'edmo',
  },

  // ---------- 2026 (aus Härings Chronik-Fortsetzung) ----------
  {
    date: '2026-02',
    title: 'OLG Frankfurt untersagt NewsGuard Achgut-Bewertung',
    description:
      'Das Oberlandesgericht Frankfurt (AZ: 6 U 92/25) untersagt NewsGuard, Achgut wegen unzureichender faktischer Grundlage als einen der zehn wichtigsten Verbreiter von Desinformation zu nennen und mit 35/100 zu bewerten. NewsGuard hatte seine Bewertung im ersten Fall auf einen, im zweiten auf fünf angeblich desinformierende Artikel gestützt.',
    themen: ['DSA & NetzDG'],
    haeringLink: 'https://norberthaering.de/chronik-fortsetzung/',
    sourceLink: 'https://multipolar-magazin.de/meldungen/0399',
  },
  {
    date: '2026-02-17',
    title: 'X muss Forschungsdaten herausgeben',
    description:
      'Democracy Reporting International und Gesellschaft für Freiheitsrechte erstreiten am Berliner Kammergericht eine einstweilige Verfügung, die X verpflichtet, DRI als „Forscher" Datenzugang rund um die Ungarn-Wahl im April zu gewähren.',
    themen: ['DSA & NetzDG'],
    haeringLink: 'https://norberthaering.de/chronik-fortsetzung/',
  },
  {
    date: '2026-03',
    title: 'US-Außenministerium schließt Vergleich mit Zensur-Klägern',
    description:
      'Zur Beilegung einer Klage von Daily Wire und The Federalist verpflichtet sich das US-Außenministerium zehn Jahre lang weder digitale Desinformations-Abwehrtechnologien zu fördern noch deren Einsatz zu empfehlen. Hintergrund waren die schwarzen Listen von Global Disinformation Index und NewsGuard, die das Ministerium auf Umwegen finanziert hatte.',
    themen: ['DSA & NetzDG', 'Ukraine & NATO'],
    haeringLink: 'https://norberthaering.de/propaganda-zensur/us-aussenministerium-vergleich/',
  },
  {
    date: '2026-03',
    title: 'EFCSN erhält 5 Mio. € EU-Förderung',
    description:
      'Das European Fact-Checking Standards Network erhält im Rahmen des „Europäischen Demokratieschilds" 5 Mio. € über 30 Monate — für die Förderung „geeigneter" Faktenchecker und die Finanzierung einer Datenbank EFCSN-lizenzierter Faktenchecks.',
    themen: ['DSA & NetzDG'],
    haeringLink: 'https://norberthaering.de/chronik-fortsetzung/',
  },
  {
    date: '2026-03-16',
    title: 'EU aktiviert „Rapid Response System" für Ungarn-Wahl',
    description:
      'Vor der Parlamentswahl am 12.4.2026 aktiviert die EU ihr Rapid Response System. Es verpflichtet große Plattformen, Inhalte besonders schnell und willig zu löschen, die Faktenchecker und NGOs markieren.',
    themen: ['DSA & NetzDG', 'Ukraine & NATO'],
    haeringLink: 'https://norberthaering.de/chronik-fortsetzung/',
  },
  {
    date: '2026-03-20',
    title: 'Landgericht Hamburg: HateAid darf so genannt werden',
    description:
      'Das Landgericht Hamburg stellt fest, dass HateAid keinen Anspruch auf Unterlassung der Äußerung hat, es sei eine „Vorfeldorganisation der Grünen".',
    themen: ['Hass und Hetze'],
    haeringLink: 'https://norberthaering.de/chronik-fortsetzung/',
  },
  {
    date: '2026-03-20',
    title: 'Karin Prien streicht 200 „Demokratie-leben!"-Projekte',
    description:
      'Bundesbildungsministerin Karin Prien kündigt das Auslaufenlassen von 200 der 3000 Projektförderungen aus „Demokratie leben!" an. Betroffen u.a. HateAid, Correctiv und Amadeu Antonio Stiftung. Wie viel der 191 Mio. € Fördersumme eingespart wird, bleibt unklar.',
    themen: ['Hass und Hetze', 'DSA & NetzDG'],
    actorSlug: 'amadeu-antonio-stiftung',
    haeringLink: 'https://norberthaering.de/chronik-fortsetzung/',
  },
  {
    date: '2026-03-24',
    title: 'EU aktiviert „Rapid Response System" auch für Bulgarien',
    description:
      'Auf Antrag des bulgarischen Übergangspräsidenten Andrei Gjurow aktiviert die EU das System für die Wahl am 19.4.2026. Der Außenminister erklärt, die Antwort auf hybride Bedrohungen werde mit EU und NATO koordiniert.',
    themen: ['DSA & NetzDG', 'Ukraine & NATO'],
    haeringLink: 'https://norberthaering.de/chronik-fortsetzung/',
  },
  {
    date: '2026-04-15',
    title: 'Landgericht Berlin kassiert Correctivs „Masterplan"',
    description:
      'Das Landgericht Berlin untersagt Correctiv die Behauptung, vom rechten Treffen in Potsdam im November 2023 bleibe ein „Masterplan zur Ausweisung von deutschen Staatsbürgern" zurück und Martin Sellner habe dort eine „Ausbürgerungsidee" geäußert. Correctiv geht in Berufung.',
    themen: ['Hass und Hetze'],
    actorSlug: 'correctiv',
    haeringLink: 'https://norberthaering.de/chronik-fortsetzung/',
  },
  {
    date: '2026-04',
    title: 'Werbekonzerne legen Kartell-Klage bei',
    description:
      'Dentsu US, GroupM Worldwide und Publicis verpflichten sich in einem gerichtlichen Vergleich, keine abgestimmten Ausschlusslisten politischer Medien mehr zu nutzen — als Reaktion auf eine Kartell-Klage der US-FTC und Bundesstaaten.',
    themen: ['DSA & NetzDG'],
    haeringLink: 'https://norberthaering.de/chronik-fortsetzung/',
  },
  {
    date: '2026-04',
    title: 'US-Justizministerium verweigert Amtshilfe gegen X',
    description:
      'Das US-Justizministerium lehnt drei Amtshilfeersuchen französischer Staatsanwälte gegen X ab. Frankreichs Vorgehen wird als Versuch eingestuft, ein US-Unternehmen wegen Entscheidungen zu verfolgen, die im eigenen Land geschützt sind.',
    themen: ['DSA & NetzDG'],
    haeringLink: 'https://norberthaering.de/chronik-fortsetzung/',
  },
  {
    date: '2026-04',
    title: 'Verfassungsschutz beerdigt Kategorie „Delegitimierung"',
    description:
      'Das Bundesamt für Verfassungsschutz schafft den 2021 eingeführten „Phänomenbereich verfassungsschutzrelevante Delegitimierung des Staates" offiziell wieder ab.',
    themen: ['Hass und Hetze'],
    haeringLink: 'https://norberthaering.de/chronik-fortsetzung/',
  },
  {
    date: '2026-04',
    title: 'Weimer darf Buchladen-Betreiber nicht „Extremisten" nennen',
    description:
      'Das Verwaltungsgericht Berlin untersagt Kulturstaatsminister Wolfram Weimer, die Betreiber des Berliner Buchladens „Zur schwankenden Weltkugel" als „politische Extremisten" zu bezeichnen. Weimer hatte sie im März von einer Preisträger-Liste streichen lassen.',
    themen: ['Hass und Hetze'],
    haeringLink: 'https://norberthaering.de/chronik-fortsetzung/',
  },
  {
    date: '2026-05',
    title: 'Bundestagsfraktionen verlassen X',
    description:
      'SPD, Grüne und Linke verlassen gemeinsam die Plattform X mit Verweis auf „Chaos und Desinformation". Parallel ruft SPD-Chefin Saskia Esken zu Werbeboykott gegen den Podcaster Ben Berndt auf, weil dieser ein mehrstündiges Gespräch mit Björn Höcke veröffentlicht hat.',
    themen: ['DSA & NetzDG'],
    haeringLink: 'https://norberthaering.de/chronik-fortsetzung/',
  },
  {
    date: '2026-05',
    title: 'Weimer will YouTube wie Fernsehen regulieren',
    description:
      'Kulturstaatsminister Wolfram Weimer kündigt an, YouTube als „das neue Fernsehen" zu regulieren — mit bevorzugter Ausspielung ausgewählter Inhalte und Landesmedien als Vielfaltswächter. SPD-Chef Lars Klingbeil unterstützt die Forderung.',
    themen: ['DSA & NetzDG'],
    haeringLink: 'https://norberthaering.de/chronik-fortsetzung/',
  },
  {
    date: '2026-05',
    title: 'WHO-Kommission fordert „Klima-Gesundheitsnotstand"',
    description:
      'Die „Paneuropäische Kommission Klima und Gesundheit" der WHO fordert die WHO auf, wegen des Klimawandels den internationalen Gesundheitsnotstand auszurufen und den Kampf gegen „Klima-Desinformation" zu verstärken. Ein WHO-Notstand gäbe der EU-Kommission unter DSA erweiterte Rechte gegenüber Plattformen.',
    themen: ['Klima', 'DSA & NetzDG'],
    haeringLink: 'https://norberthaering.de/propaganda-zensur/who-gesundheitsnotstand/',
  },
];
