import type { PageLoad } from './$types';

import { getBestArticles } from '$api/article';
import { getTopBlogers } from '$api/user';
import { getPopularTags } from '$api/tag';

export const load = (async ({ parent }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['popularTags'],
		queryFn: () => getPopularTags()
	});

	await queryClient.prefetchQuery({
		queryKey: ['bestArticles'],
		queryFn: () => getBestArticles()
	});

	await queryClient.prefetchQuery({
		queryKey: ['topBlogers'],
		queryFn: () => getTopBlogers()
	});
}) satisfies PageLoad;
