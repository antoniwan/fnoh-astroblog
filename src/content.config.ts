import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writings = defineCollection({
	// Load Markdown and MDX files in the `src/content/writings/` directory.
	loader: glob({ base: './src/content/writings', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.string().optional(),
			category: z.enum(['lessons-in-balance', 'chaos-notes', 'recovery-reconstruction', 'empathy-healing', 'modern-life', 'curiosity-lab']).optional(),
		}),
});

export const collections = { writings };
