import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { error, fail, redirect } from '@sveltejs/kit';

import db from '$lib/server/db';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.user) {
		throw redirect(302, '/auth/login');
	}

	const draft = await db.draft.findFirst({
		where: {
			AND: {
				id: +params.draftId,
				authorId: locals.user.id
			}
		}
	});

	if (!draft) {
		throw error(404);
	}

	return { draft };
};
