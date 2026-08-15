import { SITE, CONTACT, DISTRICTS } from '../config';

const abs = (path: string) => new URL(path, SITE.url).href;

/** Stable @id so other nodes can reference the business rather than repeat it. */
export const BUSINESS_ID = `${SITE.url}/#business`;

/**
 * HomeAndConstructionBusiness for the site as a whole.
 *
 * Deliberately omitted: streetAddress, opening hours, priceRange, aggregateRating.
 * None of those are known, and inventing them is both dishonest and a
 * structured-data violation.
 */
export function businessSchema(opts?: {
  /** Full service list, for the pages that already fetch it — keeps the catalog out of pages that don't need it. */
  catalog?: { name: string; description: string; path: string }[];
}) {
  return {
    '@type': 'HomeAndConstructionBusiness',
    '@id': BUSINESS_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.tagline,
    telephone: CONTACT.phoneE164,
    ...(CONTACT.email ? { email: CONTACT.email } : {}),
    ...(CONTACT.instagramUrl ? { sameAs: [CONTACT.instagramUrl] } : {}),
    image: abs('/logo.png'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Berlin',
      addressCountry: 'DE',
    },
    areaServed: [
      { '@type': 'City', name: 'Berlin' },
      ...DISTRICTS.map((d) => ({
        '@type': 'AdministrativeArea',
        name: d.name,
        url: abs(`/areas/${d.slug}/`),
      })),
    ],
    knowsLanguage: ['en-GB', 'de-DE'],
    ...(opts?.catalog && opts.catalog.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Services',
            itemListElement: opts.catalog.map((s, i) => ({
              '@type': 'Offer',
              position: i + 1,
              itemOffered: {
                '@type': 'Service',
                name: s.name,
                description: s.description,
                url: abs(s.path),
              },
            })),
          },
        }
      : {}),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    '@type': 'Service',
    '@id': `${abs(opts.path)}#service`,
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    serviceType: opts.serviceType ?? opts.name,
    provider: { '@id': BUSINESS_ID },
    areaServed: DISTRICTS.map((d) => ({ '@type': 'AdministrativeArea', name: d.name })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  if (!faqs.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function imageObjectSchema(opts: {
  url: string;
  alt: string;
  width: number;
  height: number;
}) {
  return {
    '@type': 'ImageObject',
    contentUrl: abs(opts.url),
    url: abs(opts.url),
    caption: opts.alt,
    width: opts.width,
    height: opts.height,
    creditText: SITE.name,
  };
}

/** Wraps nodes into a single @graph so each page emits exactly one script tag. */
export function graph(...nodes: (object | null | undefined)[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}
