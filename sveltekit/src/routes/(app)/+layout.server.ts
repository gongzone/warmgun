import type { LayoutServerLoad } from './$types';
import db from '$lib/server/db';

const TOTAL_TAGS_NUMBER = 12;

export const load = (async () => {
	const popularTags = await findPopularTagsQuery(TOTAL_TAGS_NUMBER);

	if (popularTags.length < TOTAL_TAGS_NUMBER) {
		const tagNames = popularTags.map((tag) => tag.name);

		const fallbackTags = await findFallbackTagsQuery(
			TOTAL_TAGS_NUMBER,
			popularTags.length,
			tagNames
		);

		return {
			popularTags: popularTags.concat(fallbackTags)
		};
	}

	return {
		popularTags
	};
}) satisfies LayoutServerLoad;

async function findPopularTagsQuery(total: number) {
	return await db.tag.findMany({
		take: total,
		where: {
			articles: {
				some: {
					createdAt: {
						gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) // two weeks
					}
				}
			}
		},
		orderBy: {
			articles: {
				_count: 'desc'
			}
		},
		select: {
			name: true
		}
	});
}

async function findFallbackTagsQuery(total: number, skip: number, existingTagNames: string[]) {
	const take = total - skip;

	return await db.tag.findMany({
		skip,
		take,
		where: {
			name: {
				notIn: existingTagNames
			}
		},
		orderBy: {
			articles: {
				_count: 'desc'
			}
		},
		select: {
			name: true
		}
	});
}
