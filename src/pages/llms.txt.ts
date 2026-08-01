import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, CONTACT, DISTRICTS, PLUMBING, COORDINATED_TRADES } from '../config';

export const prerender = true;

const abs = (path: string) => new URL(path, SITE.url).href;

export const GET: APIRoute = async () => {
  const services = (await getCollection('services', ({ data }) => !data.draft)).sort(
    (a, b) => a.data.order - b.data.order,
  );
  const areas = (await getCollection('areas', ({ data }) => !data.draft)).sort(
    (a, b) => a.data.order - b.data.order,
  );

  const lines: string[] = [];

  lines.push(`# ${SITE.name}`, '');
  lines.push(`> ${SITE.tagline}. English-speaking handyman and renovation contractor in Berlin.`, '');
  lines.push(
    `British, 25 years living in Berlin, and a qualified electrician with 15+ years in shopfitting and renovation. Plans, orders, coordinates and does the work — bathrooms, kitchens, tiling, drywall, electrics, flooring, painting and shop fitting.`,
    '',
  );
  lines.push(
    `Plumbing scope: ${PLUMBING.doing}. Does not do ${PLUMBING.notDoing} — that is brought in as a plumber. Does not do ${COORDINATED_TRADES.join(' or ')} at all — coordinated in and worked around rather than covered directly.`,
    '',
  );
  lines.push(`Contact: ${CONTACT.phoneDisplay} (${CONTACT.phoneE164}), WhatsApp preferred.`, '');

  lines.push('## Services', '');
  for (const s of services) {
    lines.push(`- [${s.data.navLabel}](${abs(`/services/${s.id}/`)}): ${s.data.summary}`);
  }
  lines.push('');

  lines.push('## Areas served', '');
  lines.push(`Berlin and just outside it, primarily the Altbau belt: ${DISTRICTS.map((d) => d.name).join(', ')}.`, '');
  for (const a of areas) {
    lines.push(`- [${a.data.name}](${abs(`/areas/${a.id}/`)}): ${a.data.summary}`);
  }
  lines.push('');

  lines.push('## Key pages', '');
  lines.push(`- [About](${abs('/about/')}): who does the work and where the scope stops`);
  lines.push(`- [FAQ](${abs('/faq/')}): quotes, cost, timing, permissions and plumbing scope in detail`);
  lines.push(`- [Gallery](${abs('/gallery/')}): completed jobs by area and service`);
  lines.push(`- [Contact](${abs('/contact/')}): get a quote`);

  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
