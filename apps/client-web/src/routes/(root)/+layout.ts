import type { LayoutLoad } from './$types';

import { TOTAL_TAGS_NUMBER } from '$lib/constants/tag';
import { getPopularTags } from '$api/tag';

export const load = (async ({ parent }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['popularTags', TOTAL_TAGS_NUMBER],
		queryFn: () => getPopularTags(TOTAL_TAGS_NUMBER)
	});
}) satisfies LayoutLoad;
