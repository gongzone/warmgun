import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import argon2 from 'argon2';

import { prisma } from '$lib/server/db';
import { validate } from '$lib/server/validation';
import { generateTokens } from '$lib/server/jwt';
import { setAuthCookies } from '$lib/server/cookie';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
};

const loginSchema = z.object({
	username: z.string().min(1, '아이디를 입력해주세요.'),
	password: z.string().min(1, '비밀번호를 입력해주세요.')
});

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const formData = await request.formData();
		const validated = validate(formData, loginSchema);

		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const { username, password } = validated.data;

		const foundUser = await prisma.user.findUnique({ where: { username } });

		if (!foundUser) {
			return fail(401, { message: '잘못된 아이디입니다.' });
		}

		const matched = await argon2.verify(foundUser.password, password);

		if (!matched) {
			return fail(401, { message: '잘못된 비밀번호입니다.' });
		}

		const { accessToken, refreshToken } = await generateTokens({
			userId: foundUser.id,
			username: foundUser.username
		});

		const hashedRefreshToken = await argon2.hash(refreshToken);

		const token = await prisma.token.create({
			data: {
				refreshToken: hashedRefreshToken,
				user: { connect: { id: foundUser.id } }
			}
		});

		setAuthCookies(cookies, {
			tokenId: token.id,
			accessToken,
			refreshToken
		});

		throw redirect(303, '/');
	}
};
