import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

import { prisma } from '$lib/server/db';
import { validate } from '$lib/server/validation';
import { calculateTrendingScore } from '$lib/utils/calculate-trending-score';
import { meilisearch } from '$lib/server/meilisearch';

export const ssr = false;

export const load: PageServerLoad = async ({ locals, params }) => {
	const post = await findOnePost(params.slug);
	const isLiked = post.likes.find((like) => like.userId === locals.user?.id);

	return { post, isLiked: !!isLiked, isOwner: post.userId === locals.user?.id };
};

async function findOnePost(slug: string) {
	const post = await prisma.post.findUnique({
		where: { slug },
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
	like: async ({ locals, request }) => {
		if (!locals.user) {
			throw redirect(302, '/auth/login');
		}

		const formData = await request.formData();

		const validated = validate(formData, likesSchema());

		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const { postId } = { ...validated.data, postId: +validated.data.postId };

		const foundLike = await prisma.postLike.findUnique({
			where: {
				userId_postId: {
					userId: locals.user.id,
					postId
				}
			}
		});

		if (foundLike) {
			fail(400, { message: '이미 좋아요한 게시글입니다.' });
		}

		const like = await prisma.postLike.create({
			data: {
				user: {
					connect: { id: locals.user.id }
				},
				post: {
					connect: { id: postId }
				}
			},
			include: {
				post: {
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

		const trendingScore = calculateTrendingScore(like.post._count.likes, like.post.createdAt);

		await prisma.post.update({
			where: {
				id: postId
			},
			data: {
				trendingScore
			}
		});
	},
	unlike: async ({ locals, request }) => {
		if (!locals.user) {
			throw redirect(302, '/auth/login');
		}

		const formData = await request.formData();

		const validated = validate(formData, likesSchema());

		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const { postId } = { ...validated.data, postId: +validated.data.postId };

		const like = await prisma.postLike.delete({
			where: {
				userId_postId: {
					userId: locals.user.id,
					postId
				}
			},
			include: {
				post: {
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

		const trendingScore = calculateTrendingScore(like.post._count.likes - 1, like.post.createdAt);

		await prisma.post.update({
			where: {
				id: postId
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

		const { id, parentId, content } = {
			...validated.data,
			id: +validated.data.id,
			parentId: +validated.data.parentId
		};

		await prisma.postComment.create({
			data: {
				content,
				parent: parentId ? { connect: { id: parentId } } : undefined,
				user: { connect: { id: locals.user.id } },
				post: { connect: { id: id } }
			}
		});
	},
	likeComment: async ({ locals, request }) => {
		if (!locals.user) {
			throw redirect(302, '/auth/login');
		}

		const formData = await request.formData();

		const validated = validate(formData, commentLikesSchema());

		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const { commentId } = { ...validated.data, commentId: +validated.data.commentId };

		const foundLike = await prisma.articleCommentLike.findUnique({
			where: {
				userId_commentId: {
					userId: locals.user.id,
					commentId
				}
			}
		});

		if (foundLike) {
			fail(400, { message: '이미 좋아요한 댓글입니다.' });
		}

		await prisma.postCommentLike.create({
			data: {
				user: {
					connect: { id: locals.user.id }
				},
				comment: {
					connect: { id: commentId }
				}
			}
		});
	},
	unlikeComment: async ({ locals, request }) => {
		if (!locals.user) {
			throw redirect(302, '/auth/login');
		}

		const formData = await request.formData();

		const validated = validate(formData, commentLikesSchema());

		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const { commentId } = { ...validated.data, commentId: +validated.data.commentId };

		await prisma.postCommentLike.delete({
			where: {
				userId_commentId: {
					userId: locals.user.id,
					commentId
				}
			}
		});
	},
	editComment: async ({ locals, request }) => {
		if (!locals.user) {
			throw redirect(302, '/auth/login');
		}

		const formData = await request.formData();

		const validated = validate(formData, commentEditSchema());

		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const { commentId, content } = { ...validated.data, commentId: +validated.data.commentId };

		await prisma.postComment.update({
			where: { id: commentId },
			data: {
				content: content
			}
		});
	},
	deleteComment: async ({ locals, request }) => {
		if (!locals.user) {
			throw redirect(302, '/auth/login');
		}

		const formData = await request.formData();

		const validated = validate(formData, commentDeleteSchema());

		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const { commentId } = { ...validated.data, commentId: +validated.data.commentId };

		await prisma.postComment.delete({
			where: { id: commentId }
		});
	},
	deletePost: async ({ locals, request }) => {
		if (!locals.user) {
			throw error(401, '수행할 수 없습니다.');
		}

		const formData = await request.formData();

		const validated = validate(formData, deletePostSchema());

		if (!validated.success) {
			return fail(400, { message: validated.errorMessage });
		}

		const { postId } = {
			...validated.data,
			postId: +validated.data.postId
		};

		await prisma.post.delete({
			where: { id: postId }
		});

		throw redirect(301, `/@${locals.user.username}/community`);
	}
};

function likesSchema() {
	return z.object({
		postId: z.string()
	});
}

function createCommentSchema() {
	return z.object({
		id: z.string(),
		parentId: z.string(),
		content: z.string()
	});
}

function deletePostSchema() {
	return z.object({
		postId: z.string()
	});
}

function commentLikesSchema() {
	return z.object({
		commentId: z.string()
	});
}

function commentEditSchema() {
	return z.object({
		commentId: z.string(),
		content: z.string().min(1, '댓글을 작성하여 주십시오.')
	});
}

function commentDeleteSchema() {
	return z.object({
		commentId: z.string()
	});
}
