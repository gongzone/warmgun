import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

import { findDrafts } from '$lib/server/services/draft';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw error(401, '제한된 접근입니다.');
	}

	const drafts = await findDrafts(locals.user.id);

	return { drafts };
};
