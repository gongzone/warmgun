import type { Prisma } from '@prisma/client';

import { db } from './db';
import type { communities } from '$lib/constants/communities';

export type FindPostsCommunity = 'ALL' | keyof typeof communities;
export type FindPostsSort = 'recent' | 'trending';

interface FindArticlesOptions {
	userId?: number;
	take?: number;
	cursor?: number;
}

export async function findPosts(
	community: FindPostsCommunity = 'ALL',
	sort: FindPostsSort = 'recent',
	{ userId, take = 10, cursor = 0 }: FindArticlesOptions
) {
	let orderBy:
		| Prisma.PostOrderByWithRelationInput
		| Prisma.PostOrderByWithRelationInput[]
		| undefined;

	switch (sort) {
		case 'trending':
			orderBy = { trendingScore: 'desc' };
			break;
		default:
			orderBy = { createdAt: 'desc' };
	}

	return await db.post.findMany({
		where: community === 'ALL' ? { userId } : { AND: [{ userId }, { community }] },
		take: take,
		skip: take * cursor,
		orderBy,
		include: {
			user: {
				include: { profile: true }
			},
			_count: {
				select: { likes: true, comments: true }
			}
		}
	});
}

export async function findPostsCount(
	community: FindPostsCommunity = 'ALL',
	options?: { userId?: number }
) {
	return await db.post.count({
		where:
			community === 'ALL'
				? { userId: options?.userId }
				: { AND: [{ userId: options?.userId }, { community }] }
	});
}
