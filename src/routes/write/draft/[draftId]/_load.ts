import db from '$lib/server/db';

export async function getDraft(draftId: number, authorId: number) {
	return await db.draft.findFirst({
		where: {
			AND: {
				id: draftId,
				authorId: authorId
			}
		}
	});
}
