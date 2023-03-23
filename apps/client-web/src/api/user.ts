import { apiAfterRefresh } from '$lib/api-client';

export async function getUserByUsername(username: string) {
	return await apiAfterRefresh.get(`api/user/${username}`).json<GetUserByUsernameResult>();
}

interface GetUserByUsernameResult {
	nickname: string;
	bio: string;
	avatar: string;
	articleCount: number;
	followedByCount: number;
	followingCount: number;
}
