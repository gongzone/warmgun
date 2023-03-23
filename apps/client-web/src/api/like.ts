import { apiAfterRefresh } from '$lib/api-client';

export async function toggleLike(slug: string) {
	return await apiAfterRefresh.post('api/like', { json: { slug } });
}
