import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import * as argon2 from 'argon2';

import { db } from '$lib/server/db';
import { loginSchema } from '$lib/server/schemas/login-schema';
import { validateFormData } from '$lib/server/validation';
import { decodeToken, generateTokens } from '$lib/server/jwt';
import { setAuthCookies } from '$lib/server/cookie';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		/* Parse DTO */
		const formData = await request.formData();

		const validated = validateFormData(formData, loginSchema);
		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const { username, password } = validated.data;

		/* Core logic */
		const foundUser = await db.user.findUnique({
			where: { username }
		});
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
		const decodedRefreshToken = await decodeToken(refreshToken);

		const token = await db.token.create({
			data: {
				refreshToken: hashedRefreshToken,
				expiresIn: decodedRefreshToken.exp,
				createdAt: decodedRefreshToken.iat,
				updatedAt: decodedRefreshToken.iat,
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
