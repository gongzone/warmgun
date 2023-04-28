import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent }) => {
	const { drafts } = await parent();

	throw redirect(301, `/write/draft/${drafts[0].id}`);
};
