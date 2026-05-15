// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://handshake.org',
  integrations: [tailwind(), sitemap({
    filter: (page) => page !== 'https://handshake.org/skill.md' && page !== 'https://handshake.org/llms.txt'
  })]
});