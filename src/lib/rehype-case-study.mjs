// Turns a plain markdown case study into the Figma section layout:
//
//   ## Heading          → <section class="case-section"> with "I." numeral + rule
//   <aside>…</aside>    → the margin column (first 5 of the main column's 18)
//   text                → the text column (last 13)
//   figures             → the full main column, margin included
//   ![alt](./x.png "Caption")            → <figure> with <figcaption>
//   several images in one paragraph      → a grid of figures (2 or 3 across)
//   single figures by shape: landscape → full main column; portrait → text column,
//   capped to the viewport; very tall (style guides) → text column, uncapped;
//   thin strips (UI snippets) → text column
//
// Walks the hast tree by hand. Images in a row are sized by aspect ratio (via sharp,
// which Astro already ships) so they share one height.

import path from 'node:path';
import sharp from 'sharp';

const NUMERALS = [
	[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];
const roman = (n) => {
	let out = '';
	for (const [v, g] of NUMERALS) while (n >= v) { out += g; n -= v; }
	return `${out}.`;
};

const el = (tagName, properties = {}, children = []) => ({ type: 'element', tagName, properties, children });
const text = (value) => ({ type: 'text', value });
const isBlank = (n) => n.type === 'text' && !n.value.trim();
const isImg = (n) => n.type === 'element' && n.tagName === 'img';

/** Pull the caption out of the image title, whether or not Astro has already wrapped the props. */
function takeCaption(img) {
	const p = img.properties ?? {};
	if (p.title) {
		const t = p.title;
		delete p.title;
		return t;
	}
	if (typeof p.__ASTRO_IMAGE_ === 'string') {
		try {
			const data = JSON.parse(p.__ASTRO_IMAGE_);
			if (data.title) {
				const t = data.title;
				delete data.title;
				p.__ASTRO_IMAGE_ = JSON.stringify(data);
				return t;
			}
		} catch {}
	}
	return null;
}

function figure(img) {
	const caption = takeCaption(img);
	const children = [img];
	if (caption) children.push(el('figcaption', {}, [text(caption)]));
	return el('figure', {}, children);
}

function transformFigures(node, rows, singles) {
	if (!node.children) return;
	node.children = node.children.map((child) => {
		if (child.type === 'element' && child.tagName === 'p') {
			const content = child.children.filter((c) => !isBlank(c) && !(c.type === 'element' && c.tagName === 'br'));
			if (content.length && content.every(isImg)) {
				if (content.length === 1) {
					const fig = figure(content[0]);
					singles.push(fig);
					return fig;
				}
				const row = el('div', { className: ['figure-row'] }, content.map(figure));
				rows.push(row);
				return row;
			}
		}
		transformFigures(child, rows, singles);
		return child;
	});
}

/** Image source as written in markdown, whether or not Astro has wrapped the props. */
function imageSrc(img) {
	const p = img.properties ?? {};
	if (typeof p.__ASTRO_IMAGE_ === 'string') {
		try {
			return JSON.parse(p.__ASTRO_IMAGE_).src;
		} catch {}
	}
	return p.src;
}

async function dimensions(img, file) {
	const dir = path.dirname(file.path ?? file.history?.[0] ?? '');
	return sharp(path.resolve(dir, decodeURI(imageSrc(img)))).metadata();
}

/** Tag a lone figure by shape so CSS can size it. */
async function shapeFigure(fig, file) {
	try {
		const { width, height } = await dimensions(fig.children[0], file);
		const r = height / width;
		if (r > 2) fig.properties.className = ['tall'];
		else if (r > 1) fig.properties.className = ['portrait'];
		else if (r < 0.2) fig.properties.className = ['strip'];
	} catch {}
}

/** flex-grow = width / height, so every figure in the row lands at the same height. */
async function sizeRow(row, file) {
	await Promise.all(
		row.children.map(async (fig) => {
			try {
				const { width, height } = await dimensions(fig.children[0], file);
				fig.properties.style = `flex: ${(width / height).toFixed(4)} 1 0`;
			} catch {
				fig.properties.style = 'flex: 1 1 0';
			}
		}),
	);
}

/** External links in the case study open in a new tab. */
function externalLinks(node) {
	if (node.type === 'element' && node.tagName === 'a' && /^https?:/.test(node.properties?.href ?? '')) {
		node.properties.target = '_blank';
		node.properties.rel = 'noopener';
	}
	node.children?.forEach(externalLinks);
}

export function rehypeCaseStudy() {
	return async (tree, file) => {
		externalLinks(tree);
		const rows = [];
		const singles = [];
		transformFigures(tree, rows, singles);
		await Promise.all([...rows.map((row) => sizeRow(row, file)), ...singles.map((fig) => shapeFigure(fig, file))]);

		const out = [];
		let current = null;
		let count = 0;

		for (const node of tree.children) {
			if (node.type === 'element' && node.tagName === 'h2') {
				count += 1;
				const margin = el('div', { className: ['case-margin'] });
				const row = el('div', { className: ['case-row'] }, [margin]);
				const head = el('div', { className: ['case-head'] }, [
					el('span', { className: ['num'], ariaHidden: 'true' }, [text(roman(count))]),
					node,
				]);
				out.push(el('section', { className: ['case-section'], dataSection: String(count) }, [head, row]));
				current = { margin, row };
				continue;
			}
			if (!current) {
				out.push(node);
				continue;
			}
			if (isBlank(node)) continue;
			const isAside =
				(node.type === 'element' && node.tagName === 'aside') ||
				(node.type === 'raw' && node.value.trim().startsWith('<aside'));
			if (isAside) current.margin.children.push(node);
			else current.row.children.push(node);
		}

		tree.children = out;
	};
}
