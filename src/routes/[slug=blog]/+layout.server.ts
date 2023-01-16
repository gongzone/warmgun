import type { LayoutServerLoad } from './$types';

import db from '$lib/server/db';
import { error } from '@sveltejs/kit';

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

	if (!blogUser || !blogUser.character) {
		throw error(404, { message: 'Not Found' });
	}

	return {
		blogUser: blogUser.character,
		slug: params.slug
	};
}) satisfies LayoutServerLoad;
