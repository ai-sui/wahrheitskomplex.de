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
    // Kurze Service-Notiz (kein Zitat), z.B. „Interview ab Minute 13:30."
    // Wird in MediaCard separat unter dem Pullquote gerendert, ohne
    // Anführungszeichen und ohne Kursiv-Stil.
    note: z.string().optional(),
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
    // Drei-Block-Form (Standard):
    behauptung: z.string().optional(),
    urteil: z.string().optional(),
    realitaet: z.string().optional(),
    // Oder kompakte Variante (rendert statt der drei Blöcke):
    summary: z.string().optional(),
    url: z.string().url(), // Link zum Häring-Artikel
    quellen: z.array(z.string()).default([]),
    // Override des automatisch geholten og:image (Pfad unter /public)
    thumbOverride: z.string().optional(),
    // Bild-Attribution (nur bei Wikimedia-Commons oder anderen freien
    // Bildern noetig). credit = kurzer Text ("Foto: Vorname Nachname,
    // CC BY-SA 4.0"). creditUrl = optionaler Link zur Quellseite auf
    // Commons.
    credit: z.string().optional(),
    creditUrl: z.string().url().optional(),
    // Optionaler Sortier-Override. Karten werden nach Datum sortiert
    // (neueste zuerst). Bei gewünschten Reihenfolge-Abweichungen kann
    // `order` ein Datum-String (YYYY-MM-DD) sein, der das echte Datum
    // für die Sortierung ersetzt — z.B. um einen thematisch passenden
    // Beitrag vor einen anderen zu ziehen, obwohl er älter ist.
    order: z.string().optional(),
  }),
});

export const collections = { actors, medien, faktenchecks };
