import type { PageLoad } from './$types';

import { api } from '$lib/api/api';

export const load: PageLoad = async ({ parent, fetch, params }) => {
	const { queryClient } = await parent();

	const username = params.page.slice(1);

	await queryClient.prefetchInfiniteQuery({
		queryKey: ['posts', username, 'recent', 10],
		queryFn: api(fetch).findPostsByUsername,
		getNextPageParam: (lastPage) => lastPage.nextCursor
	});
};
