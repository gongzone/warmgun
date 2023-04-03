import { api } from '$lib/clients/api-client';

export async function getPopularTags(take = 12) {
	return await api.get(`api/tag/popular?take=${take}`).json<Tag[]>();
}

export async function searchTags(input: string, exclude: string) {
	return await api.get(`api/tag?input=${input}&excludes=${exclude}`).json<SearchedTag[]>();
}

export interface Tag {
	name: string;
}

export interface SearchedTag {
	name: string;
	count: number;
}
