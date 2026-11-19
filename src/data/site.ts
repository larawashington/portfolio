// Site-wide copy and links. Edit here; every page reads from this file.
// Anything marked "placeholder" is waiting on Lara's copy.
export const site = {
	name: 'Lara Washington',
	title: 'Lara Washington — Portfolio',
	intro: 'Lara is a data visualization designer creating digital tools to explore the natural world through interaction and narrative.',
	credential: 'MS Data Visualization, Parsons School of Design',
	nav: [
		{ label: 'Work', href: '/' },
		{ label: 'About', href: '/about' },
		// Not a link: hovering opens a menu of the contact links below (Resume included).
		{ label: 'Contact', href: '', menu: true },
	],
	contact: [
		{ label: 'Email', href: 'mailto:washingtonlfw@gmail.com' },
		{ label: 'GitHub', href: 'https://github.com/larawashington' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/lara-washington/' },
		{ label: 'Resume', href: '/resume.pdf', internal: true },
	],
};

export const about = {
	standfirst:
		'Lara Washington is a designer and developer who makes maps, charts and small tools about the natural world. (Placeholder — one or two sentences.)',
	portraitAlt: 'Portrait of Lara Washington',
	portraitCaption: 'Lara Washington. Photograph — placeholder credit, 2021.',
	bio: [
		'Placeholder bio paragraph. What you make, how you work, what you care about, and what you’re looking for next. Three or four sentences.',
		'Placeholder bio paragraph. What you make, how you work, what you care about, and what you’re looking for next. Three or four sentences.',
	],
};
