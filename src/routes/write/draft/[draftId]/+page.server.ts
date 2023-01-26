import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

import { getDraft } from './_load';
import { createDraft, saveDraft, deleteDraft, findLatestDraft } from './_action';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.user) {
		throw redirect(302, '/auth/login');
	}

	const draft = await getDraft(+params.draftId, locals.user.id);

	if (!draft) {
		throw error(404);
	}

	return { draft };
};

const saveSchema = z.object({
	title: z.string({ required_error: '아이디는 필수 값 입니다.' }),
	description: z.string({ required_error: '아이디는 필수 값 입니다.' }),
	body: z.string({ required_error: '아이디는 필수 값 입니다.' }),
	draftId: z.string({ required_error: '아이디는 필수 값 입니다.' })
});

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
	save: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(302, '/auth/login');
		}

		const formData = Object.fromEntries(await request.formData());
		const validated = saveSchema.safeParse(formData);

		if (!validated.success) {
			return fail(400, { success: false, message: validated.error.issues[0].message });
		}

		const { title, description, body, draftId } = validated.data;

		await saveDraft(+draftId, { title, description, body });

		return { success: true, message: '초고가 성공적으로 저장되었습니다.' };
	},
	delete: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(302, '/auth/login');
		}

		const formData = Object.fromEntries(await request.formData());
		const validated = deleteSchema.safeParse(formData);

		if (!validated.success) {
			return fail(400, { success: false, message: validated.error.issues[0].message });
		}

		const { currentDraftId, draftId } = validated.data;

		await deleteDraft(+draftId);

		if (+currentDraftId === +draftId) {
			const latestDraft = await findLatestDraft(locals.user.id);

			throw redirect(302, `/write/draft/${latestDraft?.id}`);
		}
	}
};
