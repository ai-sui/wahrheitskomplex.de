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

export const collections = { actors };
