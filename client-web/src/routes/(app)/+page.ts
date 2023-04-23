import type { PageLoad } from './$types';

import { findPopularTags } from '$api/tag';
import { findBestArticles } from '$api/article';
import { findTopUsers } from '$api/user';

export const load = (async ({ parent }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['popularTags'],
		queryFn: findPopularTags
	});

	await queryClient.prefetchQuery({
		queryKey: ['bestArticles'],
		queryFn: findBestArticles
	});

	await queryClient.prefetchQuery({
		queryKey: ['topUsers'],
		queryFn: findTopUsers
	});
}) satisfies PageLoad;
