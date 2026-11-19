import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Single source of truth for tool tags. Tags must match exactly.
// New tool? Add it here first, or the build will fail.
export const TOOLS = [
	'Astro',
	'HTML',
	'CSS',
	'JavaScript',
	'TypeScript',
	'D3.js',
	'Leaflet',
	'API',
	'Claude Code',
	'Gemma 3 4B',
	'DeepSeek V4-Pro',
	'Kimi K2.6',
	'Ollama',
	'Hugging Face',
] as const;

// Filter categories on the home page, in display order.
// `slug` is what appears in the URL: /?filter=<slug>
export const CATEGORIES = [
	{ slug: 'data-visualization', label: 'Data Visualization' },
	{ slug: 'ux-design', label: 'UX Design' },
	{ slug: 'ai-design-tooling', label: 'AI Design + Tooling' },
] as const;

const categoryLabels = CATEGORIES.map((c) => c.label) as [string, ...string[]];

const projects = defineCollection({
	// One folder per project: src/content/projects/<slug>/index.md (+ images beside it)
	loader: glob({
		pattern: '*/index.md',
		base: './src/content/projects',
		generateId: ({ entry }) => entry.split('/')[0],
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			/** One or two sentences — home row + meta description. */
			description: z.string(),
			/** Larger intro under the H1 on the project page. Falls back to description. */
			standfirst: z.string().optional(),
			categories: z.array(z.enum(categoryLabels)).min(1),
			tools: z.array(z.enum(TOOLS)).min(1),
			/** Free text for the spec strip, e.g. "Data visualization, front-end development". */
			skills: z.string().optional(),
			/** Home-row image (16:10). */
			hero: image(),
			heroAlt: z.string(),
			/** Silent looping preview in public/media/, e.g. "species-nyc.mp4". Plays on hover on the home page; `hero` is its poster (use the video's first frame). */
			heroVideo: z.string().optional(),
			/** Optional different lead image on the project page (e.g. an animated GIF). */
			pageHero: image().optional(),
			pageHeroAlt: z.string().optional(),
			pageHeroCaption: z.string().optional(),
			/** Show a slide deck instead of a written case study. Images live in public/media/<dir>/slide-01.webp … */
			deck: z
				.object({
					dir: z.string(),
					slides: z.array(z.string()).min(1),
					/** Slide titles left out of the page's slide list (the slide itself stays in the deck). */
					hideFromList: z.array(z.string()).default([]),
					/** GIFs embedded in the deck, re-encoded as MP4 and laid over the slide. Box in % of the slide (from the PPTX). */
					motion: z
						.array(
							z.object({
								slide: z.number().int().min(1),
								src: z.string(),
								left: z.number(),
								top: z.number(),
								width: z.number(),
								height: z.number(),
							}),
						)
						.default([]),
				})
				.optional(),
			/** Show the live site inside the page instead of a written case study. Each entry is a page of liveUrl. */
			embedPages: z.array(z.object({ label: z.string(), path: z.string() })).optional(),
			/** Position on the home page: 1 shows first. Projects without one go after, newest first. Give each project a different number. */
			order: z.number().int().positive().optional(),
			date: z.coerce.date(),
			liveUrl: z.url().optional(),
			repoUrl: z.url().optional(),
			draft: z.boolean().default(false),
		}),
});

export const collections = { projects };
