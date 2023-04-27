import type { Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import * as argon2 from 'argon2';

import { db } from '$lib/server/db';
import { signupSchema } from '$lib/server/schemas/signup-schema';
import { validateFormData } from '$lib/server/validation';
import { decodeToken, generateTokens } from '$lib/server/jwt';
import { setAuthCookies } from '$lib/server/cookie';

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		/* Parse DTO */
		const formData = await request.formData();

		const validated = validateFormData(formData, signupSchema);
		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const { username, password, email } = validated.data;

		/* Core logic */
		const foundUser = await db.user.findUnique({
			where: {
				username_email: {
					username,
					email
				}
			}
		});
		if (foundUser) {
			throw fail(409, { message: '해당 아이디 혹은 이메일을 가진 사용자가 이미 존재합니다.' });
		}

		const hashedPassword = await argon2.hash(password);

		const user = await db.user.create({
			data: {
				username,
				password: hashedPassword,
				email,
				profile: {
					create: { nickname: username, field: '블로거', bio: `안녕하세요. ${username}입니다.` }
				},
				drafts: {
					create: {}
				}
			}
		});

		/* Todo: meilisearch Add Index */

		const { accessToken, refreshToken } = await generateTokens({
			userId: user.id,
			username: user.username,
			email: user.email,
			role: user.role
		});
		const hashedRefreshToken = await argon2.hash(refreshToken);
		const decodedRefreshToken = await decodeToken(refreshToken);

		const token = await db.token.create({
			data: {
				refreshToken: hashedRefreshToken,
				expiresIn: decodedRefreshToken.exp,
				createdAt: decodedRefreshToken.iat,
				updatedAt: decodedRefreshToken.iat,
				user: {
					connect: { id: user.id }
				}
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
