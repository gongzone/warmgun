import { getPopularTags } from '$api/tag';
import type { LayoutLoad } from './$types';

export const load = (async ({ parent }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['popularTags'],
		queryFn: () => getPopularTags()
	});
}) satisfies LayoutLoad;
