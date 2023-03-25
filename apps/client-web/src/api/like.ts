import { api } from '$lib/api-client';

export async function toggleLike(slug: string) {
	return await api.post('api/like', { json: { slug } });
}
