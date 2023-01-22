import type { Avatar, Class } from '@prisma/client';

export type BlogUser = {
	name: string;
	level: number;
	class: Class;
	mainAvatar: Avatar;
};
