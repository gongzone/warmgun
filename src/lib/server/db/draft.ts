import { db } from './db';

export async function findLatestDraft(userId: number) {
	return await db.draft.findFirst({
		where: { userId },
		select: { id: true },
		orderBy: { updatedAt: 'desc' }
	});
}

export async function findDrafts(userId: number) {
	const drafts = await db.draft.findMany({
		where: { userId: userId },
		orderBy: { updatedAt: 'desc' }
	});

	return drafts;
}
