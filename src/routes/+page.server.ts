import type { PageServerLoad } from './$types';

import { findArticles } from '$lib/server/db/article';

export const load: PageServerLoad = async () => {
	return {
		bestArticles: findArticles('ALL', 'best', { take: 10, cursor: 0 })
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
