import type { PageServerLoad } from './$types';
import {
	findPosts,
	findPostsCount,
	type FindPostsCommunity,
	type FindPostsSort
} from '$lib/server/db/post';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const community = (params.board ?? 'ALL').toUpperCase() as FindPostsCommunity | null;
	const cursor = url.searchParams.get('cursor');
	const sort = url.searchParams.get('sort') as FindPostsSort | null;

	// const boardType = (params.board ?? 'ALL').toUpperCase() as FindPostsCommunity;
	// const sort = (url.searchParams.get('sort') ?? 'recent') as FindPostsSort;
	// const cursor = url.searchParams.get('cursor') ?? 0;

	return {
		posts: findPosts(community ?? 'ALL', sort ?? 'recent', {
			take: 10,
			cursor: cursor ? +cursor : 0
		}),
		postsCount: findPostsCount(community ?? 'ALL'),
		cursor: cursor ? +cursor : 0,
		sort
	};
};
