import { db } from './db';

export async function findLatestDraft(userId: number) {
	return await db.draft.findFirst({
		where: { userId },
		select: { id: true },
		orderBy: { updatedAt: 'desc' }
	});
}
