import { db } from '$lib/server/db';
import type { Prisma } from '@prisma/client';

const userSelect = {
	id: true,
	username: true,
	email: true,
	createdAt: true,
	role: true,
	profile: true,
	_count: {
		select: { articles: true, followedBy: true, following: true }
	}
} satisfies Prisma.UserSelect;

export async function findTopUsers() {
	const users = await db.user.findMany({
		take: 10,
		select: userSelect,
		orderBy: { followedBy: { _count: 'desc' } }
	});

	return users;
}
