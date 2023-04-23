import type { LayoutLoad } from './$types';

import { findMe } from '$api/user';
import { findMyDrafts } from '$api/draft';

export const load = (async ({ parent, fetch }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['users', 'me'],
		queryFn: async () => await findMe(fetch)
	});

	await queryClient.prefetchQuery({
		queryKey: ['drafts', 'me'],
		queryFn: findMyDrafts
	});
}) satisfies LayoutLoad;
