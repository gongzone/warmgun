import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import * as argon2 from 'argon2';

import { validateFormData, extractErrorMessage } from '$lib/server/validation';
import { setAuthCookies } from '$lib/server/cookie';
import { generateTokens } from '$lib/server/token';

import { findUserByUsername } from './_action';
import { loginSchema } from './_schema';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const validated = validateFormData(formData, loginSchema);

		if (!validated.success) {
			return fail(400, { success: false, message: extractErrorMessage(validated.error) });
		}

		const { username, password } = validated.data;

		const foundUser = await findUserByUsername(username);

		if (!foundUser) {
			return fail(401, { success: false, message: '아이디가 잘못되었습니다.' });
		}

		const matched = await argon2.verify(foundUser.password, password);

		if (!matched) {
			return fail(401, { success: false, message: '비밀번호가 잘못되었습니다.' });
		}

		const { accessToken, refreshToken } = await generateTokens(foundUser.id);

		setAuthCookies(cookies, { accessToken, refreshToken });

		throw redirect(302, '/');
	}
};
