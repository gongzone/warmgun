import type { RequestHandler } from './$types';
import { z } from 'zod';
import { error, json } from '@sveltejs/kit';

import { prisma } from '$lib/server/db';
import { meilisearch } from '$lib/server/meilisearch';
import { validate } from '$lib/server/validation';
import { buildInfinityData } from '$lib/utils/infinity-data';
import { articleInclude } from '$lib/types/article';

export const GET = (async ({ locals, url, params }) => {
	const validated = validate(url.searchParams, getArticlesSchema());

	if (!validated.success) {
		throw error(400, validated.errorMessage);
	}

	const { take, cursor } = {
		take: +validated.data.take,
		cursor: +validated.data.cursor
	};

	const articles = await findBlogArticles(params.username, take, cursor);

	return json(buildInfinityData(articles, take, cursor));
}) satisfies RequestHandler;

async function findBlogArticles(username: string, take: number, cursor: number) {
	const articles = await prisma.article.findMany({
		take: take,
		skip: take * cursor,
		where: { author: { username: username } },
		include: articleInclude,
		orderBy: { createdAt: 'desc' }
	});

	return articles;
}

function getArticlesSchema() {
	return z.object({
		take: z.string({ required_error: '필수 값입니다.' }),
		cursor: z.string({ required_error: '필수 값입니다.' })
	});
}
