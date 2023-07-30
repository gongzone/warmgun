import type { Prisma } from '@prisma/client';

import { db } from './db';

export type FindTagsSort = 'popular';

interface FindTagsOptions {
	take?: number;
	cursor?: number;
}

export async function findTags(
	sort: FindTagsSort = 'popular',
	{ take = 10, cursor = 0 }: FindTagsOptions
) {
	let orderBy:
		| Prisma.TagOrderByWithRelationInput
		| Prisma.TagOrderByWithRelationInput[]
		| undefined;

	switch (sort) {
		case 'popular':
			orderBy = [{ articles: { _count: 'desc' } }, { tagLikes: { _count: 'desc' } }];
			break;
		default:
			orderBy = { tagLikes: { _count: 'desc' } };
	}

	return await db.tag.findMany({
		take: take,
		skip: take * cursor,
		orderBy,
		include: {
			_count: {
				select: { articles: true, tagLikes: true }
			}
		}
	});
}
