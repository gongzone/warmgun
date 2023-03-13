import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

import { getDrafts } from './_load';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw error(404);
	}

	const drafts = await getDrafts(locals.user.id);

	const enhancedWriter = {
		username: locals.user.username,
		nickname: locals.user.nickname,
		avatar: locals.user.avatar,
		drafts
	};

	return { writer: enhancedWriter };
};
