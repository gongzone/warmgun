import type { LayoutServerLoad } from './$types';

import { prisma } from '$lib/server/db';
import { blogUserSelect } from '$lib/types/user';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const blogUser = await findBlogUser(params.page.slice(1, params.page.length));

	return { blogUser };
};

async function findBlogUser(username: string) {
	const blogUser = await prisma.user.findUnique({
		where: { username },
		select: blogUserSelect
	});

	if (!blogUser) {
		throw error(404, '없는 페이지입니다.');
	}

	return blogUser;
}
