import type { PageServerLoad, Actions } from './$types';
import db from '$lib/server/db';

const ARTICLES_PER_TAKE = 12;

export const load = (async ({ locals, params }) => {
	const initArticles = await findTrendingArticles(0, ARTICLES_PER_TAKE);

	return {};
}) satisfies PageServerLoad;

async function findTrendingArticles(skip: number, take: number) {
	return await db.article.findMany({
		skip,
		take,
		where: {
			createdAt: {
				gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) // two weeks
			}
		},
		orderBy: {
			// score 관련 view table 생성
		},
		select: {
			id: true,
			title: true,
			subTitle: true,
			coverImage: true,
			slug: true,
			createdAt: true,
			author: {
				select: {
					profile: {
						select: {
							nickname: true,
							avatar: true
						}
					}
				}
			},
			_count: {
				select: {
					likes: true,
					comments: true
				}
			}
		}
	});
}
