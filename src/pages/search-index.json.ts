import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { recherchen } from '../data/recherchen';
import { chronik } from '../data/chronik';
import { glossar } from '../data/glossar';
import { definitionen } from '../data/definitionen';
import { kapitel } from '../data/buch';

export type SearchEntry = {
  type:
    | 'akteur'
    | 'faktencheck'
    | 'medien'
    | 'recherche'
    | 'chronik'
    | 'glossar'
    | 'kapitel';
  title: string;
  snippet: string;
  url: string;
  meta?: string; // z.B. „Correctiv · 2022" — kontextueller Eintrag-Untertitel
  tags?: string[];
  date?: string;
};

export const GET: APIRoute = async () => {
  const actors = await getCollection('actors');
  const faktenchecks = await getCollection('faktenchecks');
  const medien = await getCollection('medien');

  const idAnchor = (s: string) =>
    s.toLowerCase().replace(/\s+/g, '-');

  const index: SearchEntry[] = [
    // ----- Akteure (Volltext + Stubs) -----
    ...actors.map<SearchEntry>((a) => ({
      type: 'akteur',
      title: a.data.name,
      snippet: [a.data.kurzbeschreibung, a.data.kernkritik]
        .filter(Boolean)
        .join(' '),
      // Volltext-Profile haben eigene Detail-Seite, Stubs verweisen auf
      // Härings Tiefenartikel (oder als Fallback auf das Atlas-Grid).
      url: a.data.fulltext
        ? `/portraits/${a.id}`
        : (a.data.haeringLink ?? `/portraits#${a.id}`),
      meta:
        `${a.data.kategorie} · ${a.data.land}` +
        (a.data.fulltext ? '' : ' · Stub'),
      tags: a.data.themen,
    })),

    // ----- Faktenchecks -----
    // Wichtig: sowohl die Drei-Block-Felder (alte Form) als auch das
    // summary (neue, harmonisierte Vorspann-Form) gehen ins Snippet.
    // Sonst sind summary-only-Karten wie tagesschau-vitamin-d in der
    // Suche unsichtbar (Ralph 25.5.: "es gibt keinen Treffer fuer
    // Vitamin").
    ...faktenchecks.map<SearchEntry>((f) => ({
      type: 'faktencheck',
      title: f.data.title,
      snippet: [
        f.data.behauptung,
        f.data.urteil,
        f.data.realitaet,
        f.data.summary,
        f.data.faktenchecker,
      ]
        .filter(Boolean)
        .join(' '),
      url: `/faktenchecks#${f.id}`,
      meta: `${f.data.faktenchecker} · ${f.data.date.slice(0, 4)}`,
      tags: f.data.themen,
      date: f.data.date,
    })),

    // ----- Medien -----
    ...medien.map<SearchEntry>((m) => ({
      type: 'medien',
      title: m.data.title,
      snippet: [m.data.host, m.data.outlet, m.data.pullquote ?? '']
        .filter(Boolean)
        .join(' '),
      url: m.data.url,
      meta: `${m.data.outlet} · ${m.data.date.slice(0, 4)}`,
      tags: m.data.themen,
      date: m.data.date,
    })),

    // ----- Recherchen -----
    ...recherchen.map<SearchEntry>((r) => ({
      type: 'recherche',
      title: r.frage,
      snippet: [r.tag, r.mainstream, r.recherche].filter(Boolean).join(' '),
      url: `/recherchen#${r.slug}`,
      meta: r.tag + (r.buchKapitel ? ` · ${r.buchKapitel}` : ''),
      tags: [r.tag],
    })),

    // ----- Chronik -----
    ...chronik.map<SearchEntry>((c) => ({
      type: 'chronik',
      title: c.title,
      snippet: [c.description ?? '', c.region].filter(Boolean).join(' '),
      url: `/chronik`,
      meta: `${c.region} · ${c.date.slice(0, 4)}`,
      tags: c.themen ?? [],
      date: c.date,
    })),

    // ----- Glossar -----
    ...glossar.map<SearchEntry>((g) => ({
      type: 'glossar',
      title: g.term,
      snippet: [g.longForm ?? '', g.definition].filter(Boolean).join(' '),
      url: `/glossar#${idAnchor(g.term)}`,
      meta: g.longForm ?? 'Begriff',
    })),

    // ----- Definitionen ("Was ist..."-Karten + Detail-Seiten) -----
    // Eigene Quelle neben glossar.ts: pointierte Antworten mit
    // optionalem Volltext und eigener Detail-Seite.
    ...definitionen.map<SearchEntry>((d) => ({
      type: 'glossar',
      title: d.term,
      snippet: [d.antwort, ...(d.volltext ?? [])].filter(Boolean).join(' '),
      url: d.slug ? `/glossar/${d.slug}` : `/glossar#${idAnchor(d.term)}`,
      meta: d.quelle,
    })),

    // ----- Buchkapitel -----
    ...kapitel.map<SearchEntry>((k) => ({
      type: 'kapitel',
      title: `Kapitel ${k.nr}: ${k.title}`,
      snippet: [k.abstract, ...k.unterabschnitte].filter(Boolean).join(' '),
      url: `/buch#kapitel-${k.nr}`,
      meta: 'Buchkapitel',
    })),

    // ----- Weiterfuehrende externe Quellen pro Kapitel -----
    // freistattsmart.de und vergleichbare Eintraege, die unter
    // "Weiterfuehrend" auf der Buch-Seite gefuehrt werden, sind
    // auch ueber die Suche erreichbar.
    ...kapitel.flatMap<SearchEntry>((k) =>
      (k.weiterfuehrend ?? []).map((w) => ({
        type: 'kapitel',
        title: w.label,
        snippet: [w.beschreibung ?? '', `Kapitel ${k.nr}: ${k.title}`]
          .filter(Boolean)
          .join(' '),
        url: w.url,
        meta: `Weiterführend · Kap. ${k.nr}`,
      })),
    ),
  ];

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
