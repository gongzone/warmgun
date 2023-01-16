import type { Avatar, Class } from '@prisma/client';

export type CurrentUser = {
	id: number;
	username: string;
	email: string;
	role: string;
	character: {
		name: string;
		level: number;
		class: Class;
		mainAvatar: Avatar;
		avatars: Avatar[];
	} | null;
} | null;
