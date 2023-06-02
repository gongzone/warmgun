import type { InfiniteData } from '$lib/types/Infinite-data';
import type { BlogUser } from '$lib/types/user';
import type { QueryFunctionContext } from '@tanstack/svelte-query';

export async function findFollowingUsers({ queryKey, pageParam = 0 }: QueryFunctionContext) {
	const { data, nextCursor }: InfiniteData<BlogUser> = await fetch(
		`/api/users/following?take=${12}&cursor=${pageParam}`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}
	).then((res) => res.json());

	return { data, nextCursor };
}
