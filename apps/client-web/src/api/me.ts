import { apiAfterRefresh } from '$lib/api-client';

export async function getMe() {
	return await apiAfterRefresh.get('api/me').json<GetMeResult>();
}

export async function getMyDrafts() {
	return await apiAfterRefresh.get('api/me/drafts').json<GetMyDraftsResult[]>();
}

export interface GetMeResult {
	id: number;
	username: string;
	email: string;
	role: string;
	profile: {
		nickname: string;
		bio: string;
		avatar: string | null;
	};
}

export interface GetMyDraftsResult {
	id: number;
	title: string;
	subTitle: string;
	updatedAt: Date;
}
