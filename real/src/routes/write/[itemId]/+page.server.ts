import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

import { prisma } from '$lib/server/db';
import { validate } from '$lib/server/validation';
import { z } from 'zod';

export const ssr = false;

export const load: PageServerLoad = async ({ locals, params, url }) => {
	if (!locals.user) {
		throw error(401, '제한된 접근입니다.');
	}

	const mode = url.searchParams.get('mode');

	if (mode === 'draft') {
		const drafts = await findDrafts(locals.user.id);
		const currentDraft = drafts.find((draft) => draft.id === +params.itemId);

		if (!currentDraft) throw error(404, '해당 페이지를 찾을 수 없습니다.');

		return {
			draft: currentDraft,
			drafts
		};
	} else if (mode === 'edit') {
		const article = await findOneArticle(locals.user.id, +params.itemId);

		return {
			article
		};
	}

	throw error(404, '접근 불가능한 페이지입니다.');
};

async function findDrafts(userId: number) {
	const drafts = await prisma.draft.findMany({
		where: { authorId: userId },
		orderBy: { updatedAt: 'desc' }
	});

	return drafts;
}

async function findOneArticle(userId: number, articleId: number) {
	const article = await prisma.article.findUnique({
		where: {
			id_authorId: { id: articleId, authorId: userId }
		}
	});

	return article;
}

export const actions: Actions = {
	createDraft: async ({ locals }) => {
		const draftCount = await prisma.draft.count({
			where: { authorId: locals.user?.id }
		});

		if (draftCount >= 10) {
			return fail(400, { isSuccess: false, message: '초고는 10개까지만 생성 가능합니다.' });
		}

		const draft = await prisma.draft.create({
			data: {
				author: { connect: { id: locals.user?.id } }
			}
		});

		throw redirect(303, `/write/draft/${draft.id}`);
	},
	deleteDraft: async ({ request, locals, params }) => {
		const formData = await request.formData();

		const validated = validate(formData, deleteDraftSchema());

		if (!validated.success) {
			return fail(400, { isSuccess: false, message: validated.errorMessage });
		}

		const { draftId } = validated.data;

		const draftCount = await prisma.draft.count({
			where: { authorId: locals.user?.id }
		});

		if (draftCount <= 1) {
			return fail(400, { isSuccess: false, message: '마지막 초고는 삭제하실 수 없습니다.' });
		}

		await prisma.draft.delete({ where: { id: +draftId } });

		if (draftId === params.itemId) {
			const latestDraftId = (
				await prisma.draft.findFirst({
					where: { authorId: locals.user?.id },
					select: { id: true },
					orderBy: { updatedAt: 'desc' }
				})
			)?.id;

			throw redirect(303, `/write/draft/${latestDraftId}`);
		}
	},
	saveDraft: async ({ request, params }) => {
		const formData = await request.formData();
		const validated = validate(formData, saveDraftSchema());

		if (!validated.success) {
			return fail(400, { isSuccess: false, message: validated.errorMessage });
		}

		const { title, body } = {
			...validated.data,
			body: JSON.parse(validated.data.body)
		};

		await prisma.draft.update({
			where: { id: +params.itemId },
			data: { title, body }
		});

		return { isSuccess: true, message: '초고를 성공적으로 저장했습니다. 🎉' };
	}
};

function deleteDraftSchema() {
	return z.object({
		draftId: z.string()
	});
}

function saveDraftSchema() {
	return z.object({
		title: z.string(),
		body: z.string()
	});
}
