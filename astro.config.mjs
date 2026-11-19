// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import { rehypeCaseStudy } from './src/lib/rehype-case-study.mjs';

// Served from the `portfolio` repo on the custom domain (public/CNAME).
const SITE = 'https://larawashington.com';
const BASE = '';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,

  redirects: {
    // Drop the file at public/resume.pdf
    '/resume': `${BASE}/resume.pdf`,
  },

  markdown: {
    // Case-study layout: numbered sections, margin notes, captioned figures.
    rehypePlugins: [rehypeCaseStudy],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
