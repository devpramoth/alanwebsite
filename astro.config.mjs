// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { SITE } from './src/config.ts';

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: { plugins: [tailwindcss()] },
  integrations: [sitemap()],
});
