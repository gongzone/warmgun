import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import { meilisearch } from '$lib/server/meilisearch';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	await Promise.all([
		meilisearch.index('articles').addDocuments([
			{
				id: 9999,
				title: '테스트용 아티클입니다.',
				tags: ['React', 'Svelte', 'JavaScript'],
				genre: 'FRONTEND'
			}
		]),
		meilisearch.index('tags').addDocuments([
			{
				id: 9999,
				name: 'JavaScript'
			}
		]),
		meilisearch.index('users').addDocuments([
			{
				id: 9999,
				nickname: 'testuser1'
			}
		])
	]);

	const [articles, tags, users] = await Promise.all([
		meilisearch.index('articles').getDocuments(),
		meilisearch.index('tags').getDocuments(),
		meilisearch.index('users').getDocuments()
	]);

	return { articles, tags, users };
};

export const actions: Actions = {
	deleteSearchArticle: async ({ locals, request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		await meilisearch.index('articles').deleteDocument(+id);
	},
	deleteSearchTag: async ({ locals, request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		await meilisearch.index('tags').deleteDocument(+id);
	},
	deleteSearchUser: async ({ locals, request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		await meilisearch.index('users').deleteDocument(+id);
	}
};
