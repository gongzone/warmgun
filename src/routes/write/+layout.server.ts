import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

import { getAvatar } from '$lib/character/avatar';
import { getWriterData } from './_load';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	if (!locals.user) {
		throw error(404);
	}

	const writerData = await getWriterData(locals.user.id);

	if (!writerData || !writerData.character || !writerData.blog) {
		throw error(404);
	}

	const writer = {
		name: writerData.character.name,
		level: writerData.character.level,
		avatarUrl: getAvatar(writerData.character.mainAvatar).url,
		blogUrl: writerData.blog.url,
		drafts: writerData.drafts
	};

	return { writer, currentDraftId: params.draftId };
};
