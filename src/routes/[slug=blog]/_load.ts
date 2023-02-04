import db from '$lib/server/db';

export async function getBlogerByUsername(username: string) {
	const bloger = await db.user.findFirst({
		where: {
			username: username
		},
		select: {
			_count: {
				select: {
					articles: true,
					followedBy: true,
					following: true
				}
			},
			profile: {
				select: {
					nickname: true,
					description: true,
					avatar: true
				}
			}
		}
	});

	if (!bloger || !bloger.profile) {
		return null;
	}

	const enhancedBloger = {
		nickname: bloger.profile.nickname,
		description: bloger.profile.description,
		avatar: bloger.profile.avatar,
		_count: bloger._count
	};

	return enhancedBloger;
}
