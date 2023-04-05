import type { LayoutLoad } from './$types';

import { getBloger } from '$api/user';

export const load = (async ({ parent, params }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['user', params.page.slice(1)],
		queryFn: () => getBloger(params.page.slice(1))
	});
}) satisfies LayoutLoad;
