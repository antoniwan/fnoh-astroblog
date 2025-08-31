import { defineCollection, z, reference } from 'astro:content';
import { glob } from 'astro/loaders';

const writings = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/writings" }),
	schema: ({ image }) =>
		z.object({
			// Required fields
			title: z.string().min(1, 'Title is required'),
			description: z.string().min(1, 'Description is required'),
			pubDate: z.coerce.date(),
			
			// Optional fields with strict validation
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			heroImageAlt: z.string().optional(),
			category: reference('categories').optional(),
			
			// SEO and metadata
			author: z.string().optional(),
			tags: z.array(z.string()).optional(),
			draft: z.boolean().default(false),
			
			// Reading time and content info
			readingTime: z.number().optional(),
			wordCount: z.number().optional(),
		}),
});

const categories = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/categories" }),
	schema: z.object({
		title: z.string(),
		emoji: z.string(),
		description: z.string(),
		slug: z.string(),
	}),
});

export const collections = { writings, categories };
