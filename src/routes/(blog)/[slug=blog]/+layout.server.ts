import type { LayoutServerLoad } from './$types';

import db from '$lib/server/db';

export const load = (async ({ params }) => {
	// 해당 params에 맞는 유저 정보 찾기

	const blogUser = await db.user.findUnique({
		where: {
			username: params.slug.slice(1)
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

	console.log(blogUser);

	return {
		slug: params.slug
	};
}) satisfies LayoutServerLoad;
