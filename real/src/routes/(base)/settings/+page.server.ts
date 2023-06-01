import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

import { prisma } from '$lib/server/db';
import { validate } from '$lib/server/validation';
import { meilisearch } from '$lib/server/meilisearch';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/auth/login');
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			throw error(401, '인증되지 않은 접근입니다.');
		}

		const formData = await request.formData();

		const validated = validate(formData, updateProfileSchema());

		console.log(formData);

		if (!validated.success) {
			return fail(400, { isSuccess: false, message: validated.errorMessage });
		}

		const { nickname, field, bio, avatar, website, github, instagram, facebook, twitter, youtube } =
			validated.data;

		await prisma.profile.update({
			where: { userId: locals.user.id },
			data: {
				nickname,
				field,
				bio,
				avatar,
				profileLinks: {
					update: { website, github, instagram, facebook, twitter, youtube }
				}
			}
		});

		await meilisearch.index('users').updateDocuments([
			{
				id: locals.user.id,
				nickname: nickname,
				bio: bio
			}
		]);

		return { isSuccess: true, message: '프로필 수정이 완료되었습니다.' };
	}
};

function updateProfileSchema() {
	return z.object({
		nickname: z.string().regex(/^(?![^A-Za-z0-9가-힣]*$)(?!.* {2})[A-Za-z0-9가-힣 ]{2,20}$/, {
			message:
				'닉네임 작성 규칙: 2~20자 사이, 특수문자 불가능, 연속으로 두 번의 공백은 허용되지 않음.'
		}),
		field: z
			.string()
			.min(1, '정체성을 입력해주세요.')
			.max(15, '정체성은 15글자를 넘을 수 없습니다.'),
		bio: z.string().min(1, '소개말을 입력해주세요.').max(860, '소개말은 860자를 넘을 수 없습니다.'),
		avatar: z.string().optional(),
		website: z.string(),
		github: z.string(),
		instagram: z.string(),
		facebook: z.string(),
		twitter: z.string(),
		youtube: z.string()
	});
}
