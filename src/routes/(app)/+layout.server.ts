import type { LayoutServerLoad } from './$types';

import { getAppUserData } from '../_load';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return { user: null };
	}

	const user = await getAppUserData(locals.user.id);

	return { user };
};
