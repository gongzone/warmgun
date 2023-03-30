import type { PageLoad } from './$types';

import { TRENDING_ARTICLE_PAGINATION_TAKE } from '$lib/constants/article';
import { getBestArticles } from '$api/article';

export const load = (async ({ parent }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['bestArticles', TRENDING_ARTICLE_PAGINATION_TAKE],
		queryFn: () => getBestArticles(TRENDING_ARTICLE_PAGINATION_TAKE)
	});
}) satisfies PageLoad;
