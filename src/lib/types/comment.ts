import type { Prisma, Profile, ArticleComment as PrismaComment, User } from '@prisma/client';

export type Comment = PrismaComment & {
	isLiked: boolean;
	isOwned: boolean;
	user: User & {
		profile: Profile | null;
	};
	_count: {
		children: number;
		likes: number;
	};
};

export const commentInclude = {
	user: {
		select: {
			profile: true
		}
	},
	_count: {
		select: {
			children: true,
			likes: true
		}
	}
} satisfies Prisma.ArticleCommentInclude;
