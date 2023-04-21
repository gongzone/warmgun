import type { PageLoad } from './$types';

import { findOneTag } from '$api/tag';

export const load = (async ({ parent, params }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['tags', params.tagname],
		queryFn: () => findOneTag(params.tagname)
	});
}) satisfies PageLoad;
