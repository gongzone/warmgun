import { api } from '$lib/clients/api-client';

export async function getTopBlogers(take: number) {
	return await api.get(`api/user/top?take=${take}`).json<TopBloger[]>();
}

export async function getUserByUsername(username: string) {
	return await api.get(`api/user/${username}`).json<GetUserByUsernameResult>();
}

interface TopBloger {
	id: number;
	username: string;
	nickname: string;
	bio: string;
	avatar: string;
	articleCount: number;
	followedByCount: number;
}

interface GetUserByUsernameResult {
	nickname: string;
	bio: string;
	avatar: string;
	articleCount: number;
	followedByCount: number;
	followingCount: number;
}
