import type { PageServerLoad } from './$types';

import { prisma } from '$lib/server/db';
import { blogUserSelect } from '$lib/types/user';
import { articleInclude } from '$lib/types/article';
import { tagInclude } from '$lib/types/tag';

export const load: PageServerLoad = async () => {
	const [topUsers, popularTags, trendingArticles] = await Promise.all([
		findTopBlogUsers(),
		findPopularTags(),
		findTrendingArticles()
	]);

	return {
		topUsers,
		popularTags,
		trendingArticles
	};
};

async function findTopBlogUsers() {
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
		include: tagInclude,
		orderBy: { articles: { _count: 'desc' } }
	});

	if (popularTags.length < take) {
		const excludes = popularTags.map((tag) => tag.name);

		const fallbackTags = await prisma.tag.findMany({
			take: take - popularTags.length,
			where: { name: { notIn: excludes } },
			include: tagInclude,
			orderBy: { articles: { _count: 'desc' } }
		});

		return popularTags.concat(fallbackTags);
	}

	return popularTags;
}

async function findTrendingArticles() {
	const articles = await prisma.article.findMany({
		take: 9,
		include: articleInclude,
		orderBy: { trendingScore: 'desc' }
	});

	return articles;
}
