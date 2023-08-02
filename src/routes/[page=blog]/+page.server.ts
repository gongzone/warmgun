import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

import { prisma } from '$lib/server/db';
import { validate } from '$lib/server/validation';
import { articleInclude } from '$lib/types/article';
import { buildInfinityData } from '$lib/utils/infinity-data';

export const load: PageServerLoad = async ({ url, params }) => {
	// const username = params.page?.slice(1);

	// if (!username) {
	// 	throw error(404, '접근할 수 없는 페이지입니다.');
	// }

	// const take = url.searchParams.get('take') ?? 12;
	// const cursor = url.searchParams.get('cursor') ?? 0;

	// const articles = await findBlogArticles(username, +take, +cursor);

	// const { data, nextCursor } = buildInfinityData(articles, +take, +cursor);

	return {
		// articles: data,
		// nextCursor
	};
};

// async function findBlogArticles(username: string, take: number, cursor: number) {
// 	const articles = await prisma.article.findMany({
// 		take: take,
// 		skip: take * cursor,
// 		where: { author: { username: username } },
// 		include: articleInclude,
// 		orderBy: { createdAt: 'desc' }
// 	});

// 	return articles;
// }

// export const actions: Actions = {
// 	follow: async ({ locals, request }) => {
// 		if (!locals.user) {
// 			throw redirect(302, '/auth/login');
// 		}

// 		const formData = await request.formData();

// 		const validated = validate(formData, followsSchema());

// 		if (!validated.success) {
// 			return fail(400, { message: validated.errorMessage });
// 		}

// 		const { blogUserId } = { ...validated.data, blogUserId: +validated.data.blogUserId };

// 		await prisma.follows.create({
// 			data: {
// 				followerId: locals.user.id,
// 				followingId: blogUserId
// 			}
// 		});
// 	},
// 	unFollow: async ({ locals, request }) => {
// 		if (!locals.user) {
// 			throw redirect(302, '/auth/login');
// 		}

// 		const formData = await request.formData();

// 		const validated = validate(formData, followsSchema());

// 		if (!validated.success) {
// 			return fail(400, { message: validated.errorMessage });
// 		}

// 		const { blogUserId } = { ...validated.data, blogUserId: +validated.data.blogUserId };

// 		await prisma.follows.delete({
// 			where: {
// 				followerId_followingId: {
// 					followerId: locals.user.id,
// 					followingId: blogUserId
// 				}
// 			}
// 		});
// 	}
// };

// function followsSchema() {
// 	return z.object({
// 		blogUserId: z.string()
// 	});
// }
