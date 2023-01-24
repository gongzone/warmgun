import db from '$lib/server/db';

export async function getWriterData(userId: number) {
	return await db.user.findFirst({
		where: {
			id: userId
		},
		select: {
			character: {
				select: {
					name: true,
					level: true,
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
					id: true,
					title: true,
					description: true,
					updatedAt: true
				},
				orderBy: {
					updatedAt: 'desc'
				}
			}
		}
	});
}
