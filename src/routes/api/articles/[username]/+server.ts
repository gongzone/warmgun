import type { RequestHandler } from './$types';
import { z } from 'zod';
import { error, json } from '@sveltejs/kit';

import { prisma } from '$lib/server/db';
import { meilisearch } from '$lib/server/meilisearch';
import { validate } from '$lib/server/validation';
import { buildInfinityData } from '$lib/utils/infinity-data';
import { articleInclude } from '$lib/types/article';
import { findArticles } from '$lib/server/db/article';
import { getArticlesSchema } from '$lib/server/schema/article';

export const GET = (async ({ locals, url, params }) => {
	const validated = validate(url.searchParams, getArticlesSchema);

	if (!validated.success) {
		throw error(400, validated.errorMessage);
	}

	const { sort, take, cursor } = {
		...validated.data,
		take: +validated.data.take,
		cursor: +validated.data.cursor
	};

	const articles = await findArticles('ALL', sort, { username: params.username, take, cursor });

	return json(buildInfinityData(articles, take, cursor));
}) satisfies RequestHandler;
