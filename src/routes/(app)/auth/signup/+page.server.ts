import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import * as argon2 from 'argon2';

import { validateFormData, extractErrorMessage } from '$lib/server/validation';
import { generateTokens } from '$lib/server/token';
import { setAuthCookies } from '$lib/server/cookie';

import { findUserByUsernameOrEmail, createNewUser } from './_action';
import { signupSchema } from './_schema';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		console.log(locals.user);
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const validated = validateFormData(formData, signupSchema);

		if (!validated.success) {
			return fail(400, { success: false, message: extractErrorMessage(validated.error) });
		}

		const { username, password, email } = validated.data;

		const foundUser = await findUserByUsernameOrEmail(username, email);

		if (foundUser) {
			return fail(400, {
				success: false,
				message: '해당 아이디 혹은 이메일을 가진 사용자가 이미 존재합니다.'
			});
		}

		const hashedPassword = await argon2.hash(password);

		const newUser = await createNewUser(username, hashedPassword, email);

		const { accessToken, refreshToken } = await generateTokens(newUser.id);

		setAuthCookies(cookies, { accessToken, refreshToken });

		throw redirect(302, '/');
	}
};
