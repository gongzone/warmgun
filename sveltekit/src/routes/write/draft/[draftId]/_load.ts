import db from '$lib/server/db';

export async function getDrafts(authorId: number) {
	return await db.draft.findMany({
		where: {
			authorId
		},
		select: {
			id: true,
			title: true,
			subTitle: true,
			updatedAt: true
		},
		orderBy: {
			updatedAt: 'desc'
		}
	});
}

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
