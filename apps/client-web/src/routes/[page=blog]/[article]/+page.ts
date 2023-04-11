import type { PageLoad } from './$types';

import { findOneArticle } from '$api/article';

export const load = (async ({ params, parent }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['articles', params.page.slice(1), params.article],
		queryFn: () => findOneArticle(params.page.slice(1), params.article)
	});
}) satisfies PageLoad;
