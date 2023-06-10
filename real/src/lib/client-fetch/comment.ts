import type { InfiniteData } from '$lib/types/infinite-data';
import type { Comment } from '$lib/types/comment';
import type { QueryFunctionContext } from '@tanstack/svelte-query';

export async function findComments({ queryKey, pageParam = 0 }: QueryFunctionContext) {
	const articleId = queryKey[1];
	const parentId = queryKey[2] ?? null;

	console.log(parentId);

	const { data, nextCursor }: InfiniteData<Comment> = await fetch(
		`/api/comments/${articleId}?take=${10}&cursor=${pageParam}${
			parentId ? `&parentId=${parentId}` : ''
		}`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}
	).then((res) => res.json());

	return { data, nextCursor };
}
