import type { PageLoad } from './$types';

import { TRENDING_ARTICLE_PAGINATION_TAKE } from '$lib/constants/article';
import { getBestArticles } from '$api/article';
import { getTopBlogers } from '$api/user';

export const load = (async ({ parent }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['bestArticles', TRENDING_ARTICLE_PAGINATION_TAKE],
		queryFn: () => getBestArticles(TRENDING_ARTICLE_PAGINATION_TAKE)
	});

	await queryClient.prefetchQuery({
		queryKey: ['topBlogers', 10],
		queryFn: () => getTopBlogers(10)
	});
}) satisfies PageLoad;
