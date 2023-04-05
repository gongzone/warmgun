import { api } from '$lib/clients/api-client';
import type { OutputData } from '@editorjs/editorjs';
import type { QueryFunctionContext } from '@tanstack/svelte-query';

const API_BASE_URL = 'api/articles';

export async function searchArtlces({ queryKey, pageParam = 0 }: QueryFunctionContext) {
	const searchInput = queryKey[1];

	return api
		.get(`${API_BASE_URL}?search=${searchInput}&take=${10}&cursor=${pageParam}`)
		.json<ArticlesByPagination>();
}

export async function getBestArticles(take = 12) {
	return api.get(`${API_BASE_URL}/best?take=${take}`).json<Article[]>();
}

export async function getHotArticles({ pageParam = 1 }: QueryFunctionContext) {
	return api.get(`${API_BASE_URL}/hot?take=${12}&cursor=${pageParam}`).json<ArticlesByPagination>();
}

export async function getBlogerArticles({ queryKey, pageParam = 0 }: QueryFunctionContext) {
	const username = queryKey[1];

	return api
		.get(`${API_BASE_URL}/${username}?take=${12}&cursor=${pageParam}`)
		.json<ArticlesByPagination>();
}

export async function getBlogerArticle(username: string, slug: string) {
	return api.get(`${API_BASE_URL}/${username}/${slug}`).json<Article>();
}

export async function createArticle(createArticleDTO: CreateArticleDTO) {
	return api.post(`${API_BASE_URL}`, { json: createArticleDTO });
}

export interface Article {
	id: number;
	title: string;
	subTitle: string;
	body: OutputData;
	coverImage: string;
	slug: string;
	createdAt: Date;
	tags: {
		name: string;
	}[];
	author: {
		username: string;
		profile: {
			nickname: string;
			avatar: string | null;
			bio: string;
		};
	};
	_count: {
		likes: number;
		comments: number;
	};
}
export interface ArticlesByPagination {
	articles: Article[];
	nextCursor: number;
}

interface CreateArticleDTO {
	title: string;
	subTitle: string;
	body: OutputData;
	coverImage: string | null;
	slug: string;
	tags: string[];
}
