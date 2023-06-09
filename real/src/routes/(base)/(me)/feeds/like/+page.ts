import type { PageLoad } from './$types';

import { api } from '$lib/api/api';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchInfiniteQuery({
		queryKey: ['articles', 'feeds', 'like', '', 12],
		queryFn: api(fetch).findArticles
	});
};
