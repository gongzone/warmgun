import { api } from '$lib/clients/api-client';

export async function getTopBlogers(take = 10) {
	return await api.get(`api/user/top?take=${take}`).json<User[]>();
}

export async function getUserByUsername(username: string) {
	return await api.get(`api/user/${username}`).json<GetUserByUsernameResult>();
}

export interface User {
	id: number;
	username: string;
	email: string;
	role: 'USER' | 'ADMIN';
	profile: {
		nickname: string;
		bio: string;
		avatar: string | null;
	};
	_count: {
		articles: number;
		followedBy: number;
		following: number;
	};
}

interface GetUserByUsernameResult {
	nickname: string;
	bio: string;
	avatar: string;
	articleCount: number;
	followedByCount: number;
	followingCount: number;
}
