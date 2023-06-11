import type { Actions } from './$types';
import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';

import { prisma } from '$lib/server/db';
import { validate } from '$lib/server/validation';

const followTagSchema = z.object({
	tagId: z.string()
});

export const actions: Actions = {
	followTag: async ({ locals, request }) => {
		if (!locals.user) {
			throw error(401, '수행할 수 없습니다.');
		}

		const formData = await request.formData();
		const validated = validate(formData, followTagSchema);

		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const { tagId } = {
			...validated.data,
			tagId: +validated.data.tagId
		};

		const foundLike = await prisma.tagLike.findUnique({
			where: {
				userId_tagId: {
					userId: locals.user.id,
					tagId
				}
			}
		});

		if (foundLike) {
			fail(400, { message: '이미 좋아요한 아티클입니다.' });
		}

		await prisma.tagLike.create({
			data: {
				user: { connect: { id: locals.user.id } },
				tag: { connect: { id: tagId } }
			}
		});
	},
	unFollowTag: async ({ locals, request }) => {
		if (!locals.user) {
			throw error(401, '수행할 수 없습니다.');
		}

		const formData = await request.formData();
		const validated = validate(formData, followTagSchema);

		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const { tagId } = {
			...validated.data,
			tagId: +validated.data.tagId
		};

		await prisma.tagLike.delete({
			where: {
				userId_tagId: {
					userId: locals.user.id,
					tagId
				}
			}
		});
	}
};