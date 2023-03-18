import { apiAfterRefresh } from '$lib/api-client';

export async function getDraftById(draftId: string) {
	return await apiAfterRefresh.get(`api/draft/${draftId}`).json<Draft>();
}

export async function createDraft() {
	return await apiAfterRefresh.post('api/draft');
}

export async function deleteDraft(draftId: number) {
	return await apiAfterRefresh.delete(`api/draft/${draftId}`);
}

interface Draft {
	id: number;
	title: string;
	subTitle: string;
	body: string;
}
