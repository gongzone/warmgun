import type { Actions } from './$types';
import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';

import { prisma } from '$lib/server/db';
import { validate } from '$lib/server/validation';

export const actions: Actions = {
	follow: async ({ locals, request }) => {
		if (!locals.user) {
			throw error(401, '수행할 수 없습니다.');
		}

		const formData = await request.formData();

		const validated = validate(formData, followsSchema());

		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const { blogUserId } = { ...validated.data, blogUserId: +validated.data.blogUserId };

		await prisma.follows.create({
			data: {
				followerId: locals.user.id,
				followingId: blogUserId
			}
		});
	},
	unFollow: async ({ locals, request }) => {
		if (!locals.user) {
			throw error(401, '수행할 수 없습니다.');
		}

		const formData = await request.formData();

		const validated = validate(formData, followsSchema());

		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const { blogUserId } = { ...validated.data, blogUserId: +validated.data.blogUserId };

		await prisma.follows.delete({
			where: {
				followerId_followingId: {
					followerId: locals.user.id,
					followingId: blogUserId
				}
			}
		});
	}
};

function followsSchema() {
	return z.object({
		blogUserId: z.string()
	});
}
