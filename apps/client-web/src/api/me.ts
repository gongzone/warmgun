import { apiAfterRefresh } from '$lib/api-client';

export async function getMe() {
	return await apiAfterRefresh.get('api/me').json<GetMeResult>();
}

export interface GetMeResult {
	id: number;
	username: string;
	email: string;
	role: string;
	profile: {
		nickname: string;
		bio: string;
		avatar: string;
	};
}
