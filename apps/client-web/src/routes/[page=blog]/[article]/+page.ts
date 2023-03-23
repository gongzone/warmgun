import { getArticleBySlug } from '$api/article';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['article', `${params.page}/${params.article}`],
		queryFn: () => getArticleBySlug(`${params.page}/${params.article}`)
	});
}) satisfies PageLoad;
