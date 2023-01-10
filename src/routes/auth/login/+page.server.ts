import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import * as argon2 from 'argon2';

import db from '$lib/server/db';
import { setAuthCookies } from '$lib/server/cookie';
import { generateTokens } from '$lib/server/token';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
};

const loginSchema = z.object({
	username: z.string({ required_error: '아이디는 필수 값 입니다.' }),
	password: z.string({ required_error: '비밀번호는 필수 값 입니다.' })
});

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		const validated = loginSchema.safeParse(formData);

		// validate schema
		if (!validated.success) {
			return fail(400, { message: validated.error.issues[0].message });
		}

		const { username, password } = validated.data;

		// find the user
		const foundUser = await db.user.findUnique({
			where: {
				username
			}
		});

		if (!foundUser) {
			return fail(401, { message: '아이디가 잘못되었습니다.' });
		}

		// check password
		const matched = await argon2.verify(foundUser.password, password);

		if (!matched) {
			return fail(401, { message: '비밀번호가 잘못되었습니다.' });
		}

		// generate tokens
		const { accessToken, refreshToken } = await generateTokens(foundUser);

		// set the cookies in browser
		setAuthCookies(cookies, { accessToken, refreshToken });

		// redirect to '/' route
		throw redirect(302, '/');
	}
};
