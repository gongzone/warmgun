import { generateFormMessage, validate } from '$lib/server/server-utils';
import { fail, type Actions, error, redirect } from '@sveltejs/kit';
import { createPostSchema } from '$lib/server/schema/post';
import type { JSONContent } from '@tiptap/core';
import { db, prisma } from '$lib/server/db';
import { formatSlug } from '$lib/utils/format';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (!locals.user) {
		throw error(404, '접근 불가 페이지');
	}

	const postId = url.searchParams.get('id');

	if (postId) {
		const post = await findOnePost(+postId);

		if (post.userId !== locals.user.id) {
			throw error(404, '접근 불가 페이지');
		}

		return {
			post,
			isEditMode: true
		};
	}

	return {
		isEditMode: false
	};
};

async function findOnePost(postId: number) {
	const post = await prisma.post.findUnique({
		where: { id: postId },
		include: {
			user: {
				include: { profile: true }
			},
			_count: {
				select: { likes: true, comments: true }
			},
			likes: true
		}
	});

	if (!post) {
		throw error(404, 'no');
	}

	return post;
}

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

		const post = await db.post.create({
			data: {
				title,
				body,
				community,
				slug,
				user: { connect: { id: locals.user?.id } }
			}
		});

		throw redirect(303, `/community/post/${post.slug}`);
	},
	updatePost: async ({ request, params, locals, url }) => {
		const formData = await request.formData();
		const validated = validate(formData, createPostSchema);
		const postId = url.searchParams.get('id');

		if (!postId) {
			throw error(404, '접근 불가');
		}

		if (!validated.success) {
			return fail(400, { isSuccess: false, message: validated.errorMessage });
		}

		const { title, body, community } = {
			...validated.data,
			body: JSON.parse(validated.data.body) as JSONContent
		};

		const slug = formatSlug(title);

		const post = await prisma.post.update({
			where: { id: +postId },
			data: {
				title,
				body,
				community,
				slug
			}
		});

		throw redirect(303, `/community/post/${post.slug}`);
	}
};
