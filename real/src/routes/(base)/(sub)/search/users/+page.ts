import type { PageLoad } from './$types';

import type { BlogUser } from '$lib/types/user';
import { api } from '$lib/api/api';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { queryClient, q } = await parent();

	if (q) {
		await queryClient.prefetchInfiniteQuery({
			queryKey: ['search', 'users', q, 12],
			queryFn: api(fetch).search<BlogUser>
		});
	}
};
