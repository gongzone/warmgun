import type { Profile, Role } from '@prisma/client';

export type CurrentUser = {
	id: number;
	username: string;
	email: string;
	role: Role;
	profile: Profile;
} | null;
