import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

import { prisma } from '$lib/server/db';
import { validate } from '$lib/server/validation';
import { meilisearch } from '$lib/server/meilisearch';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/auth/login');
	}
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			throw error(401, '인증되지 않은 접근입니다.');
		}

		await prisma.user.delete({
			where: { id: locals.user.id }
		});

		await meilisearch.index('users').deleteDocument(locals.user.id);

		throw redirect(302, '/');
	}
};
