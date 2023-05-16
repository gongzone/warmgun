import type { Prisma, Profile, Role } from '@prisma/client';

export type CurrentUser = {
	id: number;
	username: string;
	email: string;
	role: Role;
	profile: Profile | null;
} | null;

export const currentUserSelect = {
	id: true,
	username: true,
	email: true,
	role: true,
	profile: true
} satisfies Prisma.UserSelect;
