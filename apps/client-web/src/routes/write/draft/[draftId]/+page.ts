import type { PageLoad } from './$types';

import { getDraft } from '$api/draft';

export const load = (async ({ params, parent }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['draft', params.draftId],
		queryFn: () => getDraft(params.draftId)
	});
}) satisfies PageLoad;
