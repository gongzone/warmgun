import { prisma } from '$lib/server/db';
import { validate } from '$lib/server/validation';
import { articleInclude } from '$lib/types/article';
import { z } from 'zod';
import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { calculateTrendingScore } from '$lib/utils/calculate-trending-score';
import { meilisearch } from '$lib/server/meilisearch';

export const ssr = false;

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const article = await findOneArticle(params.slug);

	const isLiked = article.likes.find((like) => like.userId === locals.user?.id);

	return { article, isLiked: !!isLiked };
};

async function findOneArticle(slug: string) {
	const article = await prisma.article.findUnique({
		where: { slug },
		include: {
			...articleInclude,
			likes: true
		}
	});

	if (!article) {
		throw error(404, 'no');
	}

	return article;
}

export const actions: Actions = {
	like: async ({ locals, request }) => {
		if (!locals.user) {
			throw error(401, '수행할 수 없습니다.');
		}

		const formData = await request.formData();

		const validated = validate(formData, likesSchema());

		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const { articleId } = { ...validated.data, articleId: +validated.data.articleId };

		const foundLike = await prisma.like.findUnique({
			where: {
				userId_articleId: {
					userId: locals.user.id,
					articleId
				}
			}
		});

		if (foundLike) {
			fail(400, { message: '이미 좋아요한 아티클입니다.' });
		}

		const like = await prisma.like.create({
			data: {
				user: {
					connect: { id: locals.user.id }
				},
				article: {
					connect: { id: articleId }
				}
			},
			include: {
				article: {
					select: {
						createdAt: true,
						_count: {
							select: {
								likes: true
							}
						}
					}
				}
			}
		});

		const trendingScore = calculateTrendingScore(like.article._count.likes, like.article.createdAt);

		await prisma.article.update({
			where: {
				id: articleId
			},
			data: {
				trendingScore
			}
		});
	},
	unlike: async ({ locals, request }) => {
		if (!locals.user) {
			throw error(401, '수행할 수 없습니다.');
		}

		const formData = await request.formData();

		const validated = validate(formData, likesSchema());

		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const { articleId } = { ...validated.data, articleId: +validated.data.articleId };

		const like = await prisma.like.delete({
			where: {
				userId_articleId: {
					userId: locals.user.id,
					articleId
				}
			},
			include: {
				article: {
					select: {
						createdAt: true,
						_count: {
							select: {
								likes: true
							}
						}
					}
				}
			}
		});

		const trendingScore = calculateTrendingScore(
			like.article._count.likes - 1,
			like.article.createdAt
		);

		await prisma.article.update({
			where: {
				id: articleId
			},
			data: {
				trendingScore
			}
		});
	},
	createComment: async ({ locals, request }) => {
		if (!locals.user) {
			throw error(401, '수행할 수 없습니다.');
		}

		const formData = await request.formData();

		const validated = validate(formData, createCommentSchema());

		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const { articleId, parentId, content } = {
			...validated.data,
			articleId: +validated.data.articleId,
			parentId: +validated.data.parentId
		};

		console.log(content);

		await prisma.comment.create({
			data: {
				content,
				parent: parentId ? { connect: { id: parentId } } : undefined,
				user: { connect: { id: locals.user.id } },
				article: { connect: { id: articleId } }
			}
		});
	},
	deleteArticle: async ({ locals, request }) => {
		if (!locals.user) {
			throw error(401, '수행할 수 없습니다.');
		}

		const formData = await request.formData();

		const validated = validate(formData, deleteArticleSchema());

		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const { articleId } = {
			...validated.data,
			articleId: +validated.data.articleId
		};

		await prisma.article.delete({
			where: { id: articleId }
		});

		await meilisearch.index('articles').deleteDocument(articleId);

		throw redirect(302, `/@${locals.user.username}`);
	}
};

function likesSchema() {
	return z.object({
		articleId: z.string()
	});
}

function createCommentSchema() {
	return z.object({
		articleId: z.string(),
		parentId: z.string(),
		content: z.string()
	});
}

function deleteArticleSchema() {
	return z.object({
		articleId: z.string()
	});
}
