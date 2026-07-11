// Chronik des Wahrheitskomplexes.
//
// Inhaltliche Quelle:
//   - Buch-Anhang „Chronik des Wahrheitskomplexes" (Westend Verlag 2026,
//     Kapitel direkt vor den Anmerkungen)
//   - Härings „Chronik-Fortsetzung" auf norberthaering.de/chronik-fortsetzung/
//
// Datumsformat: YYYY-MM-DD (selten), YYYY-MM (überwiegend) oder YYYY.
// Region: ISO-artige Länderkürzel oder Sphären-Marker.

export type ChronikEintrag = {
  date: string;
  region: string; // "DE", "EU", "USA", "UK", "INT", "RU", "UA", "RO" oder "USA / DE" etc.
  title: string;
  description?: string;
  themen?: string[];
  actorSlug?: string;
  haeringLink?: string;
  sourceLink?: string;
  thumb?: string; // optionales Vorschaubild (z.B. /chronik-thumbs/who-cover.jpg)
  imageCredit?: string; // Bildunterschrift / Nennung (z.B. "Foto: XY (CC BY-SA 4.0)")
  imageCreditUrl?: string; // Link auf Quell-/Lizenzseite (z.B. Wikimedia-Datei)
  featured?: boolean; // zusätzliches Auftauchen im "Neues aus dem Wahrheitskomplex"-Karussell
};

