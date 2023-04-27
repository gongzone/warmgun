import type { PageServerLoad } from './$types';

import { findTopUsers } from '$lib/server/services/user';

export const load: PageServerLoad = async ({ locals }) => {
	const topUsers = await findTopUsers();

	return {
		topUsers
	};
};
