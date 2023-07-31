import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

import { validate } from '$lib/server/server-utils';
import { getArticlesSchema } from '$lib/server/schema/article';
import { buildInfinityData } from '$lib/utils/infinity-data';
import { findArticles } from '$lib/server/db/article';

export const GET = (async ({ url }) => {
	const validated = validate(url.searchParams, getArticlesSchema);

	if (!validated.success) {
		throw error(400, validated.errorMessage);
	}

	const { category, sort, take, cursor } = {
		...validated.data,
		take: +validated.data.take,
		cursor: +validated.data.cursor
	};

	const articles = await findArticles(category, sort, { take, cursor });
	return json(buildInfinityData(articles, take, cursor));
}) satisfies RequestHandler;
