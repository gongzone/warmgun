import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { nanoid } from 'nanoid';

import { prisma, db } from '$lib/server/db';
import { meilisearch } from '$lib/server/meilisearch';
import { siteConfig } from '$lib/configs/site';
import { bodyToString, calculateReadingTime, generateExcerpt } from '$lib/utils/editor-utils';
import { formatExcerpt, formatReadingTime, formatSlug, formatTagSlug } from '$lib/utils/format';
import { articleInclude } from '$lib/types/article';

import { validate, generateFormMessage } from '$lib/server/server-utils';

import { createArticleSchema } from '$lib/server/schema/article';
import type { JSONContent } from '@tiptap/core';
import { findDrafts } from '$lib/server/db/draft';
import { findOneArticle } from '$lib/server/db/article';

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
	} else {
		throw error(404, '접근 불가능한 페이지입니다.');
	}
};

export const actions: Actions = {
	createDraft: async ({ locals }) => {
		const draftCount = await prisma.draft.count({
			where: { userId: locals.user?.id }
		});

		if (draftCount >= 10) {
			return fail(400, { isSuccess: false, message: '초고는 10개까지만 생성 가능합니다.' });
		}

		const draft = await prisma.draft.create({
			data: {
				user: { connect: { id: locals.user?.id } }
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
			where: { userId: locals.user?.id }
		});

		if (draftCount <= 1) {
			return fail(400, { isSuccess: false, message: '마지막 초고는 삭제하실 수 없습니다.' });
		}

		await prisma.draft.delete({ where: { id: draftId } });

		if (draftId === currentDraftId) {
			const latestDraftId = (
				await prisma.draft.findFirst({
					where: { userId: locals.user?.id },
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
		const validated = validate(formData, createArticleSchema);

		if (!validated.success) {
			return fail(400, generateFormMessage(false, validated.errorMessage));
		}

		const { title, body, plaintext, coverImage, tags, category } = {
			...validated.data,
			body: JSON.parse(validated.data.body) as JSONContent,
			coverImage: validated.data.coverImage ?? null,
			tags: validated.data.tags ? validated.data.tags.split(',') : undefined
		};

		const slug = formatSlug(title);
		const excerpt = formatExcerpt(plaintext);
		const readingTime = formatReadingTime(plaintext);

		const article = await db.article.create({
			data: {
				title,
				body,
				excerpt,
				coverImage,
				category,
				slug,
				readingTime,
				tags: tags
					? {
							connectOrCreate: tags.map((tag: string) => ({
								where: { name: tag },
								create: { name: tag, slug: formatTagSlug(tag) }
							}))
					  }
					: {},
				user: { connect: { id: locals.user?.id } }
			}
		});

		// await meilisearch.index('articles').addDocuments([
		// 	{
		// 		id: article.id,
		// 		title: article.title,
		// 		body: bodyString,
		// 		tags: article.tags.map((tag) => tag.name),
		// 		createdAt: article.createdAt
		// 	}
		// ]);

		// if (tags) {
		// 	await meilisearch.index('tags').addDocuments(
		// 		article.tags.map((tag) => ({
		// 			id: tag.id,
		// 			name: tag.name
		// 		}))
		// 	);
		// }

		throw redirect(303, `/@${locals.user?.username}/${article.slug}`);
	},
	updateArticle: async ({ request, params, locals }) => {
		const formData = await request.formData();
		const validated = validate(formData, createArticleSchema);

		if (!validated.success) {
			return fail(400, { isSuccess: false, message: validated.errorMessage });
		}

		const { title, body, plaintext, coverImage, tags, category } = {
			...validated.data,
			body: JSON.parse(validated.data.body) as JSONContent,
			coverImage: validated.data.coverImage ?? null,
			tags: validated.data.tags ? validated.data.tags.split(',') : undefined
		};

		const slug = formatSlug(title);
		const excerpt = formatExcerpt(plaintext);
		const readingTime = formatReadingTime(plaintext);

		const article = await prisma.article.update({
			where: { id: +params.itemId },
			data: {
				title,
				body,
				excerpt,
				coverImage,
				category,
				slug,
				readingTime,
				tags: tags
					? {
							set: [],
							connectOrCreate: tags.map((tag: string) => ({
								where: { name: tag },
								create: { name: tag, slug: formatTagSlug(tag) }
							}))
					  }
					: {}
			},
			include: { tags: true }
		});

		// await meilisearch.index('articles').updateDocuments([
		// 	{
		// 		id: article.id,
		// 		title: article.title,
		// 		body: bodyString,
		// 		tags: article.tags.map((tag) => tag.name),
		// 		createdAt: article.createdAt
		// 	}
		// ]);

		// if (tags) {
		// 	await meilisearch.index('tags').updateDocuments(
		// 		article.tags.map((tag) => ({
		// 			id: tag.id,
		// 			name: tag.name
		// 		}))
		// 	);
		// }

		throw redirect(303, `/@${locals.user?.username}/${article.slug}`);
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

function updateArticleSchema() {
	return z.object({
		title: z.string().min(1, '제목 작성은 필수입니다.'),
		body: z.string(),
		coverImage: z.string().optional(),
		tags: z.string().optional(),
		genre: z.string()
	});
}
