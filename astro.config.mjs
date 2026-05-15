// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://handshake.org',
  integrations: [tailwind(), sitemap({
    filter: (page) => page !== 'https://handshake.org/skill.md' && page !== 'https://handshake.org/llms.txt'
  })],
  redirects: {
    '/discord': 'https://discord.gg/Vq3PWF6cJ6',
    '/telegram': 'https://t.me/handshake_hns',
    '/claim.html': '/claim',
    '/faq.html': '/faq',
    '/community.html': '/community',
    '/grant-sponsors.html': '/grant-sponsors',
    '/how-it-works.html': '/how-it-works'
  }
});