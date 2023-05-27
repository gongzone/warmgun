import type { Prisma, Profile, Comment as PrismaComment } from '@prisma/client';

export type Comment = PrismaComment & {
	user: {
		profile: Profile | null;
	};
	_count: {
		children: number;
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
			children: true
		}
	}
} satisfies Prisma.CommentInclude;
