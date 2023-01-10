import { client } from '$lib/client';

export async function createAvatar(params: FormData) {
	const { body } = await client.post('api/admin/items/avatars/new', {
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		form: params
	});

	return body;
}
