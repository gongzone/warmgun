import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/auth/login');
	}

	const recentDraft = locals.user.drafts[0];

	throw redirect(302, `/write/draft/${recentDraft.id}`);
};

const wrtieSchema = z.object({
	title: z.string({ required_error: '' }),
	description: z.string({ required_error: '' }),
	coverImage: z.string({ required_error: '' }),
	body: z.string({ required_error: '' })
});

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(302, '/auth/login');
		}

		const formData = Object.fromEntries(await request.formData());
		const validated = wrtieSchema.safeParse(formData);

		if (!validated.success) {
			return fail(400, { message: validated.error.issues[0].message });
		}

		console.log(validated.data);

		const { title, description, coverImage, body } = validated.data;

		// await db.article.create({
		// 	data: {
		// 		title,
		// 		description,
		// 		coverImage,
		// 		body,
		// 		authorId: locals.user.id
		// 	}
		// });

		// post page로 리다이렉트
	}
};
