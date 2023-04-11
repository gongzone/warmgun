import { api } from '$lib/clients/api-client';

import type { Tag } from '$lib/types/api';

export async function findPopularTags() {
	return await api.get(`api/tags/popular?take=${12}`).json<Tag[]>();
}

export async function searchTags(input: string, exclude: string) {
	return await api.get(`api/tags/search?input=${input}&excludes=${exclude}`).json<SearchedTag[]>();
}

export interface SearchedTag {
	name: string;
	count: number;
}
