import type { RequestHandler } from './$types';
import { z } from 'zod';
import { error, json } from '@sveltejs/kit';

import { prisma } from '$lib/server/db';
import { validate } from '$lib/server/validation';
import { buildInfinityData } from '$lib/utils/infinity-data';
import { articleInclude } from '$lib/types/article';
import type { Genre } from '@prisma/client';

export const GET = (async ({ url }) => {
	const validated = validate(url.searchParams, getArticlesSchema());

	if (!validated.success) {
		throw error(400, validated.errorMessage);
	}

	const { filter, genre, take, cursor } = {
		...validated.data,
		take: +validated.data.take,
		cursor: +validated.data.cursor
	};

	const articles = await findArticles(filter, genre, take, cursor);

	return json(buildInfinityData(articles, take, cursor));
}) satisfies RequestHandler;

async function findArticles(
	filter: 'trending' | 'recent' | 'best' = 'trending',
	genre: Genre | 'ALL',
	take: number,
	cursor: number
) {
	const articles = await prisma.article.findMany({
		take: take,
		skip: take * cursor,
		where: genre !== 'ALL' ? { genre } : {},
		include: articleInclude,
		orderBy:
			filter === 'trending'
				? { trendingScore: 'desc' }
				: filter === 'recent'
				? { createdAt: 'desc' }
				: { likes: { _count: 'desc' } }
	});

	return articles;
}

function getArticlesSchema() {
	return z.object({
		filter: z.enum(['trending', 'recent', 'best']),
		genre: z.enum([
			'ALL',
			'FRONTEND',
			'BACKEND',
			'DEVOPS',
			'MOBILE',
			'DATA_SCIENCE',
			'GAME',
			'ETC'
		]),
		take: z.string({ required_error: '필수 값입니다.' }),
		cursor: z.string({ required_error: '필수 값입니다.' })
	});
}
