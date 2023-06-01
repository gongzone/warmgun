import type { Prisma, Profile, ProfileLinks, Role } from '@prisma/client';

export type CurrentUser = {
	id: number;
	username: string;
	email: string;
	role: Role;
	createdAt: Date;
	profile: {
		id: number;
		nickname: string;
		avatar: string | null;
		blogImage: string | null;
		field: string;
		bio: string;
		profileLinks: ProfileLinks | null;
	} | null;
} | null;

export const currentUserSelect = {
	id: true,
	username: true,
	email: true,
	role: true,
	createdAt: true,
	profile: {
		select: {
			id: true,
			nickname: true,
			avatar: true,
			blogImage: true,
			field: true,
			bio: true,
			profileLinks: true
		}
	}
} satisfies Prisma.UserSelect;

export type BlogUser = {
	id: number;
	username: string;
	email: string;
	role: Role;
	createdAt: Date;
	profile: {
		id: number;
		nickname: string;
		avatar: string | null;
		blogImage: string | null;
		field: string;
		bio: string;
		profileLinks: ProfileLinks | null;
	} | null;
	_count: {
		articles: number;
		followedBy: number;
		following: number;
	};
};

export const blogUserSelect = {
	id: true,
	username: true,
	email: true,
	role: true,
	createdAt: true,
	profile: {
		select: {
			id: true,
			nickname: true,
			avatar: true,
			blogImage: true,
			field: true,
			bio: true,
			profileLinks: true
		}
	},
	_count: {
		select: {
			articles: true,
			followedBy: true,
			following: true
		}
	}
} satisfies Prisma.UserSelect;
