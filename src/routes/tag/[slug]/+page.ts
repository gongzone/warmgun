import type { PageLoad } from './$types';

import { api } from '$lib/api/api';
import type { FindArticlesSort } from '$lib/server/db/article';

// export const load: PageLoad = async ({ parent, fetch, params }) => {
// 	const { queryClient, tag } = await parent();
// 	await queryClient.prefetchInfiniteQuery({
// 		queryKey: ['articles', 'tags', tag.id, params.filter, 12],
// 		queryFn: api(fetch).findArticles
// 	});
// };

export const load: PageLoad = async ({ parent, fetch, params, url, data }) => {
	const { queryClient } = await parent();

	const tagSlug = params.slug;
	const sort = url.searchParams.get('sort') as FindArticlesSort | null;

	await queryClient.prefetchInfiniteQuery({
		queryKey: ['articles', tagSlug, sort, 12],
		queryFn: api(fetch).findArticlesByTagSlug,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});

	return { ...data };
};
