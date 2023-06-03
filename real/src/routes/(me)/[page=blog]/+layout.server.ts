import type { LayoutServerLoad } from './$types';

import { prisma } from '$lib/server/db';
import { blogUserSelect } from '$lib/types/user';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const blogUser = await findBlogUser(locals.user?.id, params.page.slice(1, params.page.length));

	return {
		blogUser,
		isOwner: blogUser.id === locals.user?.id,
		isFollowing: !!blogUser.followedBy?.length
	};
};

async function findBlogUser(userId: number | undefined, username: string) {
	const blogUser = await prisma.user.findUnique({
		where: { username },
		select: { ...blogUserSelect, followedBy: userId ? { where: { followerId: userId } } : false }
	});

	if (!blogUser) {
		throw error(404, '없는 페이지입니다.');
	}

	return blogUser;
}
