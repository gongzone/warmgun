import type { PageLoad } from './$types';

import { api } from '$lib/api/api';

export const load: PageLoad = async ({ parent, fetch, params }) => {
	const { queryClient, tag } = await parent();

	await queryClient.prefetchInfiniteQuery({
		queryKey: ['articles', 'tags', tag.id, params.filter, 12],
		queryFn: api(fetch).findArticles
	});
};
