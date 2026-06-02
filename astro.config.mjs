// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://robertcontant.com',
  build: {
    // Inline all stylesheets into the HTML head. Removes the render-blocking
    // external CSS request → faster LCP on mobile. Trade-off is ~13KB extra
    // HTML per page, which CDN compression mostly absorbs.
    inlineStylesheets: 'always',
  },
  integrations: [mdx(), sitemap()],
});