import { api } from '$lib/clients/api-client';
import type { OutputData } from '@editorjs/editorjs';
import type { QueryFunctionContext } from '@tanstack/svelte-query';

export async function searchArtlces({ queryKey, pageParam = 1 }: QueryFunctionContext) {
	const [_, take, searchInput] = queryKey;

	console.log(searchInput);

	return api
		.get(`api/article/search?take=${take}&cursor=${pageParam}&search=${searchInput}`)
		.json<GetArticlesByPagination>();
}

export async function getBestArticles(take: number) {
	return api.get(`api/article/best?take=${take}`).json<Article[]>();
}

export async function getHotArticles({ queryKey, pageParam = 1 }: QueryFunctionContext) {
	const take = queryKey[1];

	return api
		.get(`api/article/hot?take=${take}&cursor=${pageParam}`)
		.json<GetArticlesByPagination>();
}

export async function getArticleBySlug(slug: string) {
	return api.get(`api/article/${slug}`).json<GetArticleBySlug>();
}

export async function getArticlesByPagination({ queryKey, pageParam = 0 }: QueryFunctionContext) {
	const username = queryKey[1];

	return api
		.get(`api/article?username=${username}&take=10${pageParam ? `&cursor=${pageParam}` : ''}`)
		.json<GetArticlesByPagination>();
}

export async function createArticle(createArticleDTO: CreateArticleDTO) {
	return api.post('api/article', { json: createArticleDTO }).json();
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
		nickname: string;
		avatar: string | null;
	};
	likeCount: number;
	commentCount: number;
}
export interface GetArticlesByPagination {
	articles: Article[];
	nextCursor: number;
}

interface GetArticleBySlug {
	article: Article;
	author: {
		nickname: string;
		bio: string;
		avatar: string;
	};
}

interface CreateArticleDTO {
	title: string;
	subTitle: string;
	body: OutputData;
	coverImage: string | null;
	slug: string;
	tags: string[];
}
