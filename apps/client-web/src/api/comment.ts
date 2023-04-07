import { api } from '$lib/clients/api-client';
import type { Comment } from '$lib/types/api';
import type { QueryFunctionContext } from '@tanstack/svelte-query';

const API_BASE_URL = 'api/comments';

export async function getParentComments({ queryKey, pageParam = 0 }: QueryFunctionContext) {
	const articleId = queryKey[1];

	return api
		.get(`${API_BASE_URL}/${articleId}?take=${10}&cursor=${pageParam}`)
		.json<CommentsByPagination>();
}

export async function getChildrenComments({ queryKey, pageParam = 0 }: QueryFunctionContext) {
	const articleId = queryKey[1];
	const parentId = queryKey[2];

	return api
		.get(`${API_BASE_URL}/${articleId}/${parentId}?take=${10}&cursor=${pageParam}`)
		.json<CommentsByPagination>();
}

export async function createComment(
	articleId: number,
	parentId: number | undefined,
	createCommentDTO: CreateCommentDTO
) {
	return api.post(`${API_BASE_URL}/${articleId}${parentId ? `?parentId=${parentId}` : ''}`, {
		json: createCommentDTO
	});
}

interface CommentsByPagination {
	comments: Comment[];
	nextCursor: number;
}

interface CreateCommentDTO {
	content: string;
}
