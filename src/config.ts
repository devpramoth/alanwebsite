/**
 * Single source of truth for business details.
 * Nothing else in the codebase should hard-code a phone number, address or handle.
 */

export const SITE = {
  name: 'English Handyman Berlin',
  tagline: 'Building your dreams and fixing your nightmares',
  url: 'https://englishhandymanberlin.com',
  locale: 'en_GB',
  lang: 'en-GB',
};

export const CONTACT = {
  /** Human-readable, used in visible text. */
  phoneDisplay: '+49 176 10699483',
  /** E.164, used in tel: links and JSON-LD. */
  phoneE164: '+4917610699483',
  /** Digits only, no +, used to build wa.me links. */
  whatsapp: '4917610699483',
  /**
   * A personal mailbox, not one on this domain (the zone has no MX records yet).
   * While null, the UI omits every email touchpoint rather than rendering a dead mailto:.
   */
  email: 'handymanberlin@yahoo.com' as string | null,
  /** Handle as shown to people, no @. */
  instagram: 'Handyman_Berlin',
  /** Full profile URL, used for links and JSON-LD sameAs. */
  instagramUrl: 'https://www.instagram.com/handyman_berlin/',
};

export const ANALYTICS = {
  /**
   * TODO: flip to true once the Plausible account exists (~EUR 9/month).
   * Uses the tagged-events build so CTA clicks are tracked with a CSS class,
   * no bespoke JS. No cookies, so no consent banner required.
   */
  enabled: false,
  domain: 'englishhandymanberlin.com',
};

/** Districts with a dedicated /areas/ page. Order drives nav and listing order. */
export const DISTRICTS = [
  { slug: 'neukoelln', name: 'Neukölln' },
  { slug: 'kreuzberg', name: 'Kreuzberg' },
  { slug: 'mitte', name: 'Mitte' },
  { slug: 'prenzlauer-berg', name: 'Prenzlauer Berg' },
  { slug: 'friedrichshain', name: 'Friedrichshain' },
  { slug: 'charlottenburg', name: 'Charlottenburg' },
] as const;

export type DistrictSlug = (typeof DISTRICTS)[number]['slug'];

/**
 * The plumbing boundary, written once so every page draws the line in the
 * same place. Fixtures onto existing connections: yes. Moving what feeds
 * them: no — that goes to a plumber.
 */
export const PLUMBING = {
  doing: 'fitting showers, toilets, basins and taps onto the connections already there',
  notDoing: 'moving supply pipes or drainage to a new position',
};

/** Disciplines not carried out at all — brought in and worked around instead. */
export const COORDINATED_TRADES = ['architecture', 'structural engineering'];

/** Minimum callout for general handyman work. */
export const HANDYMAN_MINIMUM_HOURS = 3;
