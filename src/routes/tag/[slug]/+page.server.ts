import type { Actions, PageServerLoad } from './$types';
import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';

import { prisma } from '$lib/server/db';
import { validate } from '$lib/server/validation';
import { findOneTag } from '$lib/server/db/tag';
import TagSelector from '$components/Write/PublishSidebar/TagSelector/TagSelector.svelte';

const followTagSchema = z.object({
	tagId: z.string()
});

export const load: PageServerLoad = async ({ locals, params }) => {
	const tag = await findOneTag(params.slug, locals.user?.id);

	if (!tag) {
		throw error(404, '접근 불가');
	}

	return {
		tag,
		isLiked: !!(tag.tagLikes.length > 0)
	};
};

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
