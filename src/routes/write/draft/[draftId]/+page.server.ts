import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { error, fail, redirect } from '@sveltejs/kit';

import { getDraft } from './_load';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.user) {
		throw redirect(302, '/auth/login');
	}

	const draft = await getDraft(+params.draftId, locals.user.id);

	if (!draft) {
		throw error(404);
	}

	return { draft };
};
