// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { rehypeCaseStudy } from './src/lib/rehype-case-study.mjs';

// https://astro.build/config
export default defineConfig({
  // Served from the `portfolio` repo on the custom domain (public/CNAME), at the root.
  site: 'https://larawashington.com',

  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],

  redirects: {
    '/resume': '/resume.pdf',
  },

  markdown: {
    // Case-study layout: numbered sections, margin notes, captioned figures.
    rehypePlugins: [rehypeCaseStudy],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
