import type { Prisma, Tag, Post as PrismaPost, User, Profile } from '@prisma/client';

export type Post = PrismaPost & {
	user: User & {
		profile: Profile | null;
	};
	_count: {
		comments: number;
		likes: number;
	};
};
