import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

import { getAvatar } from '$lib/character/avatar';

import { getAppUserData } from '../_load';
import { getBlogUser } from './_load';

export const load = (async ({ locals, params }) => {
	// 해당 params에 맞는 유저 정보 찾기

	const blogUser = await getBlogUser(params.slug);

	if (!blogUser) {
		throw error(404, { message: '잘못된 요청입니다.' });
	}

	if (!locals.user) {
		return { user: null, blogUser };
	}

	const user = await getAppUserData(locals.user.id);

	return {
		user,
		blogUser
	};
}) satisfies LayoutServerLoad;
