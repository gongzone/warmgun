import type { LayoutLoad } from './$types';

import { findOneUser } from '$api/user';

export const load = (async ({ parent, params }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['user', params.page.slice(1)],
		queryFn: () => findOneUser(params.page.slice(1))
	});
}) satisfies LayoutLoad;
