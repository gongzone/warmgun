import type { User, Profile } from '@prisma/client';

export type AuthenticatedUser = {
	id: User['id'];
	username: User['username'];
	email: User['email'];
	role: User['role'];
	nickname: Profile['nickname'];
	avatar: Profile['avatar'];
	latestDraftId: number;
} | null;
