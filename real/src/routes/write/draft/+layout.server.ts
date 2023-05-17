import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

import { prisma } from '$lib/server/db';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw error(401, '제한된 접근입니다.');
	}

	const drafts = await findDrafts(locals.user.id);

	return { drafts };
};

async function findDrafts(userId: number) {
	const drafts = await prisma.draft.findMany({
		where: { authorId: userId },
		orderBy: { updatedAt: 'desc' }
	});

	return drafts;
}
