import z from 'zod';

export const deleteDraftDto = z.object({
	draftId: z.string(),
	currentDraftId: z.string()
});
