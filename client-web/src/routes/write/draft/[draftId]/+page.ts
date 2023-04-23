import type { PageLoad } from './$types';

import { findOneDraft } from '$api/draft';

export const load = (async ({ params, parent }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['drafts', +params.draftId],
		queryFn: () => findOneDraft(+params.draftId)
	});
}) satisfies PageLoad;
