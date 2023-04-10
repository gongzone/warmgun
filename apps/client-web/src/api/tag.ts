import { api } from '$lib/clients/api-client';

import type { Tag } from '$lib/types/api';

export async function findAllTags({ mode }: { mode: TagFindAllMode }) {
	return await api.get(`api/tags?mode=${mode}`).json<Tag[]>();
}

export async function searchTags(input: string, exclude: string) {
	return await api.get(`api/tags/search?input=${input}&excludes=${exclude}`).json<SearchedTag[]>();
}

type TagFindAllMode = 'popular';

export interface SearchedTag {
	name: string;
	count: number;
}
