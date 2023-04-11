import type { QueryFunctionContext } from '@tanstack/svelte-query';

import { api } from '$lib/clients/api-client';
import type { PaginationData, Comment } from '$lib/types/api';

export async function findArticleComments({ queryKey, pageParam = 0 }: QueryFunctionContext) {
	const articleId = queryKey[1];
	const parentId = queryKey[2] ?? null;

	return api
		.get(
			`api/comments/${articleId}/articles?take=${10}&cursor=${pageParam}${
				parentId ? `&parentId=${parentId}` : ''
			}`
		)
		.json<PaginationData<Comment>>();
}

export async function createComment(
	articleId: number,
	parentId: number | null,
	createCommentDto: CreateCommentDto
) {
	return api.post(`api/comments/${articleId}/articles${parentId ? `?parentId=${parentId}` : ''}`, {
		json: createCommentDto
	});
}

interface CreateCommentDto {
	content: string;
}
