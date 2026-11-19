import type { APIRoute } from 'astro';

// Built from `site` in astro.config.mjs, so the domain lives in one place.
export const GET: APIRoute = ({ site }) =>
	new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site)}\n`);
