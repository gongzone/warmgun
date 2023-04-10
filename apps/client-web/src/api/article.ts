import type { QueryFunctionContext } from '@tanstack/svelte-query';
import type { OutputData } from '@editorjs/editorjs';

import type { Article, BlogerArticle, ArticlesByPagination } from '$lib/types/api';
import { api, refresh } from '$lib/clients/api-client';

export async function findBestArticles() {
	return api.get(`api/articles?mode=best`).json<Article[]>();
}

export async function findHotArticles({ pageParam = 1 }: QueryFunctionContext) {
	return api.get(`api/articles?mode=hot&cursor=${pageParam}`).json<ArticlesByPagination>();
}

export async function findOneArticle(slug: string) {
	return api
		.get(`api/articles/${slug.replace('/', ' ')}`, {
			hooks: {
				beforeRequest: [
					async () => {
						await refresh();
					}
				]
			}
		})
		.json<BlogerArticle>();
}

export async function findBlogerArticles({ queryKey, pageParam = 0 }: QueryFunctionContext) {
	const username = queryKey[1];
	return api
		.get(`api/articles/blogers/${username}?cursor=${pageParam}`)
		.json<ArticlesByPagination>();
}

export async function createArticle(createArticleDto: CreateArticleDto) {
	return api.post(`api/articles`, { json: createArticleDto });
}

export async function likeArticle(articleId: number) {
	return api.post(`api/articles/likes/${articleId}`);
}

export async function unlikeArticle(articleId: number) {
	return api.delete(`$api/articles/likes/${articleId}`);
}

interface CreateArticleDto {
	title: string;
	subTitle: string;
	body: OutputData;
	coverImage: string | null;
	slug: string;
	tags: string[];
}
