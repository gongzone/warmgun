import db from '$lib/server/db';

interface PublushDraftData {
	title: string;
	subTitle: string;
	body: string;
	coverImage: string;
	slug: string;
	tags: string[];
}

export async function publishDraft(authorId: number, data: PublushDraftData) {
	return await db.article.create({
		data: {
			title: data.title,
			subTitle: data.subTitle,
			body: data.body,
			coverImage: data.coverImage,
			slug: data.slug,
			author: {
				connect: {
					id: authorId
				}
			},
			tags: {
				connectOrCreate: data.tags.map((tag) => ({
					where: {
						name: tag
					},
					create: {
						name: tag
					}
				}))
			}
		}
	});
}
