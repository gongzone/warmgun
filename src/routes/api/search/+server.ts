import type { RequestHandler } from './$types';
import { z } from 'zod';
import { error, json } from '@sveltejs/kit';

import { prisma } from '$lib/server/db';
import { meilisearch } from '$lib/server/meilisearch';
import { validate } from '$lib/server/validation';
import { buildInfinityData } from '$lib/utils/infinity-data';

const searchSchema = z.object({
	q: z.string(),
	mode: z.enum(['articles', 'tags', 'users']),
	take: z.string(),
	cursor: z.string()
});

export const GET = (async ({ url }) => {
	const validated = validate(url.searchParams, searchSchema);

	if (!validated.success) {
		throw error(400, validated.errorMessage);
	}

	const { q, mode, take, cursor } = {
		...validated.data,
		take: +validated.data.take,
		cursor: +validated.data.cursor
	};

	try {
		const searchResult = await meilisearch.index(mode).search(q, {
			limit: take,
			offset: cursor * take
		});

		if (mode === 'articles') {
			const searchedArticles = await prisma.article.findMany({
				where: { id: { in: searchResult.hits.map((hit) => hit.id) } },
				include: {
					user: {
						include: { profile: true }
					},
					_count: {
						select: { likes: true, comments: true }
					},
					tags: true
				}
			});

			return json(buildInfinityData(searchedArticles, take, cursor));
		}

		if (mode === 'tags') {
			const searchedTags = await prisma.tag.findMany({
				where: { id: { in: searchResult.hits.map((hit) => hit.id) } },
				include: {
					_count: {
						select: { articles: true, tagLikes: true }
					}
				}
			});

			return json(buildInfinityData(searchedTags, take, cursor));
		}

		if (mode === 'users') {
			const searchedUsers = await prisma.user.findMany({
				where: { id: { in: searchResult.hits.map((hit) => hit.id) } },
				select: {
					id: true,
					username: true,
					email: true,
					role: true,
					createdAt: true,
					profile: {
						select: {
							id: true,
							nickname: true,
							avatar: true,
							blogImage: true,
							field: true,
							bio: true,
							profileLinks: true
						}
					},
					_count: {
						select: {
							articles: true,
							followedBy: true,
							following: true
						}
					}
				}
			});

			return json(buildInfinityData(searchedUsers, take, cursor));
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
