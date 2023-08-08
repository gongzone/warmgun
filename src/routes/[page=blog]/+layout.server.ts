import type { LayoutServerLoad } from './$types';

import { error } from '@sveltejs/kit';
import { findOneUser } from '$lib/server/db/user';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const blogUser = await findOneUser(params.page.slice(1), locals.user?.id);

	if (!blogUser) {
		throw error(404, '접근 불가');
	}

	return {
		blogUser,
		isOwner: blogUser.id === locals.user?.id,
		isFollowing: !!blogUser.followedBy?.length
	};
};
