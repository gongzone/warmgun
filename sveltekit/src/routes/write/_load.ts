import db from '$lib/server/db';

export async function getDraftsByUserId(userId: number) {
	return await db.draft.findMany({
		where: {
			authorId: userId
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
