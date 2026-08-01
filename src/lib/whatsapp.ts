import { CONTACT } from '../config';

/**
 * Build a wa.me deep link with the message box pre-filled.
 * Every page passes its own message so the first thing we receive already
 * says what the job is and where it is.
 */
export function waLink(message: string): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Default enquiry used where a page has no more specific context. */
export const WA_DEFAULT = 'Hi, I’d like a quote for some work in Berlin.';

/** "Hi, I’d like a quote for a bathroom renovation in Neukölln." */
export function waForService(service: string, district?: string): string {
  const where = district ? ` in ${district}` : ' in Berlin';
  return `Hi, I’d like a quote for ${service}${where}.`;
}
