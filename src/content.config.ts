import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faqItem = z.object({
  q: z.string(),
  a: z.string(),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    /** Visible page H1. */
    title: z.string(),
    /** Short label for nav, cards and breadcrumbs. */
    navLabel: z.string(),
    /** <title>. Written per page, never templated. */
    metaTitle: z.string(),
    metaDescription: z.string(),
    /** One-line summary used on cards and the services index. */
    summary: z.string(),
    /** Slots into "I'd like a quote for ___" in the WhatsApp deep link. */
    waPhrase: z.string(),
    /** Controls order on the index and in the footer. */
    order: z.number(),
    /** Rendered as an FAQPage JSON-LD block plus an on-page section. */
    faqs: z.array(faqItem).default([]),
    /** Slugs of other services to cross-link. */
    related: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const areas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/areas' }),
  schema: z.object({
    /** District name as written locally, e.g. "Neukölln". */
    name: z.string(),
    title: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    summary: z.string(),
    order: z.number(),
    faqs: z.array(faqItem).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    /** District slug, must match an entry in DISTRICTS to filter correctly. */
    district: z.string(),
    /** Service slugs used on this job. Drives gallery filtering and cross-links. */
    services: z.array(z.string()).min(1),
    /** Card blurb. The 150-300 word write-up lives in the Markdown body. */
    summary: z.string(),
    /**
     * Folder name under photos/ and public/img/projects/.
     * Defaults to the entry id when omitted.
     */
    photoDir: z.string().optional(),
    /** Filename (no extension) of the photo used as the card and OG image. */
    cover: z.string().optional(),
    completed: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { services, areas, projects };
