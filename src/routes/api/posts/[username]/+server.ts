import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

import { validate } from '$lib/server/server-utils';
import { buildInfinityData } from '$lib/utils/infinity-data';
import { getPostSchema } from '$lib/server/schema/post';
import { findPosts } from '$lib/server/db/post';

export const GET = (async ({ url, params }) => {
	const validated = validate(url.searchParams, getPostSchema);

	if (!validated.success) {
		throw error(400, validated.errorMessage);
	}

	const { sort, take, cursor } = {
		...validated.data,
		take: +validated.data.take,
		cursor: +validated.data.cursor
	};

	const posts = await findPosts('ALL', sort, { username: params.username, take, cursor });
	return json(buildInfinityData(posts, take, cursor));
}) satisfies RequestHandler;
