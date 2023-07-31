import type { Prisma } from '@prisma/client';

import { db } from './db';
import type { categories } from '$lib/constants/categories';

export type FindArticlesCategory = 'ALL' | keyof typeof categories;
export type FindArticlesSort = 'recent' | 'trending' | 'best';

interface FindArticlesOptions {
	userId?: number;
	take?: number;
	cursor?: number;
}

export async function findArticles(
	category: FindArticlesCategory = 'ALL',
	mode: FindArticlesSort = 'recent',
	{ userId, take = 10, cursor = 0 }: FindArticlesOptions
) {
	let orderBy:
		| Prisma.ArticleOrderByWithRelationInput
		| Prisma.ArticleOrderByWithRelationInput[]
		| undefined;

	switch (mode) {
		case 'trending':
			orderBy = { trendingScore: 'desc' };
			break;
		case 'best':
			orderBy = { likes: { _count: 'desc' } };
			break;
		default:
			orderBy = { createdAt: 'desc' };
	}

	return await db.article.findMany({
		where: category === 'ALL' ? { userId } : { AND: [{ userId }, { category }] },
		take: take,
		skip: take * cursor,
		orderBy,
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
}
