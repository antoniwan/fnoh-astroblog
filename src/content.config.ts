import { defineCollection, z } from 'astro:content';

const writings = defineCollection({
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
			category: z.enum([
				'lessons-in-balance',
				'chaos-notes', 
				'recovery-reconstruction',
				'empathy-healing',
				'modern-life',
				'curiosity-lab'
			]).optional(),
			
			// SEO and metadata
			author: z.string().optional(),
			tags: z.array(z.string()).optional(),
			draft: z.boolean().default(false),
			
			// Reading time and content info
			readingTime: z.number().optional(),
			wordCount: z.number().optional(),
		}),
});

export const collections = { writings };
