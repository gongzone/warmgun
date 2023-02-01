import type { PageServerLoad } from './$types';

import { getArticleBySlug } from './_load';

export const load: PageServerLoad = async ({ locals, params }) => {
	const article = await getArticleBySlug(params.articleSlug);
	console.log(article);

	return { article };
};
