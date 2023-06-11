import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

import { prisma } from '$lib/server/db';
import { validate } from '$lib/server/validation';
import { buildInfinityData } from '$lib/utils/infinity-data';
import {
	articleInclude,
	articlesBaseSchema,
	articlesOrderBy,
	type ArticlesFilter
} from '$lib/types/article';

const getTagsIdSchema = articlesBaseSchema;

export const GET = (async ({ url, params }) => {
	const validated = validate(url.searchParams, getTagsIdSchema);

	if (!validated.success) {
		throw error(400, validated.errorMessage);
	}

	const { filter, take, cursor } = {
		...validated.data,
		take: +validated.data.take,
		cursor: +validated.data.cursor
	};

	const articles = await findArticlesByTagId(+params.id, filter, take, cursor);

	return json(buildInfinityData(articles, take, cursor));
}) satisfies RequestHandler;

async function findArticlesByTagId(
	tagId: number,
	filter: ArticlesFilter,
	take: number,
	cursor: number
) {
	const articles = await prisma.article.findMany({
		take,
		skip: take * cursor,
		where: { tags: { some: { id: tagId } } },
		include: articleInclude,
		orderBy: articlesOrderBy(filter)
	});

	return articles;
}
