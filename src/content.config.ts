import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sourceSchema = z.object({
  title: z.string(),
  url: z.string().url().optional(),
  publisher: z.string().optional(),
  date: z.string().optional(),
});

const actors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/actors' }),
  schema: z.object({
    name: z.string(),
    kategorie: z.string(),
    akteurstyp: z.enum([
      'Behörde',
      'Faktenchecker',
      'Stiftung',
      'Plattform',
      'Medienverbund',
      'NGO',
      'Think Tank',
      'Mittler / NGO',
      'Stiftung / Think Tank',
      'NGO / Geheimdienst-nah',
    ]),
    land: z.string(),
    gegruendet: z.union([z.string(), z.number()]).optional(),
    themen: z.array(z.string()),
    finanzierung: z.string(),
    reichweite: z.string().optional(),
    kernkritik: z.string(),
    stellungnahme: z.string().optional(),
    buchKapitel: z.string().optional(),
    haeringLink: z.string().url().optional(),
    libernetLink: z.string().url().optional(),
    quellen: z.array(sourceSchema).default([]),
    kurzbeschreibung: z.string(),
    fulltext: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

const medien = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/medien' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['video', 'podcast', 'interview', 'rezension', 'vortrag']),
    host: z.string(),
    outlet: z.string(),
    url: z.string().url(),
    youtubeId: z.string().optional(),
    date: z.string(), // ISO YYYY-MM-DD
    durationMin: z.number().optional(),
    paywall: z.boolean().default(false),
    themen: z.array(z.string()).default([]),
    pullquote: z.string().optional(),
    language: z.enum(['de', 'en']).default('de'),
  }),
});

const faktenchecks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faktenchecks' }),
  schema: z.object({
    title: z.string(),
    faktenchecker: z.string(), // z.B. "Correctiv", "dpa", "ARD-Faktenfinder", "ZDF", "DW/NDR", "AFP"
    actorSlug: z.string().optional(), // wenn Faktenchecker ein Atlas-Akteur ist
    date: z.string(), // ISO YYYY-MM-DD
    themen: z.array(z.string()).default([]),
    behauptung: z.string(), // was wurde behauptet
    urteil: z.string(), // welches Urteil hat der Faktenchecker gefällt
    realitaet: z.string(), // was Härings Recherche zeigt
    url: z.string().url(), // Link zum Häring-Artikel
    quellen: z.array(z.string()).default([]),
  }),
});

export const collections = { actors, medien, faktenchecks };
