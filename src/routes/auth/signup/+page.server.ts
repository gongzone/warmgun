import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

import { signup } from '$api/auth';
import { setAuthCookie } from '$lib/cookie';
import { extractError } from '$lib/error';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();

		const username = formData.get('username');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirmPassword');
		const email = formData.get('email');

		if (
			typeof username !== 'string' ||
			typeof password !== 'string' ||
			typeof confirmPassword !== 'string' ||
			typeof email !== 'string'
		)
			return null;

		try {
			const {
				tokens: { accessToken, refreshToken }
			} = await signup({ username, password, confirmPassword, email });

			setAuthCookie(cookies, { accessToken, refreshToken });
		} catch (err) {
			const { statusCode, message } = extractError(err);

			return fail(statusCode, { message });
		}

		console.log('❗ signup 완료!');
		throw redirect(302, '/');
	}
};
