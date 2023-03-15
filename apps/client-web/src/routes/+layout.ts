import type { LayoutLoad } from './$types';

import queryClient from '$lib/query-client';
import { getMe } from '$api/me';

export const load = (async () => {
	await queryClient.prefetchQuery({
		queryKey: ['me'],
		queryFn: getMe
	});

	return { queryClient };
}) satisfies LayoutLoad;
