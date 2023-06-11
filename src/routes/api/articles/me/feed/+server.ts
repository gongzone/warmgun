import type { RequestHandler } from './$types';
import { z } from 'zod';
import { error, json, redirect } from '@sveltejs/kit';

import { prisma } from '$lib/server/db';
import { validate } from '$lib/server/validation';
import { buildInfinityData } from '$lib/utils/infinity-data';
import { articleInclude } from '$lib/types/article';

const schema = z.object({
	take: z.string({ required_error: '필수 값입니다.' }),
	cursor: z.string({ required_error: '필수 값입니다.' })
});

export const GET = (async ({ locals, url }) => {
	if (!locals.user) {
		throw redirect(302, '/auth/login');
	}

	const validated = validate(url.searchParams, schema);

	if (!validated.success) {
		throw error(400, validated.errorMessage);
	}

	const { take, cursor } = {
		take: +validated.data.take,
		cursor: +validated.data.cursor
	};

	const articles = await findFeedArticles(locals.user.id, take, cursor);

	return json(buildInfinityData(articles, take, cursor));
}) satisfies RequestHandler;

async function findFeedArticles(userId: number, take: number, cursor: number) {
	const follows = await prisma.follows.findMany({
		where: {
			followerId: userId
		}
	});

	const tagLikes = await prisma.tagLike.findMany({
		where: { userId }
	});

	const articles = await prisma.article.findMany({
		take,
		skip: take * cursor,
		where: {
			OR: [
				{ authorId: { in: follows.map((follow) => follow.followingId) } },
				{ tags: { some: { id: { in: tagLikes.map((like) => like.id) } } } }
			],
			NOT: {
				authorId: userId
			}
		},
		include: articleInclude,
		orderBy: { createdAt: 'desc' }
	});

	return articles;
}
