import { api } from '$lib/api-client';
import type { OutputData } from '@editorjs/editorjs';

export async function getDraft(draftId: string) {
	return await api.get(`api/draft/${draftId}`).json<Draft>();
}

export async function createDraft() {
	return await api.post('api/draft');
}

export async function saveDraft(draftId: string, data: EditorData) {
	return await api.put(`api/draft/${draftId}`, {
		json: data
	});
}

export async function deleteDraft(draftId: number) {
	return await api.delete(`api/draft/${draftId}`);
}

interface Draft extends EditorData {
	id: number;
}

export interface EditorData {
	title: string;
	subTitle: string;
	body: OutputData;
}
