import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import * as argon2 from 'argon2';

import { db } from '$lib/server/db';
import { signupSchema } from '$lib/server/schemas/signup-schema';
import { validateFormData } from '$lib/server/validation';
import { generateTokens } from '$lib/server/jwt';
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

		const validated = validateFormData(formData, signupSchema);
		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const { username, password, email } = validated.data;

		/* Core logic */
		const foundUser = await db.user.findFirst({
			where: {
				OR: [{ username }, { email }]
			}
		});
		if (foundUser) {
			return fail(409, { message: '해당 아이디 혹은 이메일을 가진 사용자가 이미 존재합니다.' });
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
			username: user.username
		});
		const hashedRefreshToken = await argon2.hash(refreshToken);

		const token = await db.token.create({
			data: {
				refreshToken: hashedRefreshToken,
				user: { connect: { id: user.id } }
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
