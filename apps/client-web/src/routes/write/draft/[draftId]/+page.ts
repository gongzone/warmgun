import type { PageLoad } from './$types';

import { getDraftById } from '$api/draft';

export const load = (async ({ params, parent }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['drafts', params.draftId],
		queryFn: () => getDraftById(params.draftId)
	});
}) satisfies PageLoad;
