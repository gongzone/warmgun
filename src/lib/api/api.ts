import type { QueryFunctionContext } from '@tanstack/svelte-query';

import type { InfiniteData } from '$lib/types/infinite-data';
import type { Article } from '$lib/types/article';
import type { BlogUser } from '$lib/types/user';

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
		const category = ((queryKey[1] as string) ?? 'ALL').toUpperCase().replace('-', '_');
		const sort = queryKey[2] ?? 'recent';
		const take = queryKey[3] ?? 10;

		const response = await customFetch(
			`/api/articles?category=${category}&sort=${sort}&take=${take}&cursor=${pageParam}`
		);
		const data = (await response.json()) as InfiniteData<Article>;
		return data;
	},
	findArticlesByTagSlug: async ({ queryKey, pageParam = 0 }: QueryFunctionContext) => {
		const tagSlug = queryKey[1];
		const sort = queryKey[2] ?? 'recent';
		const take = queryKey[3] ?? 10;

		const response = await customFetch(
			`/api/articles?tagSlug=${tagSlug}&sort=${sort}&take=${take}&cursor=${pageParam}`
		);
		const data = (await response.json()) as InfiniteData<Article>;
		return data;
	},
	findArticlesByUsername: async ({ queryKey, pageParam = 0 }: QueryFunctionContext) => {
		const username = queryKey[1];
		const sort = queryKey[2] ?? 'recent';
		const take = queryKey[3] ?? 10;

		const response = await customFetch(
			`/api/articles/${username}?sort=${sort}&take=${take}&cursor=${pageParam}`
		);
		const data = (await response.json()) as InfiniteData<Article>;
		return data;
	},
	findFollowingUsers: async ({ pageParam = 0 }: QueryFunctionContext) => {
		const response = await customFetch(`/api/users/following?take=${12}&cursor=${pageParam}`);
		const data = (await response.json()) as InfiniteData<BlogUser>;
		return data;
	}
});
