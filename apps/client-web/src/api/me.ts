import { api } from '$lib/api-client';

export async function getMe() {
	return await api.get('api/me').json<GetMeResult>();
}

export async function getMyDrafts() {
	return await api.get('api/me/drafts').json<GetMyDraftsResult>();
}

export interface GetMeResult {
	id: number;
	username: string;
	email: string;
	role: string;
	profile: {
		nickname: string;
		avatar: string | null;
	};
}

export type GetMyDraftsResult = {
	id: number;
	title: string;
	subTitle: string;
	updatedAt: Date;
}[];
