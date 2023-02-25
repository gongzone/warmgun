import { z } from 'zod';

export const publishSchema = z.object({
	title: z.string(),
	subTitle: z.string(),
	body: z.string(),
	coverImage: z.string(),
	slug: z.string(),
	tags: z.string()
});
