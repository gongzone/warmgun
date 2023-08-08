import type { PageServerLoad } from './$types';

import { findArticles } from '$lib/server/db/article';
import { findPosts } from '$lib/server/db/post';
import { findTags } from '$lib/server/db/tag';
import { findUsers } from '$lib/server/db/user';

export const load: PageServerLoad = async () => {
	return {
		bestArticles: findArticles('ALL', 'best', { take: 10, cursor: 0 }),
		trendingArticles: findArticles('ALL', 'trending', { take: 6, cursor: 0 }),
		recentArticles: findArticles('ALL', 'recent', { take: 6, cursor: 0 }),
		freePosts: findPosts('FREE', 'recent', { take: 4, cursor: 0 }),
		questionPosts: findPosts('QUESTION', 'recent', { take: 4, cursor: 0 }),
		discussionPosts: findPosts('DISCUSSION', 'recent', { take: 4, cursor: 0 }),
		temaPosts: findPosts('TEAM', 'recent', { take: 4, cursor: 0 }),
		popularTags: findTags('popular', { take: 12, cursor: 0 }),
		topUsers: findUsers('top', { take: 5, cursor: 0 })
	};
};
