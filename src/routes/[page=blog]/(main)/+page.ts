import type { PageLoad } from './$types';

import { api } from '$lib/api/api';
import type { FindArticlesCategory, FindArticlesSort } from '$lib/server/db/article';

export const load: PageLoad = async ({ parent, fetch, params, url }) => {
	const { queryClient } = await parent();

	const username = params.page.slice(1);

	await queryClient.prefetchInfiniteQuery({
		queryKey: ['articles', username, 'recent', 10],
		queryFn: api(fetch).findArticlesByUsername,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
};
