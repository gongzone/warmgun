import type { Prisma, Tag as PrismaTag } from '@prisma/client';

export type Tag = PrismaTag & { _count: { articles: number; tagLikes: number } };

export const tagInclude = {
	_count: {
		select: { articles: true, tagLikes: true }
	}
} satisfies Prisma.TagInclude;
