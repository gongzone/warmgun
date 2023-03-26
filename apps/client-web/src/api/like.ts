import { api } from '$lib/clients/api-client';

export async function toggleLike(slug: string) {
	return await api.post('api/like', { json: { slug } });
}
