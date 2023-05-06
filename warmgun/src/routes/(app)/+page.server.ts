import type { Prisma } from '@prisma/client';
import type { PageServerLoad } from './$types';

import { db } from '$lib/server/db';
import { findTopUsers } from '$lib/server/services/user';
import { buildPaginationData } from '$lib/server/pagination';

const articleInclude = {
	tags: true,
	author: {
		include: { profile: true }
	},
	_count: {
		select: { likes: true, comments: true }
	}
} satisfies Prisma.ArticleInclude;

export const load: PageServerLoad = async ({ url }) => {
	const topUsers = await findTopUsers();

	const filter = url.searchParams.get('filter') ?? 'trending';
	const cursor = url.searchParams.get('cursor') ?? 0;

	const articles = await db.article.findMany({
		take: 12,
		skip: 12 * +cursor,
		include: articleInclude,
		orderBy: filter === 'trending' ? { trendingScore: 'desc' } : { createdAt: 'desc' }
	});

	const { data, nextCursor } = buildPaginationData(articles, 12, +cursor);

	return {
		topUsers,
		articles: data,
		nextCursor
	};
};
