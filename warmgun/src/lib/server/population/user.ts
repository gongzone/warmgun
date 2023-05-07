import type { Prisma } from '@prisma/client';

export const currentUserSelect = {
	id: true,
	username: true,
	email: true,
	role: true,
	profile: true
} satisfies Prisma.UserSelect;

export const userSelect = {
	id: true,
	username: true,
	email: true,
	createdAt: true,
	role: true,
	profile: true,
	_count: { select: { articles: true, followedBy: true, following: true } }
} satisfies Prisma.UserSelect;
