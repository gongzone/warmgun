import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

import { db } from '$lib/server/db';
import { meilisearchClient } from '$lib/server/meilisearch';
import { validate } from '$lib/server/validation';
import { searchDto } from '$lib/server/schemas/search.dto';
import { buildPaginationData } from '$lib/server/pagination';

export const GET = (async ({ locals, url }) => {
	const validated = validate(url.searchParams, searchDto);
	if (!validated.success) {
		throw error(400, validated.errorMessage);
	}

	const { q, mode, take, cursor } = validated.data;

	try {
		const searchResult = await meilisearchClient
			.index(mode)
			.search(`${q}?limit=${+take}&offset=${+cursor * +take}`);

		if (mode === 'tags') {
			const searchedTags = await db.tag.findMany({
				where: { id: { in: searchResult.hits.map((hit) => hit.id) } },
				include: { _count: { select: { articles: true } } },
				orderBy: { articles: { _count: 'desc' } }
			});

			return json(buildPaginationData(searchedTags, +take, +cursor));
		}
	} catch {
		return json({
			data: [],
			nextCusor: undefined
		});
	}

	return json({
		data: [],
		nextCusor: undefined
	});
}) satisfies RequestHandler;
