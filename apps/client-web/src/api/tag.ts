import { apiAfterRefresh } from '$lib/api-client';

export async function searchTags(input: string, exclude: string) {
	return await apiAfterRefresh.get(`api/tag?input=${input}&exclude=${exclude}`).json();
}
