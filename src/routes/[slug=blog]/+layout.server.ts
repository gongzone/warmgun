import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

import { getAppUserData } from '../_load';
import { getBlogUserByUsername } from './_load';

export const load = (async ({ locals, params }) => {
	const blogUsername = params.slug.slice(1);
	const blogUser = await getBlogUserByUsername(blogUsername);

	if (!blogUser) {
		throw error(404, { message: '페이지를 찾을 수 없습니다.' });
	}

	const enhancedBlogUser = { ...blogUser, blogUsername };

	if (!locals.user) {
		return { user: null, blogUser: enhancedBlogUser };
	}

	const user = await getAppUserData(locals.user.id);

	return {
		user,
		blogUser: enhancedBlogUser
	};
}) satisfies LayoutServerLoad;
