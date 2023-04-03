import type { PageLoad } from './$types';

import { TRENDING_ARTICLE_PAGINATION_TAKE } from '$lib/constants/article';
import { TOTAL_TAGS_NUMBER } from '$lib/constants/tag';
import { getBestArticles } from '$api/article';
import { getTopBlogers } from '$api/user';
import { getPopularTags } from '$api/tag';

export const load = (async ({ parent }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['popularTags', TOTAL_TAGS_NUMBER],
		queryFn: () => getPopularTags(TOTAL_TAGS_NUMBER)
	});

	await queryClient.prefetchQuery({
		queryKey: ['bestArticles', TRENDING_ARTICLE_PAGINATION_TAKE],
		queryFn: () => getBestArticles(TRENDING_ARTICLE_PAGINATION_TAKE)
	});

	await queryClient.prefetchQuery({
		queryKey: ['topBlogers', 10],
		queryFn: () => getTopBlogers(10)
	});
}) satisfies PageLoad;
