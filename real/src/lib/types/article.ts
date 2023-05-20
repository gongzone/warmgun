import type { Prisma, Tag, Article as PrismaArticle, User, Profile } from '@prisma/client';

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
