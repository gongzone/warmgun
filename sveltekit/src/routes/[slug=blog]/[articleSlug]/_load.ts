import db from '$lib/server/db';

export async function getArticleBySlug(slug: string) {
	return await db.article.findFirst({
		where: {
			slug
		}
	});
}
