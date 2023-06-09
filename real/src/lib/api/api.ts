import type { QueryFunctionContext } from '@tanstack/svelte-query';

import type { InfiniteData } from '$lib/types/infinite-data';
import type { Article } from '$lib/types/article';

export const api = (customFetch = fetch) => ({
	search: async <T>({ queryKey, pageParam = 0 }: QueryFunctionContext) => {
		const mode = queryKey[1];
		const q = queryKey[2] ?? '';
		const take = queryKey[3] ?? 12;

		const response = await customFetch(
			`/api/search?q=${q}&mode=${mode}&take=${take}&cursor=${pageParam}`
		);
		const data = (await response.json()) as InfiniteData<T>;
		return data;
	},
	findArticles: async ({ queryKey, pageParam = 0 }: QueryFunctionContext) => {
		const mode = queryKey[1] ?? null;
		const key = queryKey[2];
		const filter = queryKey[3] ?? 'trending';
		const take = queryKey[4] ?? 12;
		let subPath = '';
		let addedQueryParams = '';

		if (mode === 'genre') {
			addedQueryParams = `&genre=${key}`;
		}

		if (mode === 'tags') {
			subPath = `/tags/${key}`;
		}

		const response = await customFetch(
			`/api/articles${subPath}?filter=${filter}&take=${take}&cursor=${pageParam}${addedQueryParams}`
		);
		const data = (await response.json()) as InfiniteData<Article>;
		return data;
	}
});
