// Site-wide copy and links. Edit here; every page reads from this file.
export const site = {
	name: 'Lara Washington',
	title: 'Lara Washington — Portfolio',
	intro: 'Lara is a creative builder and data visualization designer creating digital tools to explore the world through interaction and narrative.',
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
		{ label: 'Resume', href: '/resume.pdf' },
	],
};

export const about = {
	/** Search results and link previews for the About page. */
	description:
		'About Lara Washington, a creative builder and data visualization designer creating digital tools to explore the world through interaction and narrative. MS Data Visualization, Parsons School of Design.',
	portraitAlt: 'Portrait of Lara Washington',
	bio: [
		'Lara is a creative builder and data visualization designer using data as the substrate for narrative and interaction. Her focus is on how data can create digital experiences that foster exploration, understanding, and connection with our natural world and built environments.',
		'She’s currently pursuing a Master of Science in Data Visualization at Parsons School of Design in New York City, graduating in 2027. She holds a BA in Communication from UCLA.',
		'Before design, she worked across global and boutique advertising agencies in account management. She has managed campaigns for ZYN, Old El Paso, NatWest, UCLA Health, and more. Now, she takes her experience collaborating across multidisciplinary teams as a designer and builder to bring new experiences to life.',
	],
};
