import type { LayoutLoad } from './$types';

import queryClient from '$lib/clients/query-client';
import { findMe } from '$api/user';
import { findMyDrafts } from '$api/draft';

export const load = (async () => {
	await queryClient.prefetchQuery({
		queryKey: ['users', 'me'],
		queryFn: findMe
	});

	await queryClient.prefetchQuery({
		queryKey: ['drafts', 'me'],
		queryFn: findMyDrafts
	});

	return { queryClient };
}) satisfies LayoutLoad;
