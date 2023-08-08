import type { RequestHandler } from './$types';
import { z } from 'zod';
import { error, json } from '@sveltejs/kit';

import { prisma } from '$lib/server/db';
import { validate } from '$lib/server/validation';
import { buildInfinityData } from '$lib/utils/infinity-data';
import { commentInclude } from '$lib/types/comment';

const getCommentsSchema = z.object({
	mode: z.enum(['article', 'post']),
	take: z.string({ required_error: '필수 값입니다.' }),
	cursor: z.string({ required_error: '필수 값입니다.' }),
	id: z.string(),
	parentId: z.string().nullable().optional()
});

export const GET = (async ({ locals, url, params }) => {
	const validated = validate(url.searchParams, getCommentsSchema);

	if (!validated.success) {
		throw error(400, validated.errorMessage);
	}

	const { mode, take, cursor, id, parentId } = {
		...validated.data,
		take: +validated.data.take,
		cursor: +validated.data.cursor,
		id: +validated.data.id,
		parentId: validated.data.parentId ? +validated.data.parentId : null
	};

	const comments = await findComments(mode, id, parentId, take, cursor, locals.user?.id);

	return json(comments);
}) satisfies RequestHandler;

async function findComments(
	mode: 'article' | 'post',
	id: number,
	parentId: number | null,
	take: number,
	cursor: number,
	userId: number | undefined
) {
	if (mode === 'article') {
		const comments = await prisma.articleComment.findMany({
			take: take,
			skip: take * cursor,
			where: {
				AND: [{ articleId: id }, { parentId }]
			},
			include: { ...commentInclude, likes: true },
			orderBy: [{ createdAt: 'asc' }]
		});

		const newComments = comments.map((comment) => ({
			...comment,
			isLiked: !!comment.likes.find((like) => like.userId === userId),
			isOwned: comment.userId === userId
		}));

		return buildInfinityData(newComments, take, cursor);
	} else {
		const comments = await prisma.postComment.findMany({
			take: take,
			skip: take * cursor,
			where: {
				AND: [{ postId: id }, { parentId }]
			},
			include: { ...commentInclude, likes: true },
			orderBy: [{ createdAt: 'asc' }]
		});

		const newComments = comments.map((comment) => ({
			...comment,
			isLiked: !!comment.likes.find((like) => like.userId === userId),
			isOwned: comment.userId === userId
		}));

		return buildInfinityData(newComments, take, cursor);
	}
}
