import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { type Actions, fail, error } from '@sveltejs/kit';
import { meilisearch } from '$lib/server/meilisearch';
import { validate } from '$lib/server/validation';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user || locals.user?.role !== 'ADMIN') {
		throw error(404, '접근할 수 없는 페이지입니다.');
	}

	try {
		const [indexes, articles, tags, users] = await Promise.all([
			getAllIndexes(),
			getArticlesDocuments(),
			getTagsDocuments(),
			getUsersDocuments()
		]);

		return {
			indexes: indexes.map((index) => index.uid),
			articles,
			tags,
			users
		};
	} catch {
		return {
			indexes: [],
			articles: [],
			tags: [],
			users: []
		};
	}
};

async function getAllIndexes() {
	const indexes = await meilisearch.getIndexes();
	return indexes.results;
}

async function getArticlesDocuments() {
	const articles = await meilisearch.index('articles').getDocuments();
	return articles.results;
}

async function getTagsDocuments() {
	const tags = await meilisearch.index('tags').getDocuments();
	return tags.results;
}

async function getUsersDocuments() {
	const users = await meilisearch.index('users').getDocuments();
	return users.results;
}

export const actions: Actions = {
	createIndex: async ({ request }) => {
		const formData = await request.formData();
		const validated = validate(formData, createIndexSchema());

		if (!validated.success) {
			return fail(400, { isSuccess: false, message: validated.errorMessage });
		}

		const { indexName } = validated.data;

		await meilisearch.createIndex(indexName, { primaryKey: 'id' });
	},
	deleteIndex: async ({ request }) => {
		const formData = await request.formData();
		const validated = validate(formData, deleteIndexSchema());

		if (!validated.success) {
			return fail(400, { isSuccess: false, message: validated.errorMessage });
		}

		const { uid } = validated.data;

		await meilisearch.deleteIndex(uid);
	},
	deleteDocument: async ({ request }) => {
		const formData = await request.formData();
		const validated = validate(formData, deleteSchema());

		if (!validated.success) {
			return fail(400, { isSuccess: false, message: validated.errorMessage });
		}

		const { indexName, id } = validated.data;

		await meilisearch.index(indexName).deleteDocument(id);
	},
	updateArticleSettings: async () => {
		await meilisearch.index('articles').updateSettings({
			rankingRules: [
				'words',
				'typo',
				'proximity',
				'attribute',
				'sort',
				'exactness',
				'createdAt:desc'
			],
			searchableAttributes: ['title', 'body', 'tags'],
			displayedAttributes: ['id'],
			typoTolerance: {
				minWordSizeForTypos: {
					oneTypo: 5,
					twoTypos: 9
				}
			},
			pagination: {
				maxTotalHits: 1000
			}
		});

		console.log('article setting 완료');
	},
	updateTagSettings: async () => {
		await meilisearch.index('articles').updateSettings({
			rankingRules: ['words', 'typo', 'proximity', 'attribute', 'sort', 'exactness'],
			searchableAttributes: ['name'],
			displayedAttributes: ['id'],
			typoTolerance: {
				minWordSizeForTypos: {
					oneTypo: 5,
					twoTypos: 9
				}
			},
			pagination: {
				maxTotalHits: 1000
			}
		});

		console.log('tag setting 완료');
	},
	updateUserSettings: async () => {
		await meilisearch.index('articles').updateSettings({
			rankingRules: ['words', 'typo', 'proximity', 'attribute', 'sort', 'exactness'],
			searchableAttributes: ['nickname', 'bio'],
			displayedAttributes: ['id'],
			typoTolerance: {
				minWordSizeForTypos: {
					oneTypo: 5,
					twoTypos: 9
				}
			},
			pagination: {
				maxTotalHits: 1000
			}
		});

		console.log('user setting 완료');
	}
};

function createIndexSchema() {
	return z.object({
		indexName: z.string()
	});
}

function deleteIndexSchema() {
	return z.object({
		uid: z.string()
	});
}

function deleteSchema() {
	return z.object({
		indexName: z.string(),
		id: z.string()
	});
}
