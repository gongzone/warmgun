import { db } from '$lib/server/db';

export async function findDrafts(userId: number) {
	const drafts = await db.draft.findMany({
		where: { authorId: userId },
		orderBy: { updatedAt: 'desc' }
	});

	return drafts;
}
