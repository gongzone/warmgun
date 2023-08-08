import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

import { prisma } from '$lib/server/db';
import { validate } from '$lib/server/validation';

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

		const validated = validate(formData, updateBlogSchema());

		if (!validated.success) {
			return fail(400, { isSuccess: false, message: validated.errorMessage });
		}

		const { blogImage } = validated.data;

		await prisma.profile.update({
			where: { userId: locals.user.id },
			data: { blogImage }
		});

		return { isSuccess: true, message: '블로그 설정이 완료되었습니다.' };
	}
};

function updateBlogSchema() {
	return z.object({
		blogImage: z.string().optional()
	});
}
