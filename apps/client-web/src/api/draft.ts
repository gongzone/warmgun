import type { OutputData } from '@editorjs/editorjs';
import { api } from '$lib/clients/api-client';
import type { Draft } from '$lib/types/api';

export async function findAllDrafts() {
	return await api.get(`api/drafts`).json<Draft[]>();
}

export async function findOneDraft(id: number) {
	return await api.get(`api/drafts/${id}`).json<Draft>();
}

export async function createDraft() {
	return await api.post(`api/drafts`);
}

export async function saveDraft(id: number, saveDraftDto: SaveDraftDto) {
	return await api.put(`api/drafts/${id}`, {
		json: saveDraftDto
	});
}

export async function deleteDraft(id: number) {
	return await api.delete(`api/drafts/${id}`);
}

export interface SaveDraftDto {
	title: string;
	subTitle: string;
	body: OutputData;
}
