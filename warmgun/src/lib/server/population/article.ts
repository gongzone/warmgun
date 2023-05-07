import type { Prisma } from '@prisma/client';

export const articlesInclude = {
	tags: true,
	author: { include: { profile: true } },
	_count: { select: { likes: true, comments: true } }
} satisfies Prisma.ArticleInclude;
