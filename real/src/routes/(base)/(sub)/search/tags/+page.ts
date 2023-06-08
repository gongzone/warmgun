import type { PageLoad } from './$types';

import type { Tag } from '$lib/types/tag';
import { api } from '$lib/api/api';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { queryClient, q } = await parent();

	if (q) {
		await queryClient.prefetchInfiniteQuery({
			queryKey: ['search', 'tags', q, 30],
			queryFn: api(fetch).search<Tag>
		});
	}
};
