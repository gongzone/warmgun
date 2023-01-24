import type { LayoutServerLoad } from './$types';

import { getAvatar } from '$lib/character/avatar';
import { getAppUserData } from './_load';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return { user: null };
	}

	const currentUser = await getAppUserData(locals.user.id);

	const user = {
		role: locals.user.role,
		avatarUrl: getAvatar(currentUser?.character?.mainAvatar).url,
		blogUrl: currentUser?.blog?.url,
		recentDraftId: currentUser?.drafts[0].id
	};

	return { user };
};
