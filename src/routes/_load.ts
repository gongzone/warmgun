import db from '$lib/server/db';

import { getAvatar } from '$lib/character/avatar';

export async function getAppUserData(userId: number) {
	const currentUser = await db.user.findUnique({
		where: {
			id: userId
		},
		select: {
			role: true,
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
				take: 1,
				select: {
					id: true
				},
				orderBy: {
					updatedAt: 'desc'
				}
			}
		}
	});

	if (!currentUser || !currentUser.character || !currentUser.blog) {
		return null;
	}

	return {
		role: currentUser.role,
		avatarUrl: getAvatar(currentUser?.character?.mainAvatar).url,
		blogUrl: currentUser.blog.url,
		recentDraftId: currentUser.drafts[0].id
	};
}
