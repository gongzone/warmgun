import type { QueryFunctionContext } from '@tanstack/svelte-query';

import { api } from '$lib/clients/api-client';
import type { CommentsByPagination } from '$lib/types/api';

export async function findArticleComments({ queryKey, pageParam = 0 }: QueryFunctionContext) {
	const articleId = queryKey[1];
	const parentId = queryKey[2] ?? undefined;

	return api
		.get(`api/comments/articles/${articleId}?cursor=${pageParam}&parentId=${parentId}`)
		.json<CommentsByPagination>();
}

export async function createComment(
	articleId: number,
	parentId: number | undefined,
	createCommentDto: CreateCommentDto
) {
	return api.post(`api/comments/${articleId}?parentId=${parentId}`, {
		json: createCommentDto
	});
}

interface CreateCommentDto {
	content: string;
}
