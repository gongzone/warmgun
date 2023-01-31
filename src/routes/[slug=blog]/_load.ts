import db from '$lib/server/db';

import { getAvatar } from '$lib/character/avatar';

export async function getBlogUserByUsername(username: string) {
	const blogUser = await db.user.findFirst({
		where: {
			username: username
		},
		select: {
			character: {
				select: {
					name: true,
					level: true,
					class: true,
					mainAvatar: true
				}
			}
		}
	});

	if (!blogUser || !blogUser.character) {
		return null;
	}

	return {
		name: blogUser.character.name,
		level: blogUser.character.level,
		class: blogUser.character.class,
		avatarUrl: getAvatar(blogUser.character.mainAvatar).url
	};
}
