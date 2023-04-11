import type { LayoutLoad } from './$types';

import queryClient from '$lib/clients/query-client';
import { findMe } from '$api/user';
import { findAllDrafts } from '$api/draft';

export const load = (async () => {
	await queryClient.prefetchQuery({
		queryKey: ['me'],
		queryFn: findMe
	});

	await queryClient.prefetchQuery({
		queryKey: ['drafts'],
		queryFn: findAllDrafts
	});

	return { queryClient };
}) satisfies LayoutLoad;
