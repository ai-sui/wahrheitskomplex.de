import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { recherchen } from '../data/recherchen';
import { chronik } from '../data/chronik';
import { glossar } from '../data/glossar';
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
    // ----- Akteure -----
    ...actors
      .filter((a) => a.data.fulltext)
      .map<SearchEntry>((a) => ({
        type: 'akteur',
        title: a.data.name,
        snippet: [a.data.kurzbeschreibung, a.data.kernkritik]
          .filter(Boolean)
          .join(' '),
        url: `/atlas/${a.id}`,
        meta: `${a.data.kategorie} · ${a.data.land}`,
        tags: a.data.themen,
      })),

    // ----- Faktenchecks -----
    ...faktenchecks.map<SearchEntry>((f) => ({
      type: 'faktencheck',
      title: f.data.title,
      snippet: [
        f.data.behauptung,
        f.data.urteil,
        f.data.realitaet,
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

    // ----- Buchkapitel -----
    ...kapitel.map<SearchEntry>((k) => ({
      type: 'kapitel',
      title: `Kapitel ${k.nr}: ${k.title}`,
      snippet: [k.abstract, ...k.unterabschnitte].filter(Boolean).join(' '),
      url: `/buch#kapitel-${k.nr}`,
      meta: 'Buchkapitel',
    })),
  ];

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
