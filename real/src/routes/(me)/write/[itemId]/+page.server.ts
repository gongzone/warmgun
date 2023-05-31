import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { nanoid } from 'nanoid';

import { prisma } from '$lib/server/db';
import { meilisearch } from '$lib/server/meilisearch';
import { validate } from '$lib/server/validation';
import type { Genre } from '@prisma/client';
import { siteConfig } from '$lib/configs/site';
import { bodyToString, generateExcerpt } from '$lib/utils/editor-utils';
import { tagToSlug } from '$lib/utils/format';

export const ssr = false;

export const load: PageServerLoad = async ({ locals, params, url }) => {
	if (!locals.user) {
		throw error(401, '제한된 접근입니다.');
	}

	const mode = url.searchParams.get('mode');

	if (mode === 'draft') {
		const drafts = await findDrafts(locals.user.id);
		const currentDraft = drafts.find((draft) => draft.id === +params.itemId);

		if (!currentDraft) throw error(404, '해당 페이지를 찾을 수 없습니다.');

		return {
			draft: currentDraft,
			drafts
		};
	} else if (mode === 'edit') {
		const article = await findOneArticle(locals.user.id, +params.itemId);

		if (!article) throw error(404, '해당 페이지를 찾을 수 없습니다.');

		return {
			article
		};
	}

	throw error(404, '접근 불가능한 페이지입니다.');
};

async function findDrafts(userId: number) {
	const drafts = await prisma.draft.findMany({
		where: { authorId: userId },
		orderBy: { updatedAt: 'desc' }
	});

	return drafts;
}

async function findOneArticle(userId: number, articleId: number) {
	const article = await prisma.article.findUnique({
		where: {
			id_authorId: { id: articleId, authorId: userId }
		}
	});

	return article;
}

export const actions: Actions = {
	createDraft: async ({ locals }) => {
		const draftCount = await prisma.draft.count({
			where: { authorId: locals.user?.id }
		});

		if (draftCount >= 10) {
			return fail(400, { isSuccess: false, message: '초고는 10개까지만 생성 가능합니다.' });
		}

		const draft = await prisma.draft.create({
			data: {
				author: { connect: { id: locals.user?.id } }
			}
		});

		throw redirect(303, `/write/${draft.id}?mode=draft`);
	},
	deleteDraft: async ({ request, locals, params }) => {
		const formData = await request.formData();
		const validated = validate(formData, deleteDraftSchema());

		if (!validated.success) {
			return fail(400, { isSuccess: false, message: validated.errorMessage });
		}

		const { draftId } = { ...validated.data, draftId: +validated.data.draftId };
		const currentDraftId = +params.itemId;

		const draftCount = await prisma.draft.count({
			where: { authorId: locals.user?.id }
		});

		if (draftCount <= 1) {
			return fail(400, { isSuccess: false, message: '마지막 초고는 삭제하실 수 없습니다.' });
		}

		await prisma.draft.delete({ where: { id: draftId } });

		if (draftId === currentDraftId) {
			const latestDraftId = (
				await prisma.draft.findFirst({
					where: { authorId: locals.user?.id },
					select: { id: true },
					orderBy: { updatedAt: 'desc' }
				})
			)?.id;

			throw redirect(303, `/write/${latestDraftId}?mode=draft`);
		}
	},
	saveDraft: async ({ request, params }) => {
		const formData = await request.formData();
		const validated = validate(formData, saveDraftSchema());

		if (!validated.success) {
			return fail(400, { isSuccess: false, message: validated.errorMessage });
		}

		const { title, body } = {
			...validated.data,
			body: JSON.parse(validated.data.body)
		};
		const currentDraftId = +params.itemId;

		await prisma.draft.update({
			where: { id: currentDraftId },
			data: { title, body }
		});

		return { isSuccess: true, message: '초고를 성공적으로 저장했습니다. 🎉' };
	},
	createArticle: async ({ request, locals }) => {
		const formData = await request.formData();
		const validated = validate(formData, createArticleSchema());

		if (!validated.success) {
			return fail(400, { isSuccess: false, message: validated.errorMessage });
		}

		const { title, body, coverImage, tags, genre } = {
			...validated.data,
			coverImage: validated.data.coverImage ?? null,
			body: JSON.parse(validated.data.body),
			tags: validated.data.tags.split(','),
			genre: validated.data.genre as Genre
		};

		if (body.blocks.length === 1 && !body.blocks[0].data.text) {
			return fail(400, { isSuccess: false, message: '본문을 작성하여 주세요.' });
		}

		if (siteConfig.genre.filter((g) => g.enum === genre).length === 0) {
			throw error(400, '장르 설정이 올바르게 되지 않았습니다.');
		}

		const slug = `${title.trim().toLowerCase().replace(' ', '-')}-${nanoid()}`;
		const excerpt = generateExcerpt(body);

		const article = await prisma.article.create({
			data: {
				title,
				excerpt,
				body,
				coverImage,
				tags:
					tags.length > 0
						? {
								connectOrCreate: tags.map((tag: string) => ({
									where: { name: tag },
									create: { name: tag, slug: tagToSlug(tag) }
								}))
						  }
						: {},
				genre,
				slug,
				author: { connect: { id: locals.user?.id } }
			},
			include: { tags: true }
		});

		await meilisearch.index('articles').addDocuments([
			{
				id: article.id,
				title: article.title,
				body: bodyToString(body),
				tags: article.tags.map((tag) => tag.name),
				createdAt: article.createdAt
			}
		]);

		if (tags.length > 0) {
			await meilisearch.index('tags').addDocuments(
				article.tags.map((tag) => ({
					id: tag.id,
					name: tag.name
				}))
			);
		}

		throw redirect(303, `/@${locals.user?.username}/${article.slug}`);
	},
	updateArticle: async ({ request, params }) => {
		return;
	}
};

function deleteDraftSchema() {
	return z.object({
		draftId: z.string()
	});
}

function saveDraftSchema() {
	return z.object({
		title: z.string(),
		body: z.string()
	});
}

function createArticleSchema() {
	return z.object({
		title: z.string().min(1, '제목 작성은 필수입니다.'),
		body: z.string(),
		coverImage: z.string().optional(),
		tags: z.string(),
		genre: z.string()
	});
}
