import type { PageServerLoad } from './$types';

import { prisma } from '$lib/server/db';
import { blogUserSelect } from '$lib/types/user';

export const load: PageServerLoad = async ({ url }) => {
	const topUsers = await findTopUsers();
	const popularTags = (await findPopularTags()).map((tag) => tag.name);

	return {
		topUsers,
		popularTags
	};
};

async function findTopUsers() {
	const users = await prisma.user.findMany({
		take: 10,
		select: blogUserSelect,
		orderBy: { followedBy: { _count: 'desc' } }
	});

	return users;
}

async function findPopularTags() {
	const take = 8;
	const popularTags = await prisma.tag.findMany({
		take,
		where: {
			articles: { some: { createdAt: { gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) } } }
		},
		orderBy: { articles: { _count: 'desc' } }
	});

	if (popularTags.length < take) {
		const excludes = popularTags.map((tag) => tag.name);

		const fallbackTags = await prisma.tag.findMany({
			take: take - popularTags.length,
			where: { name: { notIn: excludes } },
			orderBy: { articles: { _count: 'desc' } }
		});

		return popularTags.concat(fallbackTags);
	}

	return popularTags;
}

// async function findHomeArticles(filter: string, cursor: number) {
// 	const take = 12;
// 	const articles = await db.article.findMany({
// 		take,
// 		skip: take * cursor,
// 		include: articlesInclude,
// 		orderBy: filter === 'trending' ? { trendingScore: 'desc' } : { createdAt: 'desc' }
// 	});

// 	const paginatedArticles = buildPaginationData(articles, take, +cursor);
// 	return paginatedArticles;
// }
