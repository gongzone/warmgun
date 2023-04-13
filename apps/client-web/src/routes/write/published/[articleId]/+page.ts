import type { PageLoad } from './$types';

import { findOnePublished } from '$api/article';

export const load = (async ({ params, parent }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['articles', +params.articleId],
		queryFn: () => findOnePublished(+params.articleId)
	});
}) satisfies PageLoad;
