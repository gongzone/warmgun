import { api } from '$lib/clients/api-client';
import type { Article, PaginationData } from '$lib/types/api';
import type { QueryFunctionContext } from '@tanstack/svelte-query';

export async function searchAll({ queryKey, pageParam = 0 }: QueryFunctionContext) {
	const q = queryKey[1];
	const type = queryKey[2] ?? 'articles';

	return api
		.get(`api/search?q=${q}&type=${type}&take=${10}&cursor=${pageParam}`)
		.json<PaginationData<Article>>();
}
