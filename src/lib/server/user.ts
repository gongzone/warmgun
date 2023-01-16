import db from '$lib/server/db';

export const userCache = new Map();

export async function getCurrentUser(userId: number) {
	if (userCache.has(userId)) {
		return userCache.get(userId);
	}

	const currentUser = await db.user.findUnique({
		where: {
			id: userId
		},
		select: {
			id: true,
			username: true,
			email: true,
			role: true,
			character: {
				select: {
					name: true,
					level: true,
					class: true,
					mainAvatar: true,
					avatars: true
				}
			}
		}
	});

	userCache.set(userId, currentUser);

	return currentUser;
}

// Todo: clear user cache function needed to add
