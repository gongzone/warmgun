import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

import { validateFormData, extractErrorMessage } from '$lib/server/validation';

import { getDraft } from './_load';
import {
	createDraft,
	saveDraft,
	deleteDraft,
	getCountOfDrafts,
	findLatestDraft,
	publishDraft
} from './_action';
import { saveSchema, publishSchema, deleteSchema } from './_schema';

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

export const actions: Actions = {
	create: async ({ locals }) => {
		if (!locals.user) {
			throw redirect(303, '/auth/login');
		}

		const draft = await createDraft(locals.user.id);

		throw redirect(303, `/write/draft/${draft.id}`);
	},
	save: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/auth/login');
		}

		const formData = await request.formData();

		const validated = validateFormData(formData, saveSchema);
		if (!validated.success) {
			return fail(400, { success: false, message: extractErrorMessage(validated.error) });
		}

		const { title, subTitle, body, draftId } = validated.data;

		await saveDraft(+draftId, { title, subTitle, body });

		return { success: true, message: '초고가 성공적으로 저장되었습니다.' };
	},
	publish: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/auth/login');
		}

		const formData = await request.formData();
		const validated = validateFormData(formData, publishSchema);

		if (!validated.success) {
			return fail(400, { success: false, message: extractErrorMessage(validated.error) });
		}

		const { title, subTitle, body, coverImage, slug } = validated.data;

		const s = await publishDraft(locals.user.id, {
			title,
			subTitle,
			body,
			coverImage,
			slug
		});

		console.log(s);
	},
	delete: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/auth/login');
		}

		const formData = await request.formData();

		const validated = validateFormData(formData, deleteSchema);
		if (!validated.success) {
			return fail(400, { success: false, message: extractErrorMessage(validated.error) });
		}

		const { currentDraftId, draftId } = validated.data;

		const totalCount = await getCountOfDrafts(locals.user.id);
		if (totalCount <= 1) {
			return fail(400, { success: false, message: '마지막 초고는 삭제하실 수 없습니다 😅' });
		}

		await deleteDraft(+draftId);

		if (+currentDraftId === +draftId) {
			const latestDraft = await findLatestDraft(locals.user.id);
			throw redirect(303, `/write/draft/${latestDraft?.id}`);
		}
	}
};
