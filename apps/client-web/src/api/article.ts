import type { QueryFunctionContext } from '@tanstack/svelte-query';
import type { OutputData } from '@editorjs/editorjs';

import type { Article, BlogerArticle, PaginationData } from '$lib/types/api';
import { api } from '$lib/clients/api-client';

export async function findBestArticles() {
	return api.get(`api/articles/best?take=${12}`).json<Article[]>();
}

export async function findHotArticles({ pageParam = 1 }: QueryFunctionContext) {
	return api.get(`api/articles/hot?take=${12}&cursor=${pageParam}`).json<PaginationData<Article>>();
}

export async function findOneArticle(username: string, slug: string) {
	return api.get(`api/articles/${username}/${slug}`).json<BlogerArticle>();
}

export async function findUserArticles({ queryKey, pageParam = 0 }: QueryFunctionContext) {
	const username = queryKey[1];
	return api
		.get(`api/articles/${username}/users?take=${12}&cursor=${pageParam}`)
		.json<PaginationData<Article>>();
}

export async function createArticle(createArticleDto: CreateArticleDto) {
	return api.post(`api/articles`, { json: createArticleDto });
}

export async function likeArticle(articleId: number) {
	return api.post(`api/articles/${articleId}/likes`);
}

export async function unlikeArticle(articleId: number) {
	return api.delete(`api/articles/${articleId}/likes`);
}

interface CreateArticleDto {
	title: string;
	subTitle: string;
	body: OutputData;
	coverImage: string | null;
	slug: string;
	tags: string[];
}
