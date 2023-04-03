import { api } from '$lib/clients/api-client';
import type { OutputData } from '@editorjs/editorjs';
import type { QueryFunctionContext } from '@tanstack/svelte-query';

export async function getBestArticles(take = 12) {
	return api.get(`api/article/best?take=${take}`).json<Article[]>();
}

export async function getHotArticles({ pageParam = 1 }: QueryFunctionContext) {
	return api.get(`api/article/hot?take=${12}&cursor=${pageParam}`).json<ArticlesByPagination>();
}

export async function searchArtlces({ queryKey, pageParam = 1 }: QueryFunctionContext) {
	const [_, take, searchInput] = queryKey;

	console.log(searchInput);

	return api
		.get(`api/article/search?take=${take}&cursor=${pageParam}&search=${searchInput}`)
		.json<ArticlesByPagination>();
}

export async function getArticleBySlug(slug: string) {
	return api.get(`api/article/${slug}`).json<GetArticleBySlug>();
}

export async function getArticlesByPagination({ queryKey, pageParam = 0 }: QueryFunctionContext) {
	const username = queryKey[1];

	return api
		.get(`api/article?username=${username}&take=10${pageParam ? `&cursor=${pageParam}` : ''}`)
		.json<ArticlesByPagination>();
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
		profile: {
			nickname: string;
			avatar: string | null;
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
