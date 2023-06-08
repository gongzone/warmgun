import type { QueryFunctionContext } from '@tanstack/svelte-query';
import type { InfiniteData } from '$lib/types/infinite-data';

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
	}
});
