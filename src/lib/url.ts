// Prefixes internal paths with the configured `base` (e.g. /portfolio).
// Use for every internal link/asset so changing `base` in astro.config.mjs is the only edit needed.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path: string) => `${base}${path}`;
