import { apiAfterRefresh } from '$lib/api-client';
import type { OutputData } from '@editorjs/editorjs';

export async function getDraftById(draftId: string) {
	return await apiAfterRefresh.get(`api/draft/${draftId}`).json<Draft>();
}

export async function createDraft() {
	return await apiAfterRefresh.post('api/draft');
}

export async function saveDraft(draftId: string, data: EditorData) {
	return await apiAfterRefresh.put(`api/draft/${draftId}`, {
		json: data
	});
}

export async function deleteDraft(draftId: number) {
	return await apiAfterRefresh.delete(`api/draft/${draftId}`);
}

interface Draft extends EditorData {
	id: number;
}

export interface EditorData {
	title: string;
	subTitle: string;
	body: OutputData;
}
