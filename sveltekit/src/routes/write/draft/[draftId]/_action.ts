import db from '$lib/server/db';

export async function createDraft(authorId: number) {
	return await db.draft.create({
		data: {
			author: {
				connect: {
					id: authorId
				}
			}
		}
	});
}

interface SaveDraftData {
	title: string;
	subTitle: string;
	body: string;
}

export async function saveDraft(draftId: number, data: SaveDraftData) {
	return await db.draft.update({
		where: {
			id: draftId
		},
		data: {
			title: data.title,
			subTitle: data.subTitle,
			body: data.body
		}
	});
}

interface PublushDraftData {
	title: string;
	subTitle: string;
	body: string;
	coverImage: string;
	slug: string;
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
			}
		}
	});
}

export async function deleteDraft(draftId: number) {
	return await db.draft.delete({
		where: {
			id: draftId
		}
	});
}

export async function getCountOfDrafts(auhtorId: number) {
	return await db.draft.count({
		where: {
			authorId: auhtorId
		}
	});
}

export async function findLatestDraft(authorId: number) {
	return await db.draft.findFirst({
		where: {
			authorId: authorId
		},
		orderBy: {
			updatedAt: 'desc'
		},
		select: {
			id: true
		}
	});
}
