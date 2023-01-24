import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

import { deleteAuthCookies } from '$lib/server/cookie';

export const load: PageServerLoad = async () => {
	throw redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ cookies, locals }) => {
		deleteAuthCookies(cookies);
		locals.user = null;

		throw redirect(302, '/auth/login');
	}
};
