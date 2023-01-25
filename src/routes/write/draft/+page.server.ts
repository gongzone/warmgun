import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

import { createDraft, deleteDraft, findLatestDraft } from './_action';

const deleteSchema = z.object({
	currentDraftId: z.string({ required_error: '아이디는 필수 값 입니다.' }),
	draftId: z.string({ required_error: '아이디는 필수 값 입니다.' })
});

export const actions: Actions = {
	create: async ({ locals }) => {
		if (!locals.user) {
			throw redirect(302, '/auth/login');
		}

		const draft = await createDraft(locals.user.id);

		throw redirect(302, `/write/draft/${draft.id}`);
	},
	delete: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(302, '/auth/login');
		}

		const formData = Object.fromEntries(await request.formData());
		const validated = deleteSchema.safeParse(formData);

		if (!validated.success) {
			return fail(400, { message: validated.error.issues[0].message });
		}

		const { currentDraftId, draftId } = validated.data;

		await deleteDraft(+draftId);

		console.log('delete 완료');

		if (+currentDraftId === +draftId) {
			const latestDraft = await findLatestDraft(locals.user.id);

			throw redirect(302, `/write/draft/${latestDraft?.id}`);
		}
	}
};
