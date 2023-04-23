import type { LayoutLoad } from './$types';

import queryClient from '$lib/clients/query-client';

export const load = (async () => {
	return { queryClient };
}) satisfies LayoutLoad;
