import { generateFormMessage, validate } from '$lib/server/server-utils';
import { fail, type Actions } from '@sveltejs/kit';
import { createPostSchema } from '$lib/server/schema/post';
import type { JSONContent } from '@tiptap/core';
import { db } from '$lib/server/db';
import { formatSlug } from '$lib/utils/format';

export const actions: Actions = {
	createPost: async ({ request, locals }) => {
		const formData = await request.formData();
		const validated = validate(formData, createPostSchema);

		if (!validated.success) {
			return fail(400, generateFormMessage(false, validated.errorMessage));
		}

		const { title, body, community } = {
			...validated.data,
			body: JSON.parse(validated.data.body) as JSONContent
		};

		const slug = formatSlug(title);

		await db.post.create({
			data: {
				title,
				body,
				community,
				slug,
				user: { connect: { id: locals.user?.id } }
			}
		});
	}
};
