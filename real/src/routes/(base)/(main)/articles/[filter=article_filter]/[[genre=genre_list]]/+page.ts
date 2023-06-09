import type { PageLoad } from './$types';

import { api } from '$lib/api/api';

export const load: PageLoad = async ({ parent, fetch, params }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchInfiniteQuery({
		queryKey: ['articles', 'genre', params.genre?.toUpperCase() ?? 'ALL', params.filter, 12],
		queryFn: api(fetch).findArticles
	});
};
