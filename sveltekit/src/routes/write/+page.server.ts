import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

import { validateFormData, extractErrorMessage } from '$lib/server/validation';

import { publishDraft } from './_action';
import { publishSchema } from './_schema';

export const load: PageServerLoad = async ({ locals, params }) => {
	throw redirect(302, '/');
};

export const actions: Actions = {
	publish: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/auth/login');
		}

		const formData = await request.formData();
		const validated = validateFormData(formData, publishSchema);

		if (!validated.success) {
			return fail(400, { success: false, message: extractErrorMessage(validated.error) });
		}

		const { title, subTitle, body, coverImage, slug, tags } = validated.data;

		console.log(tags);

		const s = await publishDraft(locals.user.id, {
			title,
			subTitle,
			body,
			coverImage,
			slug: `@${locals.user.username}/${slug}`,
			tags: tags.split(',')
		});

		console.log(s, '뭔일이 난거');
	}
};
