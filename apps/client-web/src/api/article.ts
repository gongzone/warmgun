import { apiAfterRefresh } from '$lib/api-client';
import type { OutputData } from '@editorjs/editorjs';
import type { QueryFunctionContext } from '@tanstack/svelte-query';

export async function getArticlesByPagination({ queryKey, pageParam = 0 }: QueryFunctionContext) {
	const username = queryKey[1];

	return apiAfterRefresh
		.get(`api/article?username=${username}&take=10${pageParam ? `&cursor=${pageParam}` : ''}`)
		.json<GetArticlesByPagination>();
}

export async function createArticle(createArticleDTO: CreateArticleDTO) {
	return apiAfterRefresh.post('api/article', { json: createArticleDTO }).json();
}

export interface Article {
	id: number;
	title: string;
	subTitle: string;
	coverImage: string;
	slug: string;
	createdAt: Date;
	likeCount: number;
	commentCount: number;
}
interface GetArticlesByPagination {
	articles: Article[];
	lastCursor: number;
}

interface CreateArticleDTO {
	title: string;
	subTitle: string;
	body: OutputData;
	coverImage: string | null;
	slug: string;
	tags: string[];
}