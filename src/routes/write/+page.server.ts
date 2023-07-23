import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

import { handleUnauthenticated } from '$lib/server/auth/protection';
import { findLatestDraft } from '$lib/server/db/draft';

export const load: PageServerLoad = async (event) => {
	const user = handleUnauthenticated(event);
	const latestDraftId = (await findLatestDraft(user.id))?.id;

	throw redirect(301, `/write/${latestDraftId}?mode=draft`);
};
