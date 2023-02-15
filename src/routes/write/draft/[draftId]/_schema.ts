import { z } from 'zod';

export const saveSchema = z.object({
	draftId: z.string(),
	title: z.string(),
	subTitle: z.string(),
	body: z.string()
});

export const publishSchema = z.object({
	title: z.string(),
	subTitle: z.string(),
	body: z.string(),
	coverImage: z.string(),
	slug: z.string()
});

export const deleteSchema = z.object({
	draftId: z.string(),
	currentDraftId: z.string()
});
