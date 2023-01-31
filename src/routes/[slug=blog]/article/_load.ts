import db from '$lib/server/db';

export async function getArticlesByUsername(username: string) {
	const articles = await db.article.findMany({
		where: {
			author: {
				username: username
			}
		},
		select: {
			title: true,
			description: true,
			body: true,
			coverImage: true,
			likes: true,
			views: true,
			slug: true,
			createdAt: true
		}
	});

	return articles;
}
