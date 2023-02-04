import type { PageServerLoad } from './$types';

import { getArticlesByUsername } from './_load';

export const load: PageServerLoad = async ({ params }) => {
	const articles = await getArticlesByUsername(params.slug.slice(1));

	return { articles };
};
