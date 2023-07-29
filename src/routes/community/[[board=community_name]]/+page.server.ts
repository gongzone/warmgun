import type { PageServerLoad } from './$types';
import {
	findPosts,
	findPostsCount,
	type FindPostsCommunity,
	type FindPostsSort
} from '$lib/server/db/post';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const boardType = (params.board ?? 'ALL').toUpperCase() as FindPostsCommunity;
	const cursor = url.searchParams.get('cursor') ?? 0;
	const sort = (url.searchParams.get('sort') ?? 'recent') as FindPostsSort;

	return {
		posts: findPosts(boardType, sort, { take: 10, cursor: +cursor }),
		postsCount: findPostsCount(boardType)
	};
};
