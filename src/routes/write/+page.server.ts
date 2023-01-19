import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';

import db from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
	return null;
};

const wrtieSchema = z.object({
	title: z.string({ required_error: '' }),
	description: z.string({ required_error: '' }),
	body: z.string({ required_error: '' })
});

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());
		const validated = wrtieSchema.safeParse(formData);

		if (!validated.success) {
			return fail(400, { message: validated.error.issues[0].message });
		}

		console.log(validated.data);
		const { title, description } = validated.data;
	}
};
