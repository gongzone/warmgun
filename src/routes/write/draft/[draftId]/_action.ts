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
	description: string;
	body: string;
}

export async function saveDraft(draftId: number, data: SaveDraftData) {
	return await db.draft.update({
		where: {
			id: draftId
		},
		data: {
			title: data.title,
			description: data.description,
			body: data.body
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
