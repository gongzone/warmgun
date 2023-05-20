import type { RequestHandler } from './$types';
import { z } from 'zod';
import { error, json } from '@sveltejs/kit';

import { prisma } from '$lib/server/db';
import { meilisearch } from '$lib/server/meilisearch';
import { validate } from '$lib/server/validation';
import { buildInfinityData } from '$lib/utils/infinity-data';

export const GET = (async ({ locals, url }) => {
	const validated = validate(url.searchParams, searchSchema());

	if (!validated.success) {
		throw error(400, validated.errorMessage);
	}

	const { q, mode, take, cursor } = {
		...validated.data,
		take: +validated.data.take,
		cursor: +validated.data.cursor
	};

	try {
		const searchResult = await meilisearch
			.index(mode)
			.search(`${q}?limit=${take}&offset=${cursor * take}`);

		if (mode === 'tags') {
			const searchedTags = await prisma.tag.findMany({
				where: { id: { in: searchResult.hits.map((hit) => hit.id) } },
				include: { _count: { select: { articles: true } } },
				orderBy: { articles: { _count: 'desc' } }
			});

			return json(buildInfinityData(searchedTags, take, cursor));
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

function searchSchema() {
	return z.object({
		q: z.string({ required_error: '필수 값입니다.' }),
		mode: z.enum(['tags']),
		take: z.string({ required_error: '필수 값입니다.' }),
		cursor: z.string({ required_error: '필수 값입니다.' })
	});
}
