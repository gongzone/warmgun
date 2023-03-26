import { api } from '$lib/api-client';

export async function getPopularTags(take: number) {
	return await api.get(`api/tag/popular?take=${take}`).json<GetPopularTagsResult>();
}

export async function searchTags(input: string, exclude: string) {
	return await api.get(`api/tag?input=${input}&excludes=${exclude}`).json<SearchedTag[]>();
}

type GetPopularTagsResult = {
	name: string;
}[];

export interface SearchedTag {
	name: string;
	count: number;
}
