import type { RequestHandler } from './$types';
import { z } from 'zod';
import { error, json } from '@sveltejs/kit';

import { prisma } from '$lib/server/db';
import { validate } from '$lib/server/validation';
import { buildInfinityData } from '$lib/utils/infinity-data';
import { commentInclude } from '$lib/types/comment';

export const GET = (async ({ locals, url, params }) => {
	const validated = validate(url.searchParams, getCommentsSchema());

	if (!validated.success) {
		throw error(400, validated.errorMessage);
	}

	const { parentId, take, cursor } = {
		parentId: validated.data.parentId ? +validated.data.parentId : null,
		take: +validated.data.take,
		cursor: +validated.data.cursor
	};

	const comments = await findComments(+params.articleId, parentId, take, cursor, locals.user?.id);

	return json(buildInfinityData(comments, take, cursor));
}) satisfies RequestHandler;

async function findComments(
	articleId: number,
	parentId: number | null,
	take: number,
	cursor: number,
	userId: number | undefined
) {
	const comments = await prisma.comment.findMany({
		take: take,
		skip: take * cursor,
		where: {
			AND: [{ articleId }, { parentId }]
		},
		include: { ...commentInclude, likes: true },
		orderBy: {
			createdAt: 'desc'
		}
	});

	const newComments = comments.map((comment) => ({
		...comment,
		isLiked: !!comment.likes.find((like) => like.userId === userId)
	}));

	return newComments;
}

function getCommentsSchema() {
	return z.object({
		parentId: z.string().nullable().optional(),
		take: z.string({ required_error: '필수 값입니다.' }),
		cursor: z.string({ required_error: '필수 값입니다.' })
	});
}
