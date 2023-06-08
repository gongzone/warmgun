import type { PageLoad } from './$types';

import type { Article } from '$lib/types/article';
import { api } from '$lib/api/api';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { queryClient, q } = await parent();

	if (q) {
		await queryClient.prefetchInfiniteQuery({
			queryKey: ['search', 'articles', q, 12],
			queryFn: api(fetch).search<Article>
		});
	}
};
