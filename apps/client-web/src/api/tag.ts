import { api } from '$lib/api-client';

export async function getPopularTags() {
	return await api.get('api/tag/popular').json<PopularTag[]>();
}

export async function searchTags(input: string, exclude: string) {
	return await api.get(`api/tag?input=${input}&excludes=${exclude}`).json<SearchedTag[]>();
}

interface PopularTag {
	name: string;
}

export interface SearchedTag {
	name: string;
	count: number;
}
