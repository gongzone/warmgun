import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

import { prisma } from '$lib/server/db';
import { validate } from '$lib/server/validation';
import { z } from 'zod';

export const ssr = false;

export const load: PageServerLoad = async ({ params, parent }) => {
	const { drafts } = await parent();

	const foundDraft = drafts.find((draft) => draft.id === +params.draftId);

	if (!foundDraft) {
		throw error(404, '해당 페이지를 찾을 수 없습니다.');
	}

	return { draft: foundDraft };
};

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

		if (draftId === params.draftId) {
			const latestDraftId = (
				await prisma.draft.findFirst({
					where: { authorId: locals.user?.id },
					select: { id: true },
					orderBy: { updatedAt: 'desc' }
				})
			)?.id;

			throw redirect(303, `/write/draft/${latestDraftId}`);
		}
	}
};

function deleteDraftSchema() {
	return z.object({
		draftId: z.string()
	});
}
