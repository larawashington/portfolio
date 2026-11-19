import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES } from '../content.config';

export type Project = CollectionEntry<'projects'>;

/** Published projects, by `order` (1 first), then newest first for any without one. */
export async function getProjects() {
	const projects = await getCollection('projects', ({ data }) => !data.draft);
	return projects.sort(
		(a, b) =>
			(a.data.order ?? Infinity) - (b.data.order ?? Infinity) ||
			b.data.date.valueOf() - a.data.date.valueOf(),
	);
}

const NUMERALS: [number, string][] = [
	[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

/** 1 → "I.", 4 → "IV." — the site uses roman numerals for projects and sections. */
export function roman(n: number) {
	let out = '';
	for (const [value, glyph] of NUMERALS) {
		while (n >= value) {
			out += glyph;
			n -= value;
		}
	}
	return `${out}.`;
}

export const categorySlug = (label: string) =>
	CATEGORIES.find((c) => c.label === label)?.slug ?? label;

/** "November 2026" */
export const formatMonth = (date: Date) =>
	date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
