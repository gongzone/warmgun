import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

import { db } from '$lib/server/db';
import { validateFormData } from '$lib/server/validation';
import { deleteDraftDto } from '$lib/server/schemas/delete-draft.dto';

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
		const draftCount = await db.draft.count({
			where: { authorId: locals.user?.id }
		});
		if (draftCount >= 10) {
			return fail(400, { message: '초고는 10개까지만 생성 가능합니다. 😅' });
		}

		const draft = await db.draft.create({
			data: {
				author: { connect: { id: locals.user?.id } }
			}
		});

		throw redirect(303, `/write/draft/${draft.id}`);
	},
	deleteDraft: async ({ request, locals }) => {
		/* Parse DTO */
		const formData = await request.formData();

		const validated = validateFormData(formData, deleteDraftDto);
		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const [draftId, currentDraftId] = Object.values(validated.data).map((value) => +value);

		/* Core logic */
		const draftCount = await db.draft.count({
			where: { authorId: locals.user?.id }
		});
		if (draftCount <= 1) {
			return fail(400, { message: '마지막 초고는 삭제하실 수 없습니다. 😅' });
		}

		await db.draft.delete({
			where: { id: draftId }
		});

		if (draftId === currentDraftId) {
			const latestDraftId = (
				await db.draft.findFirst({
					where: { authorId: locals.user?.id },
					select: { id: true },
					orderBy: { updatedAt: 'desc' }
				})
			)?.id;

			throw redirect(303, `/write/draft/${latestDraftId}`);
		}
	},
	saveDraft: async ({ request }) => {
		/* Parse DTO */
		const formData = await request.formData();

		// const validated = validateFormData(formData, loginSchema);
		// if (!validated.success) {
		// 	return fail(400, { message: validated.errorMessage });
		// }

		// const { username, password } = validated.data;

		/* Core logic */
	}
};
