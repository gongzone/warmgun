import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

import { prisma } from '$lib/server/db';
import { tagInclude } from '$lib/types/tag';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const [tag] = await Promise.all([findOneTag(params.slug)]);

	if (!tag) {
		throw error(404, '해당 태그가 존재하지 않습니다.');
	}

	const isFollowing = tag.tagLikes.find((like) => like.userId === locals.user?.id);

	return { tag, isFollowing: !!isFollowing };
};

async function findOneTag(slug: string) {
	const tag = await prisma.tag.findUnique({
		where: { slug },
		include: { ...tagInclude, tagLikes: true }
	});

	return tag;
}
