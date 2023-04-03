import { api } from '$lib/clients/api-client';

export async function getMe() {
	return await api.get('api/me').json<Me>();
}

export async function getMyDrafts() {
	return await api.get('api/me/drafts').json<MyDraft[]>();
}

export interface Me {
	id: number;
	username: string;
	email: string;
	role: string;
	profile: {
		nickname: string;
		avatar: string;
	};
}

export interface MyDraft {
	id: number;
	title: string;
	subTitle: string;
	updatedAt: Date;
}
