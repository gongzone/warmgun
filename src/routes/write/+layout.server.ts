import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

import { getAvatar } from '$lib/character/avatar';
import { getWriterData } from './_load';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw error(404);
	}

	const writerData = await getWriterData(locals.user.id);

	const writer = {
		name: writerData?.character?.name,
		level: writerData?.character?.level,
		avatarUrl: getAvatar(writerData?.character?.mainAvatar).url,
		blogUrl: writerData?.blog?.url,
		drafts: writerData?.drafts
	};

	return { writer };
};