export const chronik: ChronikEintrag[] = [
  // ---------- VOR DER BUCH-CHRONIK (Anker) ----------
  {
    date: '1998',
    region: 'DE',
    title: 'Amadeu Antonio Stiftung gegründet',
    description:
      'Anetta Kahane gründet die Stiftung zum Gedenken an den 1990 in Eberswalde ermordeten Vertragsarbeiter Amadeu Antonio. Sie wird in den 2010er Jahren zu einer der prägenden Stimmen für die spätere NetzDG-Gesetzgebung.',
    themen: ['Hass und Hetze', 'DSA & NetzDG'],
    actorSlug: 'amadeu-antonio-stiftung',
  },
  {
    date: '2006',
    region: 'UK',
    title: 'Institute for Strategic Dialogue (ISD) gegründet',
    description:
      'In London entsteht eine als zivilgesellschaftlich auftretende Organisation gegen Radikalisierung. Sie wird sich zur zentralen Schnittstelle zwischen Geheimdiensten, NATO-Programmen und Online-Inhaltsregulierung entwickeln.',
    themen: ['Ukraine & NATO', 'DSA & NetzDG'],
    actorSlug: 'institute-for-strategic-dialogue',
  },

  // ---------- 2014 ----------
  { date: '2014-01', region: 'EU', title: 'NATO StratCom COE in Riga nimmt die Arbeit auf', themen: ['Ukraine & NATO'] },
  { date: '2014-02', region: 'UA', title: 'Präsident der Ukraine wird gestürzt', themen: ['Ukraine & NATO'] },
  { date: '2014-06', region: 'USA / UK', title: 'Erster Global Fact-Checking Summit findet in London statt', themen: ['DSA & NetzDG'] },
  { date: '2014-07', region: 'DE', title: 'Recherchekollektiv Correctiv nimmt die Arbeit auf', themen: ['Hass und Hetze'], actorSlug: 'correctiv' },
  { date: '2014-11', region: 'DE', title: 'Haushaltsausschuss bewilligt 40,5 Mio. € für „Demokratie leben!" 2015', themen: ['Hass und Hetze'] },

  // ---------- 2015 ----------
  { date: '2015-07', region: 'DE', title: 'Gründung des Science Media Center Germany', themen: ['Pandemie', 'Klima'], actorSlug: 'science-media-center-germany' },
  { date: '2015-07', region: 'USA', title: 'Gründung des International Fact-Checking Network (IFCN)', themen: ['DSA & NetzDG'] },
  { date: '2015-09', region: 'EU', title: 'Bildung der EastStratCom Task Force', themen: ['Ukraine & NATO'] },
  { date: '2015-09', region: 'DE', title: 'Außenministerium, AAS und Facebook gründen Arbeitsgruppe gegen „Hassbotschaften"', themen: ['Hass und Hetze', 'DSA & NetzDG'], actorSlug: 'amadeu-antonio-stiftung' },

  // ---------- 2016 ----------
  { date: '2016-01', region: 'DE', title: 'ISD, AAS und Facebook vereinbaren „Initiative für Zivilcourage Online"', themen: ['Hass und Hetze', 'DSA & NetzDG'] },
  { date: '2016-04', region: 'EU', title: 'Kommission stellt Planung für Hybrid CoE in Helsinki vor', themen: ['Ukraine & NATO'] },
  { date: '2016-05', region: 'EU', title: 'Plattformen unterzeichnen Verhaltenskodex gegen Hassrede im Internet', themen: ['Hass und Hetze', 'DSA & NetzDG'] },
  { date: '2016-07', region: 'USA', title: 'Wikileaks veröffentlicht E-Mails der Führung der Demokratischen Partei', description: 'Juli bis Oktober 2016 — Auftakt der „Russia-Gate"-Narrative.', themen: ['Ukraine & NATO'] },
  { date: '2016-08', region: 'USA', title: 'Senatsbericht: Plattformen wegen „russischer Wahlkampfbeeinflussung" kritisiert', description: 'Facebook beginnt Kooperation mit Faktencheckern.', themen: ['Wahlen', 'DSA & NetzDG'] },
  { date: '2016-10', region: 'USA', title: 'Digital Forensic Research Lab beim Atlantic Council geht an den Start', themen: ['Ukraine & NATO'], actorSlug: 'atlantic-council' },
  { date: '2016-11', region: 'USA', title: 'Donald Trump gewinnt Präsidentschaftswahl', themen: ['Wahlen'] },
  { date: '2016-11', region: 'USA', title: 'Washington Post veröffentlicht „PropOrNot"-Liste „putintreuer" US-Medien', themen: ['Ukraine & NATO'] },
  { date: '2016-11', region: 'USA / EU', title: 'Atlantic Council: Report über „Trojanische Pferde des Kremls in Europa"', themen: ['Ukraine & NATO'], actorSlug: 'atlantic-council' },
  { date: '2016-11', region: 'DE', title: 'DIE ZEIT greift Politiker wegen russlandfreundlicher Haltung an', themen: ['Ukraine & NATO'] },
  { date: '2016-12', region: 'DE', title: 'BILD warnt mit Experten von ISD und Atlantic Council vor „Kaperung der Bundestagswahl durch Russland"', themen: ['Wahlen', 'Ukraine & NATO'] },
  { date: '2016-12', region: 'DE', title: 'Boykottkampagne #KeinGeldFürRechts startet', themen: ['Hass und Hetze'] },
  { date: '2016-12', region: 'USA', title: 'Global Engagement Center bekommt Mandat, Desinformation zu bekämpfen', themen: ['Ukraine & NATO', 'DSA & NetzDG'] },

  // ---------- 2017 ----------
  { date: '2017-01', region: 'DE', title: 'Facebook heuert Correctiv-Faktenchecker an', themen: ['DSA & NetzDG'], actorSlug: 'correctiv' },
  { date: '2017-01', region: 'DE', title: 'ARD-Faktenfinder geht an den Start', themen: ['DSA & NetzDG'] },
  { date: '2017-02', region: 'DE', title: 'BND und Verfassungsschutz finden keine Beweise für russische Fake-News-Kampagnen 2016', themen: ['Ukraine & NATO', 'Wahlen'] },
  { date: '2017-03', region: 'DE', title: 'Heiko Maas stellt Entwurf des NetzDG vor', description: 'Verabschiedung im Juni 2017, Inkrafttreten 1. Oktober.', themen: ['DSA & NetzDG'] },
  { date: '2017-04', region: 'EU', title: 'USA und acht EU-Länder unterzeichnen Memorandum: European Centre of Excellence for Countering Hybrid Threats in Helsinki', themen: ['Ukraine & NATO'] },
  { date: '2017-04', region: 'USA', title: 'Google und Washington Post vereinbaren Kooperation gegen Fake News', themen: ['DSA & NetzDG'] },
  { date: '2017-05', region: 'DE', title: 'Meldestelle REspect! geht an den Start', themen: ['Hass und Hetze', 'DSA & NetzDG'] },
  { date: '2017-09', region: 'USA / EU', title: 'StratCom-DC-Konferenz des US-Militärs in Washington — mit europäischen Teilnehmern', themen: ['Ukraine & NATO'] },

  // ---------- 2018 ----------
  { date: '2018-02', region: 'USA / EU', title: 'Atlantic Council fordert Verhaltenskodex gegen Desinformation und ein Netzwerk von Faktencheckern', themen: ['DSA & NetzDG'], actorSlug: 'atlantic-council' },
  { date: '2018-02', region: 'INT', title: 'Conscious Advertising Network (CAN) wird gebildet', themen: ['DSA & NetzDG'] },
  { date: '2018-03', region: 'USA', title: 'Konferenz für Militärattachés zu „Souveränität und Desinformation" in Washington', themen: ['Ukraine & NATO'] },
  { date: '2018-03', region: 'INT', title: 'NewsGuard wird gegründet', themen: ['DSA & NetzDG'] },
  { date: '2018-04', region: 'EU', title: 'Kommission kündigt Verhaltenskodex gegen Desinformation und Faktenchecker-Netzwerk SOMA an', description: 'Start Oktober/November 2018 — Vorgänger von EDMO.', themen: ['DSA & NetzDG'] },
  { date: '2018-05', region: 'USA', title: 'Facebook vereinbart mit Digital Forensic Research Lab Kooperation gegen russische Desinformation', themen: ['Ukraine & NATO'] },
  { date: '2018-06', region: 'USA', title: 'S.-J. Terp wird vom Militär beauftragt, DISARM zu entwickeln', themen: ['Ukraine & NATO', 'DSA & NetzDG'] },
  { date: '2018-06', region: 'INT', title: 'Gründung von Global Disinformation Index (GDI)', themen: ['DSA & NetzDG'] },
  { date: '2018-12', region: 'EU', title: 'Kommission stellt Aktionsplan für Außen- und Sicherheitspolitik vor', themen: ['Ukraine & NATO'] },

  // ---------- 2019 ----------
  { date: '2019-01', region: 'DE', title: 'HateAid startet Informationsseite für Betroffene digitalen Hasses', description: 'Hilfsangebot startet im Sommer 2019.', themen: ['Hass und Hetze'] },
  { date: '2019-02', region: 'EU', title: 'Alliance4Europe wird gegründet', themen: ['DSA & NetzDG'] },
  { date: '2019-03', region: 'DE', title: 'dpa beginnt Fact-Checking für Facebook', themen: ['DSA & NetzDG'], actorSlug: 'dpa-faktencheck' },
  { date: '2019-06', region: 'INT', title: 'BBC gründet mit führenden internationalen Medien die Trusted News Initiative', themen: ['DSA & NetzDG'] },
  { date: '2019-09', region: 'USA', title: 'Geheimdienste, Google, Facebook, Twitter und Microsoft vereinbaren gemeinsame „Wahlsicherung"', description: 'LinkedIn, Pinterest, Reddit und Verizon Media stoßen im August 2020 dazu.', themen: ['Wahlen', 'DSA & NetzDG'] },

  // ---------- 2020 ----------
  { date: '2020-01', region: 'INT', title: 'IFCN ruft CoronaVirusFacts Alliance ins Leben', themen: ['Pandemie', 'DSA & NetzDG'] },
  { date: '2020-01', region: 'DE', title: 'Meldestelle „HessenGegenHetze" wird gegründet', themen: ['Hass und Hetze'] },
  { date: '2020-03', region: 'USA / EU', title: 'Google, Facebook und Twitter bilden „Allianz gegen Falschinformationen"', themen: ['Pandemie', 'DSA & NetzDG'] },
  { date: '2020-06', region: 'EU', title: 'EU-Kommission gründet European Digital Media Observatory (EDMO)', themen: ['DSA & NetzDG'], actorSlug: 'edmo' },
  { date: '2020-09', region: 'DE', title: 'Digital Policy Lab beim ISD hält erste Sitzung ab', themen: ['DSA & NetzDG'], actorSlug: 'institute-for-strategic-dialogue' },
  { date: '2020-10', region: 'USA', title: 'Digitale Plattformen verhindern Verbreitung des NY-Post-Artikels zum „Hunter-Biden-Laptop"', themen: ['Wahlen', 'DSA & NetzDG'] },
  { date: '2020-11', region: 'USA', title: 'Joe Biden gewinnt die Präsidentschaftswahl', themen: ['Wahlen'] },
  { date: '2020-11', region: 'DE', title: 'Aufsicht der Medienanstalten über alternative Online-Medien im Medienstaatsvertrag verankert', themen: ['DSA & NetzDG'] },
  { date: '2020-12', region: 'USA', title: 'YouTube, Facebook, Twitter und Microsoft schaffen gemeinsame Datenbank „extremistischer Inhalte"', themen: ['DSA & NetzDG'] },

  // ---------- 2021 ----------
  { date: '2021-03', region: 'DE', title: '„Expert*innenzirkel Medien an den Rändern" des Bibliothekarsverbands startet', themen: ['Hass und Hetze'] },
  { date: '2021-03', region: 'DE', title: '„Gesetz zur Bekämpfung des Rechtsextremismus und der Hasskriminalität" verabschiedet', description: 'Verschärft §188 StGB („Politikerbeleidigung").', themen: ['Hass und Hetze', 'DSA & NetzDG'] },
  { date: '2021-04', region: 'DE', title: 'Verfassungsschutz führt „Phänomenbereich verfassungsschutzrelevante Delegitimierung des Staates" ein', themen: ['Hass und Hetze'] },
  { date: '2021-05', region: 'EU', title: 'Google stellt EDMO European Media and Information Fund (EMIF) mit 25 Mio. € zur Verfügung', themen: ['DSA & NetzDG'], actorSlug: 'edmo' },
  { date: '2021-07', region: 'DE', title: 'Gründung des Netzwerks Klimajournalismus', themen: ['Klima'] },
  { date: '2021-12', region: 'EU', title: 'EU-Kommission gibt Bildung des European Fact-Checking Standards Network (EFCSN) bekannt', themen: ['DSA & NetzDG'] },
  { date: '2021-12', region: 'INT', title: 'UN-Generalversammlung verabschiedet Desinformations-Resolution', description: 'Meinungsfreiheit soll „durch Desinformationsbekämpfung gefördert" werden.', themen: ['DSA & NetzDG'] },
  { date: '2021-12', region: 'INT', title: 'Gründung der DISARM-Foundation', themen: ['Ukraine & NATO', 'DSA & NetzDG'] },

  // ---------- 2022 ----------
  { date: '2022-02', region: 'RU / UA', title: 'Russischer Angriff auf die Ukraine', themen: ['Ukraine & NATO'] },
  { date: '2022-03', region: 'EU', title: 'Entschließung des EU-Parlaments zu „Prebunking" gegen feindliche Desinformation', themen: ['DSA & NetzDG'] },
  { date: '2022-06', region: 'EU', title: 'Verschärfter Verhaltenskodex gegen Desinformation verabschiedet', description: 'X unterschreibt nicht.', themen: ['DSA & NetzDG'] },
  { date: '2022-06', region: 'DE / USA', title: 'DGAP- und Atlantic-Council-Programm zur „Influencer-Ausbildung" gegen Desinformation startet', themen: ['DSA & NetzDG'], actorSlug: 'atlantic-council' },
  { date: '2022-10-19', region: 'EU', title: 'Digital Services Act (DSA) wird verabschiedet', themen: ['DSA & NetzDG'] },
  { date: '2022-11', region: 'DE / EU', title: 'German-Austrian Digital Media Observatory (GADMO) geht an den Start', themen: ['DSA & NetzDG'] },

  // ---------- 2023 ----------
  { date: '2023-01', region: 'DE', title: 'NGO-/Stiftungs-Treffen im Bundesinnenministerium', description: 'Daraus entstehen die „Allianz für eine resiliente Informationsgesellschaft" und „toneshift".', themen: ['DSA & NetzDG'] },
  { date: '2023-02', region: 'USA', title: 'National Endowment for Democracy beendet Förderung von Global Disinformation Index', themen: ['DSA & NetzDG'] },
  { date: '2023-05', region: 'USA / EU', title: 'USA und EU machen DISARM zum Standard für Erkenntnisaustausch zu „ausländischer Informationsmanipulation"', themen: ['Ukraine & NATO', 'DSA & NetzDG'] },
  { date: '2023-05', region: 'INT', title: 'Weltgesundheitsversammlung verabschiedet Resolution zur „Nutzung der Verhaltenswissenschaften gegen Desinformation"', themen: ['Pandemie'] },
  { date: '2023-12', region: 'EU', title: 'EU-Kommission leitet Ermittlungen gegen X wegen DSA-Verstößen ein', themen: ['DSA & NetzDG'] },
  { date: '2023-12', region: 'USA', title: 'US-Kongress streicht Mittel des Global Engagement Center', description: 'Das Center hatte u.a. Global Disinformation Index finanziert.', themen: ['Ukraine & NATO'] },

  // ---------- 2024 ----------
  { date: '2024-02', region: 'EU', title: 'Digital Services Act tritt in Kraft', themen: ['DSA & NetzDG'] },
  { date: '2024-04', region: 'EU', title: 'EU-Rat beschließt zivil-militärische „Schnelle hybride Eingreifteams"', themen: ['Ukraine & NATO'] },
  { date: '2024-04', region: 'EU', title: 'Kommission verabschiedet DSA-Leitlinien zur „Sicherung von Wahlen"', themen: ['Wahlen', 'DSA & NetzDG'] },
  { date: '2024-04', region: 'DE', title: 'Neues Disziplinarrecht: Beamte bei „extremistischen" Äußerungen per Verordnung aus dem Dienst entfernbar', themen: ['Hass und Hetze'] },
  { date: '2024-05', region: 'UK', title: 'Britische Regierung: Global Disinformation Index seit März 2023 nicht mehr unterstützt', themen: ['DSA & NetzDG'] },
  { date: '2024-06', region: 'EU', title: 'EU-Kommission stellt Strategische Agenda 2024–2029 vor', themen: ['Ukraine & NATO', 'DSA & NetzDG'] },
  { date: '2024-08', region: 'INT', title: 'Weltverband der Werbetreibenden löst Global Alliance for Responsible Media auf', themen: ['DSA & NetzDG'] },
  { date: '2024-10', region: 'DE', title: 'Meldestelle „Respect!" wird Vertrauenswürdiger Hinweisgeber nach DSA', themen: ['Hass und Hetze', 'DSA & NetzDG'] },
  { date: '2024-10', region: 'EU', title: 'Verordnung über Transparenz und Targeting politischer Werbung (TTPA) tritt in Kraft', themen: ['Wahlen'] },
  { date: '2024-10', region: 'USA', title: 'Meta schaltet CrowdTangle ab', description: 'Echtzeitüberwachung von Inhalten auf Facebook und Instagram entfällt.', themen: ['DSA & NetzDG'] },
  { date: '2024-11', region: 'INT', title: 'Global Initiative for Information Integrity on Climate Change gegründet', themen: ['Klima'] },
  { date: '2024-12', region: 'RO', title: 'Erste Runde der rumänischen Präsidentschaftswahl annulliert', description: 'Begründung: Verdacht auf russische „Informationsmanipulation".', themen: ['Wahlen', 'Ukraine & NATO'] },

  // ---------- 2025 ----------
  { date: '2025-01', region: 'DE', title: '„Grünbuch ZMZ 4.0" zur zivil-militärischen Zusammenarbeit gegen „hybride Bedrohungslagen"', themen: ['Ukraine & NATO'] },
  { date: '2025-01', region: 'USA', title: 'Facebook beendet in den USA Zusammenarbeit mit externen Faktencheckern', themen: ['DSA & NetzDG'] },
  { date: '2025-02', region: 'EU', title: 'Kommission nimmt Verhaltenskodex für Desinformation in DSA auf', themen: ['DSA & NetzDG'] },
  { date: '2025-02', region: 'USA / EU', title: 'US-Vizepräsident Vance kritisiert auf Münchner Sicherheitskonferenz fehlende Meinungsfreiheit in EU', themen: ['DSA & NetzDG'] },
  { date: '2025-04', region: 'DE', title: 'David Bendels: 7 Monate Haft auf Bewährung wegen Faeser-Meme (erste Instanz)', themen: ['Hass und Hetze'] },
  { date: '2025-04', region: 'RU', title: 'Global Fact-Checking Network (GFCN) in Moskau vorgestellt', themen: ['DSA & NetzDG'] },
  { date: '2025-05', region: 'EU', title: 'EU-Rat verhängt Sanktionen gegen drei deutsche Journalisten wegen „Unterstützung russischer Propaganda"', themen: ['Ukraine & NATO'] },
  { date: '2025-06', region: 'DE', title: 'HateAid wird Vertrauenswürdiger Hinweisgeber nach DSA', themen: ['Hass und Hetze', 'DSA & NetzDG'] },
  { date: '2025-07', region: 'DE', title: 'OVG NRW: Bibliotheken dürfen nicht vor Büchern warnen', themen: ['Hass und Hetze'] },
  { date: '2025-08', region: 'DE', title: 'Wahlausschuss Ludwigshafen schließt AfD-Kandidat wegen Social-Media-Posts aus', themen: ['Wahlen'] },
  { date: '2025-08', region: 'USA', title: 'Trump verbietet Banken, Konten aus politischen oder religiösen Gründen zu kündigen', themen: ['Hass und Hetze'] },
  { date: '2025-09', region: 'USA', title: 'Global Disinformation Index nimmt Schwarze Liste vom Markt', themen: ['DSA & NetzDG'] },
  { date: '2025-09', region: 'USA', title: 'YouTube lässt in den USA gesperrte „Corona-/Wahl-Desinfo"-Kanäle wieder zu', description: 'Zusammenarbeit mit externen Faktencheckern wird eingestellt.', themen: ['Pandemie', 'DSA & NetzDG'] },
  {
    date: '2025-09-10',
    region: 'DE',
    title: 'Schauspiel Köln und Correctiv vereinbaren langfristige Kooperation',
    description:
      'Das Schauspiel Köln unter Kay Voges und Correctiv verkünden eine auf mindestens fünf Jahre angelegte Zusammenarbeit, um Correctiv-Recherchen als szenische Lesungen auf die Bühne zu bringen. Auftakt: eine positive Nachbetrachtung der „Geheimplan"-Recherche.',
    themen: ['Hass und Hetze'],
    actorSlug: 'correctiv',
    haeringLink: 'https://norberthaering.de/propaganda-zensur/truth-on-stage/',
  },
  { date: '2025-10', region: 'EU', title: 'EU-Kommission ermittelt gegen Facebook, Instagram und TikTok wegen unzureichender Datenoffenlegung', themen: ['DSA & NetzDG'] },
  { date: '2025-11', region: 'EU', title: 'EU-Kommission stellt „Europäischen Schutzschild für die Demokratie" vor', themen: ['DSA & NetzDG'] },
  { date: '2025-12', region: 'DE', title: 'Hessen stutzt Meldestelle „HessenGegenHetze" zurück', description: 'Im Februar 2026 werden Name und Begriff „Meldestelle" von einschlägigen Webseiten getilgt.', themen: ['Hass und Hetze'] },
  { date: '2025-12', region: 'EU', title: '120 Mio. € Strafe gegen X wegen ungenügendem Forscher-Datenzugang', themen: ['DSA & NetzDG'] },
  { date: '2025-12', region: 'EU', title: 'EU-Rat sanktioniert weitere Publizisten — u.a. Buchautor Jacques Baud', themen: ['Ukraine & NATO'] },
  { date: '2025-12', region: 'USA', title: 'US-Regierung verhängt Einreisesperren gegen Chefinnen von HateAid und GDI', themen: ['Hass und Hetze'] },

  // ---------- 2026 (bis Buch-Redaktionsschluss) ----------
  { date: '2026-01', region: 'DE', title: 'David Bendels in zweiter Instanz vom Faeser-Meme-Vorwurf freigesprochen', themen: ['Hass und Hetze'] },
  { date: '2026-01', region: 'INT', title: 'Papst Leo XIV beklagt Einschränkung der Meinungsfreiheit in westlichen Ländern', themen: ['DSA & NetzDG'] },
  { date: '2026-02', region: 'DE', title: 'SPD-Positionspapier und CDU-Parteitag: Social-Media-Verbot für unter 14-Jährige', themen: ['DSA & NetzDG'] },
  { date: '2026-02', region: 'EU', title: 'MCC Brussels startet Democracy Interference Observatory zur Beobachtung von EU-Wahleinmischung', themen: ['Wahlen'] },

  // ---------- 2026 (Härings Online-Fortsetzung) ----------
  {
    date: '2026-02',
    region: 'DE',
    title: 'OLG Frankfurt untersagt NewsGuard Achgut-Bewertung',
    description:
      'AZ 6 U 92/25: NewsGuard darf Achgut nicht mehr als einen der zehn wichtigsten Verbreiter von Desinformation 2022 nennen oder mit 35/100 bewerten. Bewertungen waren auf einen bzw. fünf angeblich desinformierende Artikel gestützt.',
    themen: ['DSA & NetzDG'],
    sourceLink: 'https://multipolar-magazin.de/meldungen/0399',
  },
  {
    date: '2026-02-17',
    region: 'DE',
    title: 'X muss Forschungsdaten herausgeben',
    description:
      'Berliner Kammergericht verpflichtet X auf einstweilige Verfügung von DRI und Gesellschaft für Freiheitsrechte, Daten rund um die Ungarn-Wahl im April offenzulegen.',
    themen: ['DSA & NetzDG'],
  },
  {
    date: '2026-03',
    region: 'USA',
    title: 'US-Außenministerium schließt Vergleich mit Zensur-Klägern',
    description:
      'Verpflichtet sich für 10 Jahre, keine digitalen Desinformations-Abwehrtechnologien zu fördern oder zu empfehlen. Hintergrund: Klage von Daily Wire und The Federalist wegen Förderung von GDI und NewsGuard.',
    themen: ['DSA & NetzDG'],
    haeringLink: 'https://norberthaering.de/propaganda-zensur/us-aussenministerium-vergleich/',
  },
  {
    date: '2026-03',
    region: 'EU',
    title: 'EFCSN erhält 5 Mio. € EU-Förderung',
    description: 'Über 30 Monate, im Rahmen des „Europäischen Demokratieschilds".',
    themen: ['DSA & NetzDG'],
  },
  {
    date: '2026-03-16',
    region: 'EU',
    title: 'EU aktiviert „Rapid Response System" für Ungarn-Wahl',
    description: 'Verpflichtet Plattformen, von Faktencheckern markierte Inhalte besonders schnell zu löschen/ausbremsen.',
    themen: ['Wahlen', 'DSA & NetzDG'],
  },
  {
    date: '2026-03-20',
    region: 'DE',
    title: 'LG Hamburg: HateAid darf so genannt werden',
    description: 'Kein Anspruch auf Unterlassung der Äußerung, HateAid sei „Vorfeldorganisation der Grünen".',
    themen: ['Hass und Hetze'],
  },
  {
    date: '2026-03-20',
    region: 'DE',
    title: 'Karin Prien streicht 200 „Demokratie-leben!"-Projekte',
    description: 'Betroffen u.a. HateAid, Correctiv und Amadeu Antonio Stiftung. Eingesparte Summe der 191 Mio. € bleibt unklar.',
    themen: ['Hass und Hetze', 'DSA & NetzDG'],
    actorSlug: 'amadeu-antonio-stiftung',
  },
  {
    date: '2026-03-24',
    region: 'EU',
    title: 'EU aktiviert „Rapid Response System" auch für Bulgarien',
    description: 'Wahl am 19.4.2026. Koordination mit EU und NATO ausdrücklich Teil der Antwort.',
    themen: ['Wahlen', 'Ukraine & NATO'],
  },
  {
    date: '2026-03-30',
    region: 'EU',
    title: 'Schauspiel Köln gibt EU-gefördertes europäisches Journalismus-Theater-Projekt auf Basis der Kooperation mit Correctiv bekannt',
    description:
      'Schauspiel Köln und die EU-finanzierte European Theatre Convention (ETC) verkünden das EU-geförderte Projekt Truth on Stage (TRUST). Nach dem erklärten Vorbild der Geheimplan-Bühnenstücke sollen neun große europäische Theater investigativjournalistische Recherchen auf die Bühne bringen.',
    themen: ['Hass und Hetze'],
    actorSlug: 'correctiv',
    haeringLink: 'https://norberthaering.de/propaganda-zensur/truth-on-stage/',
    thumb: '/chronik-thumbs/truth-on-stage.jpg',
    featured: true,
  },
  {
    date: '2026-04',
    region: 'USA',
    title: 'Werbekonzerne legen Kartell-Klage bei',
    description: 'Dentsu US, GroupM Worldwide und Publicis verpflichten sich, keine abgestimmten Ausschlusslisten politischer Medien mehr zu nutzen.',
    themen: ['DSA & NetzDG'],
  },
  {
    date: '2026-04',
    region: 'USA',
    title: 'US-Justizministerium verweigert Amtshilfe gegen X',
    description: 'Lehnt drei französische Ermittlungs-Amtshilfeersuchen ab.',
    themen: ['DSA & NetzDG'],
  },
  {
    date: '2026-04',
    region: 'DE',
    title: 'Verfassungsschutz beerdigt Kategorie „Delegitimierung"',
    description: 'Der 2021 eingeführte „Phänomenbereich verfassungsschutzrelevante Delegitimierung des Staates" wird offiziell abgeschafft.',
    themen: ['Hass und Hetze'],
  },
  {
    date: '2026-04',
    region: 'DE',
    title: 'VG Berlin: Weimer darf Buchladen-Betreiber nicht „Extremisten" nennen',
    themen: ['Hass und Hetze'],
  },
  {
    date: '2026-04-15',
    region: 'DE',
    title: 'LG Berlin kassiert Correctivs „Masterplan"-Narrativ',
    description: 'Correctiv darf nicht behaupten, vom Potsdamer Treffen 11/2023 bleibe ein „Masterplan zur Ausweisung deutscher Staatsbürger" zurück. Correctiv geht in Berufung.',
    themen: ['Hass und Hetze'],
    actorSlug: 'correctiv',
  },
  {
    date: '2026-05-04',
    region: 'DE',
    title: 'SPD, Grüne, Linke verlassen X',
    description: 'Saskia Esken ruft parallel zu Werbeboykott gegen Podcaster Ben Berndt auf, der mit Björn Höcke ein mehrstündiges Gespräch veröffentlicht hatte.',
    themen: ['DSA & NetzDG'],
    sourceLink: 'https://www.tagesschau.de/inland/spd-gruene-linke-rueckzug-x-100.html',
  },
  {
    date: '2026-05-13',
    region: 'DE',
    title: 'Weimer will YouTube wie Fernsehen regulieren',
    description: 'Bevorzugte Ausspielung ausgewählter Inhalte, Landesmedien als Vielfaltswächter. SPD-Chef Klingbeil unterstützt.',
    themen: ['DSA & NetzDG'],
    sourceLink: 'https://www.welt.de/debatte/plus69fd75d87e3ff373d429dbd6/kulturstaatsminister-wenn-youtube-das-neue-fernsehen-ist-braucht-es-neue-regeln.html',
  },
  {
    date: '2026-05-15',
    region: 'DE',
    title: 'Neudefinition von „hybrider Bedrohung": Regierungskritiker werden zu Staatsfeinden',
    description:
      'Die Bundesregierung streicht das Erfordernis ausländischer Einflussnahme aus der Definition von „Desinformation als hybride Bedrohung".',
    themen: ['Ukraine & NATO', 'DSA & NetzDG'],
    haeringLink: 'https://norberthaering.de/propaganda-zensur/hybrider-krieg/',
  },
  {
    date: '2026-05-17',
    region: 'INT',
    title: 'WHO-Kommission fordert „Klima-Gesundheitsnotstand"',
    description: 'Ein WHO-Notstand würde der EU-Kommission unter DSA erweiterte Rechte gegenüber Plattformen geben.',
    themen: ['Klima', 'DSA & NetzDG'],
    haeringLink: 'https://norberthaering.de/propaganda-zensur/who-gesundheitsnotstand/',
    thumb: '/chronik-thumbs/who-climate-health.jpg',
  },
  {
    date: '2026-05-21',
    region: 'INT',
    title: 'Kanadas Armee spionierte Äußerungen der Bevölkerung zu Corona aus',
    description:
      'Ein Untersuchungsbericht der kanadischen Armee belegt: Mehrere Armee-Teams durchforsteten 2020 soziale Medien und erstellten Stimmungsberichte zur Bevölkerung und Opposition in Sachen Covid-19. Militärexperte Wesley Wark (CBC News): Das Militär wollte Möglichkeiten erproben, das Denken der Bevölkerung zu beeinflussen, die Unterstützung für das Militär zu steigern und russischen Informationsaktivitäten zu begegnen.',
    themen: ['Pandemie', 'Ukraine & NATO'],
    haeringLink: 'https://norberthaering.de/propaganda-zensur/kanadas-armee-covid/',
  },
  {
    date: '2026-05-23',
    region: 'DE',
    title: 'Verfassungsschutz deklariert Kritik an Mächtigen als antisemitisch',
    description:
      'Das Bundesamt für Verfassungsschutz veröffentlicht eine Broschüre zu „Antisemitische Codes und Chiffren", welche die Definition von Antisemitismus massiv auf Kritik an mächtigen, nichtjüdischen Menschen und Institutionen ausweitet.',
    themen: ['Hass und Hetze'],
    haeringLink: 'https://norberthaering.de/propaganda-zensur/bfv-antisemitismus/',
  },
  {
    date: '2026-05-26',
    region: 'DE',
    title: 'Landesmedienanstalten wollen Stempel für „verbreitungsfähige" Inhalte vergeben',
    description:
      'Die Landesmedienanstalten wollen großen Plattformen vorschreiben, Inhalte mit ihrem Zuverlässigkeitsstempel bevorzugt zu verbreiten und im Umkehrschluss nicht behördlich zertifizierte Inhalte weniger sichtbar zu machen. Härings Befund: „Der Wahrheitskomplex verliert fast jede Scheu bei der Annäherung an ein offenes Zensursystem."',
    themen: ['DSA & NetzDG'],
    haeringLink: 'https://norberthaering.de/propaganda-zensur/public-value-angebote/',
    thumb: '/chronik-thumbs/landesmedienanstalten-stempel.jpg',
    imageCredit: 'Screenshot aus dem Diskussionspapier der Landesmedienanstalten',
  },
  {
    date: '2026-05-26',
    region: 'DE',
    title: 'Westend-Verlag gerät ins Visier der Selbstgerechten',
    description:
      '32 frühere Westend-Autoren aus dem sich linksliberal nennenden Milieu kündigen dem Verlag in einem offenen Brief die Zusammenarbeit auf, weil er angeblich nach rechts driftet. Westend hat Härings „Wahrheitskomplex" verlegt.',
    themen: ['Hass und Hetze', 'DSA & NetzDG'],
    haeringLink: 'https://norberthaering.de/propaganda-zensur/westend-offener-brief/',
  },
  {
    date: '2026-05-31',
    region: 'DE',
    title: 'Tichys juristischer Sieg gegen die Schlapphüte',
    description:
      'Der Verfassungsschutz durfte das Magazin Tichys Einblick nicht öffentlich als Putin-Helfer framen, nur weil russische Medien seine Berichte manchmal weiterverbreiteten.',
    themen: ['Ukraine & NATO', 'Hass und Hetze'],
    haeringLink: 'https://norberthaering.de/propaganda-zensur/tichy-vs-verfassungsschutz/',
  },
  {
    date: '2026-06-05',
    region: 'DE',
    title: 'Stadtbücherei Münster nimmt Buch, vor dem es nicht mehr warnen darf, aus dem Leihprogramm',
    description:
      'Das Oberlandesgericht NRW hatte der Bücherei verboten, einen Warnhinweis im Buch „Putin, Herr des Geschehens?" von Jacques Baud anzubringen. Nun ist das Buch dort nicht mehr im Leihprogramm.',
    themen: ['Hass und Hetze'],
    haeringLink: 'https://norberthaering.de/propaganda-zensur/muenster-jacques-baud/',
  },
  {
    date: '2026-06-13',
    region: 'DE',
    title: 'Justizminister wollen §188 zurückstutzen',
    description:
      'Auf Antrag Sachsens und Baden-Württembergs (Heimatland der Meldestelle REspect!) hat sich die Justizministerkonferenz dafür ausgesprochen, den besonderen Beleidigungsschutz nach §188 StGB künftig nur noch Kommunalpolitikern zu gewähren.',
    themen: ['Hass und Hetze', 'DSA & NetzDG'],
    haeringLink: 'https://norberthaering.de/propaganda-zensur/%C2%A7188/',
  },
  {
    date: '2026-06-18',
    region: 'DE',
    title: 'Broschüre aus dem ver.di-Umfeld ruft Buchhändler und Verlage zum Boykott nicht genehmer Meinungen auf',
    description:
      'Ein Aktionsbündnis namens „Verlage gegen Rechts" mit enger Verbindung zur Gewerkschaft ver.di ruft Verlage und Buchhändler kaum verhohlen dazu auf, ideologisch nicht genehme Autoren, Bücher und Magazine zu boykottieren.',
    themen: ['Hass und Hetze', 'DSA & NetzDG'],
    haeringLink: 'https://norberthaering.de/propaganda-zensur/verlage-gegen-rechts/',
  },
  {
    date: '2026-06-18',
    region: 'INT',
    title: 'Faktencheckerbranche beklagt auf der GlobalFact 2026 ihren Niedergang',
    description:
      'Auf der GlobalFact-Konferenz des International Fact-Checking Network dokumentiert die Branche selbst ihren Bedeutungsverlust: Meta hat das externe Faktencheck-Programm in den USA beendet, Google fährt die Förderung zurück, und die Zahl der Mitgliedsorganisationen stagniert.',
    themen: ['DSA & NetzDG'],
    haeringLink: 'https://norberthaering.de/news/globalfact-2026/',
  },
  {
    date: '2026-06-23',
    region: 'UK',
    title: 'Britische Regierung stellt Pläne für verpflichtende Priorisierung von Public-Service-Medien vor',
    description:
      'Die britische Regierung will digitalen Plattformen vorschreiben, öffentlich-rechtliche und andere „Public-Service"-Inhalte bevorzugt auszuspielen und ihre Auffindbarkeit gegenüber anderen Inhalten zu verbessern.',
    themen: ['DSA & NetzDG'],
    haeringLink: 'https://norberthaering.de/propaganda-zensur/public-value/',
  },
  {
    date: '2026-06-26',
    region: 'DE',
    title: 'Landesmedienanstalt NRW droht Ben Berndt',
    description:
      'Die Landesmedienanstalt NRW schickt dem Podcaster Ben Berndt einen Drohbrief mit der Aufforderung, „all seine Inhalte auf die Einhaltung journalistischer Grundsätze zu prüfen". Als nächster Schritt drohen kostenpflichtige Aufforderungen zur Löschung oder Änderung von Inhalten.',
    themen: ['Hass und Hetze', 'DSA & NetzDG'],
    haeringLink: 'https://norberthaering.de/news/ben-berndt-bekommt-drohbrief-von-der-landesmedienanstalt/',
  },
  {
    date: '2026-07-02',
    region: 'EU',
    title: 'Europäischer Gerichtshof erklärt selbst gelegentliche Weiterverbreitung von RT-Beiträgen durch Privatpersonen zur Straftat',
    description:
      'Der EuGH entscheidet: Privatpersonen, die Inhalte des sanktionierten Senders RT Deutsch weiterverbreiten, können auch bei nicht-kommerzieller Nutzung ohne fremden Einfluss strafrechtlich verfolgt werden. Das Gericht stellt die Wirksamkeit der Sanktionen über den Schutz der Meinungsfreiheit.',
    themen: ['Ukraine & NATO', 'DSA & NetzDG'],
    haeringLink: 'https://norberthaering.de/propaganda-zensur/eugh-rtdeutsch/',
    thumb: '/chronik-thumbs/eugh-rtdeutsch.jpg',
    imageCredit: 'Screenshot aus dem saarländischen Beschlagnahme-Bescheid',
    featured: true,
  },
  {
    date: '2026-07-06',
    region: 'DE',
    title: 'Große Mehrheit der Deutschen macht sich Sorgen um die Meinungsfreiheit',
    description:
      'Eine INSA-Umfrage im Auftrag von Häring ergibt: Die Mehrheit der Befragten sieht die Meinungsfreiheit in Deutschland in Gefahr. Über alle Alters- und Bildungsgruppen hinweg zeigen sich hohe Zustimmungswerte zu dieser Einschätzung.',
    themen: ['DSA & NetzDG', 'Hass und Hetze'],
    haeringLink: 'https://norberthaering.de/news/insa-meinungsfreiheit/',
  },
];
