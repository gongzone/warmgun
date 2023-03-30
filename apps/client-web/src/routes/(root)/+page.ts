import type { PageLoad } from './$types';

import { TRENDING_ARTICLE_PAGINATION_TAKE } from '$lib/constants/article';
import { getTrendingArticles } from '$api/article';

export const load = (async ({ parent }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchInfiniteQuery({
		queryKey: ['trendingArticles', TRENDING_ARTICLE_PAGINATION_TAKE],
		queryFn: getTrendingArticles,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
}) satisfies PageLoad;
