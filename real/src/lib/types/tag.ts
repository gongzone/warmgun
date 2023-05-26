import type { Prisma, Tag as PrismaTag } from '@prisma/client';

export type Tag = PrismaTag & { _count: { articles: number } };

export const tagInclude = {
	_count: {
		select: { articles: true }
	}
} satisfies Prisma.TagInclude;
