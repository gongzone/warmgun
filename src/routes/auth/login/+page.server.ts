import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

import { login } from '$api/auth';
import { setAuthCookie } from '$lib/cookie';
import { extractError } from '$lib/error';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();

		const username = formData.get('username');
		const password = formData.get('password');

		if (typeof username !== 'string' || typeof password !== 'string') return null;

		try {
			const {
				tokens: { accessToken, refreshToken }
			} = await login({ username, password });

			setAuthCookie(cookies, { accessToken, refreshToken });

			console.log('❗ login 완료!');
			throw redirect(302, '/');
		} catch (err) {
			const { statusCode, message } = extractError(err);

			return fail(statusCode, { message });
		}
	}
};
