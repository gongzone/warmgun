import db from '$lib/server/db';

export async function createDraft(authorId: number) {
	return await db.draft.create({
		data: {
			author: {
				connect: {
					id: authorId
				}
			}
		}
	});
}

export async function deleteDraft(draftId: number) {
	return await db.draft.delete({
		where: {
			id: draftId
		}
	});
}

export async function findLatestDraft(authorId: number) {
	return await db.draft.findFirst({
		where: {
			authorId: authorId
		},
		orderBy: {
			updatedAt: 'desc'
		},
		select: {
			id: true
		}
	});
}
