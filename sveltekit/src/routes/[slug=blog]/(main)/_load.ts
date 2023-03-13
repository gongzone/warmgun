import db from '$lib/server/db';

import { formatDate } from '$lib/utils/date';

export async function getArticlesByUsername(username: string) {
	const articles = await db.article.findMany({
		where: {
			author: {
				username: username
			}
		},
		select: {
			title: true,
			subTitle: true,
			body: true,
			coverImage: true,
			likes: true,
			slug: true,
			createdAt: true
		}
	});

	const enhancedArticles = articles.map((article) => ({
		...article,
		slug: `/@${username}/${article.slug}`,
		createdAt: formatDate(article.createdAt)
	}));

	return enhancedArticles;
}
