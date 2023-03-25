import type { LayoutLoad } from './$types';

import queryClient from '$lib/query-client';
import { getMe, getMyDrafts } from '$api/me';

export const load = (async () => {
	await queryClient.prefetchQuery({
		queryKey: ['me'],
		queryFn: getMe
	});

	await queryClient.prefetchQuery({
		queryKey: ['myDrafts'],
		queryFn: getMyDrafts
	});

	return { queryClient };
}) satisfies LayoutLoad;
