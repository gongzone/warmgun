import { client } from '$lib/client';

export async function getMe(accessToken: string) {
	const { body } = await client<GetMeResult>('api/users/me', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	return body;
}

export interface GetMeResult {
	id: number;
	username: string;
	email: string;
	character: {
		image: string;
	};
}
