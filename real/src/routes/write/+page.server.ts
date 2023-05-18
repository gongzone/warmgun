import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw error(401, '제한된 접근입니다.');
	}

	const latestDraftId = await findLatestDraftId(locals.user.id);

	throw redirect(301, `/write/${latestDraftId}?mode=draft`);
};

async function findLatestDraftId(userId: number) {
	const latestDraft = await prisma.draft.findFirst({
		where: { authorId: userId },
		select: { id: true },
		orderBy: { updatedAt: 'desc' }
	});

	return latestDraft?.id;
}
