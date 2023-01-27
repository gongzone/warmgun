import { z } from 'zod';

export const saveSchema = z.object({
	title: z.string(),
	description: z.string(),
	body: z.string(),
	draftId: z.string()
});

export const deleteSchema = z.object({
	currentDraftId: z.string(),
	draftId: z.string()
});

export type SaveSchema = z.infer<typeof saveSchema>;
export type DeleteSchema = z.infer<typeof deleteSchema>;
