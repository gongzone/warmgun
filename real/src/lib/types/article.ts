import type { Prisma, Tag, Article as PrismaArticle, User, Profile } from '@prisma/client';
import { z } from 'zod';

export type Article = PrismaArticle & {
	tags: Tag[];
	author: User & {
		profile: Profile | null;
	};
	_count: {
		comments: number;
		likes: number;
	};
};

export const articleInclude = {
	tags: true,
	author: {
		include: { profile: true }
	},
	_count: {
		select: { likes: true, comments: true }
	}
} satisfies Prisma.ArticleInclude;

export type ArticlesFilter = 'trending' | 'recent' | 'best';

export const articlesBaseSchema = z.object({
	filter: z.enum(['trending', 'recent', 'best']),
	take: z.string({ required_error: '필수 값입니다.' }),
	cursor: z.string({ required_error: '필수 값입니다.' })
});

export function articlesOrderBy(
	filter: ArticlesFilter
): Prisma.Enumerable<Prisma.ArticleOrderByWithRelationInput> | undefined {
	return filter === 'trending'
		? { trendingScore: 'desc' }
		: filter === 'recent'
		? { createdAt: 'desc' }
		: { likes: { _count: 'desc' } };
}
