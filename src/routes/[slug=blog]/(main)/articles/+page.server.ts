import type { PageServerLoad } from './$types';

import { formatDate } from '$lib/utils/date';
import { getArticlesByUsername } from './_load';

export const load: PageServerLoad = async ({ params }) => {
	const articles = await getArticlesByUsername(params.slug.slice(1));

	const enhancedArticles = articles.map((article) => ({
		...article,
		createdAt: formatDate(article.createdAt)
	}));

	return { articles: enhancedArticles };
};
