import type { QueryFunctionContext } from '@tanstack/svelte-query';

import type { InfiniteData } from '$lib/types/infinite-data';
import type { Article } from '$lib/types/article';
import type { BlogUser } from '$lib/types/user';
import type { Post } from '$lib/types/post';
import type { ArticleComment, Comment, PostComment } from '$lib/types/comment';

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
	findPostsByUsername: async ({ queryKey, pageParam = 0 }: QueryFunctionContext) => {
		const username = queryKey[1];
		const sort = queryKey[2] ?? 'recent';
		const take = queryKey[3] ?? '10';

		const response = await customFetch(
			`/api/posts/${username}?sort=${sort}&take=${take}&cursor=${pageParam}`
		);
		const data = (await response.json()) as InfiniteData<Post>;
		return data;
	},
	findFollowingUsers: async ({ pageParam = 0 }: QueryFunctionContext) => {
		const response = await customFetch(`/api/users/following?take=${12}&cursor=${pageParam}`);
		const data = (await response.json()) as InfiniteData<BlogUser>;
		return data;
	},
	findComments: async ({ queryKey, pageParam = 0 }: QueryFunctionContext) => {
		const mode = queryKey[1] ?? 'article';
		const id = queryKey[2];
		const parentId = queryKey[3] ?? null;

		const response = await customFetch(
			`/api/comments?mode=${mode}&take=${10}&cursor=${pageParam}&id=${id}&parentId=${parentId}`
		);
		const data = (await response.json()) as InfiniteData<ArticleComment | PostComment>;
		return data;
	}
});
