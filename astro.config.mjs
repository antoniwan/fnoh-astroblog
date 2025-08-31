// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://fieldnotesonhumanity.com',
	integrations: [
		mdx({
			// Enable MDX features for better content authoring
			remarkPlugins: [],
			rehypePlugins: [],
		}),
		sitemap({
			// Optimize sitemap generation
			changefreq: 'weekly',
			priority: 0.7,
		}),
	],
	build: {
		// Modern Astro 5.x build optimizations
		inlineStylesheets: 'auto',
		assets: '_astro',
	},
});
