import db from '$lib/server/db';

export async function getAppUserData(userId: number) {
	return await db.user.findUnique({
		where: {
			id: userId
		},
		select: {
			character: {
				select: {
					mainAvatar: true
				}
			},
			blog: {
				select: {
					url: true
				}
			},
			drafts: {
				select: {
					id: true
				},
				orderBy: {
					updatedAt: 'desc'
				}
			}
		}
	});
}
