import type { Prisma } from '@prisma/client';

import { db } from './db';

export type FindPostsSort = 'top';

interface FindArticlesOptions {
	take?: number;
	cursor?: number;
}

export async function findUsers(
	sort: FindPostsSort = 'top',
	{ take = 10, cursor = 0 }: FindArticlesOptions
) {
	let orderBy:
		| Prisma.UserOrderByWithRelationInput
		| Prisma.UserOrderByWithRelationInput[]
		| undefined;

	switch (sort) {
		case 'top':
			orderBy = { followedBy: { _count: 'desc' } };
			break;
		default:
			orderBy = { followedBy: { _count: 'desc' } };
	}

	return await db.user.findMany({
		take: take,
		skip: take * cursor,
		orderBy,
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
}
