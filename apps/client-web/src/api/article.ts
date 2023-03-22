import { apiAfterRefresh } from '$lib/api-client';
import type { OutputData } from '@editorjs/editorjs';

export async function createArticle(createArticleDTO: CreateArticleDTO) {
	return apiAfterRefresh.post('api/article', { json: createArticleDTO }).json();
}

interface CreateArticleDTO {
	title: string;
	subTitle: string;
	body: OutputData;
	coverImage: string | null;
	slug: string;
	tags: string[];
}
