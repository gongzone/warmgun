import { getMe } from '$api/user';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	console.log('app loader 작동');

	if (!locals.accessToken) return { user: null };

	const currentUser = await getMe(locals.accessToken);

	return { user: currentUser };
}) satisfies LayoutServerLoad;
