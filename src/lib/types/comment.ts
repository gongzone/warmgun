import type {
	Prisma,
	Profile,
	ArticleComment as PrismaArticleComment,
	PostComment as PrismaPostComment,
	User
} from '@prisma/client';

export type ArticleComment = PrismaArticleComment & {
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

export type PostComment = PrismaPostComment & {
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
