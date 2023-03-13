import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

import { getBlogerByUsername } from './_load';

export const load = (async ({ locals, params }) => {
	const blogerUsername = params.slug.slice(1);
	const bloger = await getBlogerByUsername(blogerUsername);

	if (!bloger) {
		throw error(404, { message: '페이지를 찾을 수 없습니다.' });
	}

	return {
		user: locals.user,
		bloger: { ...bloger, username: blogerUsername }
	};
}) satisfies LayoutServerLoad;
