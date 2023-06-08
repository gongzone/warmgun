import type { QueryFunctionContext } from '@tanstack/svelte-query';

export async function search<T>({ queryKey, pageParam = 0 }: QueryFunctionContext) {
	const mode = queryKey[1];
	const q = queryKey[2] ?? '';
	const take = queryKey[3] ?? 12;

	const { data, nextCursor } = await fetch(
		`/api/search?q=${q}&mode=${mode}&take=${take}&cursor=${pageParam}`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}
	).then((res) => res.json());

	return {
		data: data as T,
		nextCursor: nextCursor as number | undefined
	};
}
