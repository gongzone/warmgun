import type { InfiniteData } from '$lib/types/Infinite-data';
import type { Article } from '$lib/types/article';
import type { QueryFunctionContext } from '@tanstack/svelte-query';

export async function findArticles({ queryKey, pageParam = 0 }: QueryFunctionContext) {
	const filter = queryKey[1];
	const genre = queryKey[2];

	const { data, nextCursor }: InfiniteData<Article> = await fetch(
		`/api/articles?filter=${filter}&genre=${genre}&take=${12}&cursor=${pageParam}`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}
	).then((res) => res.json());

	return { data, nextCursor };
}

export async function findBlogArticles({ queryKey, pageParam = 0 }: QueryFunctionContext) {
	const username = queryKey[1];

	const { data, nextCursor }: InfiniteData<Article> = await fetch(
		`/api/articles/${username}?take=${12}&cursor=${pageParam}`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}
	).then((res) => res.json());

	return { data, nextCursor };
}

export async function findFeedArticles({ queryKey, pageParam = 0 }: QueryFunctionContext) {
	const { data, nextCursor }: InfiniteData<Article> = await fetch(
		`/api/articles/feed?take=${12}&cursor=${pageParam}`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}
	).then((res) => res.json());

	return { data, nextCursor };
}

export async function findLikeArticles({ queryKey, pageParam = 0 }: QueryFunctionContext) {
	const { data, nextCursor }: InfiniteData<Article> = await fetch(
		`/api/articles/like?take=${12}&cursor=${pageParam}`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}
	).then((res) => res.json());

	return { data, nextCursor };
}
