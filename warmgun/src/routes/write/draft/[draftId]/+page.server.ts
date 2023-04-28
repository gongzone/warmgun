import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const ssr = false;

export const load: PageServerLoad = async ({ params, parent }) => {
	const { drafts } = await parent();

	const foundDraft = drafts.find((draft) => draft.id === +params.draftId);
	if (!foundDraft) {
		throw error(404, '해당 페이지를 찾을 수 없습니다.');
	}

	return { draft: foundDraft };
};
