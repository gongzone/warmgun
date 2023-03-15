import api from '$lib/api-client';

export async function getMe() {
	return await api.get('api/me').json<GetMeResult>();
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
