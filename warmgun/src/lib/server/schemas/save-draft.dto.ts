import z from 'zod';

export const saveDraftDto = z.object({
	draftId: z.string(),
	title: z.string(),
	subTitle: z.string(),
	body: z.string()
});
