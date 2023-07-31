import type { PageLoad } from './$types';

import { api } from '$lib/api/api';
import type { FindArticlesCategory, FindArticlesSort } from '$lib/server/db/article';

export const load: PageLoad = async ({ parent, fetch, params, url }) => {
	const { queryClient } = await parent();

	const category = params.category as FindArticlesCategory | null;
	const sort = url.searchParams.get('sort') as FindArticlesSort | null;

	await queryClient.prefetchInfiniteQuery({
		queryKey: ['articles', category, sort, 12],
		queryFn: api(fetch).findArticles,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});

	return { category, sort };
};
