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

// async function findPopularTags() {
// 	const take = 8;
// 	const popularTags = await prisma.tag.findMany({
// 		take,
// 		where: {
// 			articles: { some: { createdAt: { gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) } } }
// 		},
// 		include: tagInclude,
// 		orderBy: { articles: { _count: 'desc' } }
// 	});

// 	if (popularTags.length < take) {
// 		const excludes = popularTags.map((tag) => tag.name);

// 		const fallbackTags = await prisma.tag.findMany({
// 			take: take - popularTags.length,
// 			where: { name: { notIn: excludes } },
// 			include: tagInclude,
// 			orderBy: { articles: { _count: 'desc' } }
// 		});

// 		return popularTags.concat(fallbackTags);
// 	}

// 	return popularTags;
// }
