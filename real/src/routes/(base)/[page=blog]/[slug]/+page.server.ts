import { prisma } from '$lib/server/db';
import { articleInclude } from '$lib/types/article';
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const ssr = false;

export const load: PageServerLoad = async ({ locals, params }) => {
	const article = await findOneArticle(params.slug);
	const isLiked = article.likes.find((like) => like.userId === locals.user?.id);

	return { article, isLiked: !!isLiked };
};

async function findOneArticle(slug: string) {
	const article = await prisma.article.findUnique({
		where: { slug },
		include: {
			...articleInclude,
			likes: true
		}
	});

	if (!article) {
		throw error(404, 'no');
	}

	return article;
}
