import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import * as argon2 from 'argon2';

import db from '$lib/server/db';
import { generateTokens } from '$lib/server/token';
import { setAuthCookies } from '$lib/server/cookie';

const signupSchema = z
	.object({
		username: z
			.string({ required_error: '아이디는 필수 값 입니다.' })
			.regex(/^[A-Za-z]{1}[A-Za-z0-9]{4,19}$/, { message: '아이디 생성 규칙을 확인하세요.' }),
		password: z
			.string({ required_error: '비밀번호는 필수 값 입니다.' })
			.regex(
				/^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/,
				{
					message: '비밀번호 생성 규칙을 확인하세요.'
				}
			),
		confirm: z.string({ required_error: '비밀번호 확인은 필수 값 입니다.' }),
		email: z
			.string({ required_error: '이메일은 필수 값 입니다.' })
			.email({ message: '이메일 규칙에 따라 작성하여 주십시오.' })
	})
	.refine((data) => data.password === data.confirm, {
		message: '비밀번호가 일치하지 않습니다.',
		path: ['confirm'] // path of error
	});

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		const validated = signupSchema.safeParse(formData);

		// validate schema
		if (!validated.success) {
			return fail(400, { message: validated.error.issues[0].message });
		}

		const { username, password, email } = validated.data;

		// check the user already exists
		const foundUser = await db.user.findFirst({
			where: {
				OR: [{ username }, { email }]
			}
		});

		if (foundUser) {
			return fail(400, { message: '해당 아이디 혹은 이메일을 가진 사용자가 이미 존재합니다.' });
		}

		// hash the password
		const hashedPassword = await argon2.hash(password);

		// create new user | Todo: create character class, inventory, equipped
		const newUser = await db.user.create({
			data: {
				username,
				password: hashedPassword,
				email,
				character: {
					create: {
						name: username
					}
				}
			}
		});
		// generate tokens
		const { accessToken, refreshToken } = await generateTokens(newUser);

		// set the cookies in browser
		setAuthCookies(cookies, { accessToken, refreshToken });

		// redirect to '/' route
		throw redirect(302, '/');
	}
};
