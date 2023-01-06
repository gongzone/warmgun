import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

import { deleteAuthCookie } from '$lib/cookie';

export const actions: Actions = {
	default: async ({ cookies, locals }) => {
		deleteAuthCookie(cookies);
		locals.accessToken = null;

		console.log('🎈 로그아웃 성공!');

		throw redirect(302, '/');
	}
};
