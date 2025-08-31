// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://fieldnotesonhumanity.com',
	integrations: [mdx(), sitemap()],
	build: {
		// Enable tree-shaking and dead code elimination
		inlineStylesheets: 'auto',
		// Optimize assets
		assets: '_astro',
	},
	// Performance optimizations
	vite: {
		// Optimize dependencies
		optimizeDeps: {
			include: ['lucide-astro']
		},
		// Build optimizations
		build: {
			rollupOptions: {
				output: {
					manualChunks: {
						'vendor': ['lucide-astro']
					}
				}
			}
		},
		// Development server optimizations
		server: {
			hmr: {
				overlay: false
			}
		}
	},
});
