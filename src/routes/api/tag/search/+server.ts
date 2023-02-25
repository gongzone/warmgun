import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import db from '$lib/server/db';

export const POST = (async ({ request, locals }) => {
	const { input, tags } = await request.json();

	const fetchedTags = await db.tag.findMany({
		where: {
			name: {
				startsWith: input,
				notIn: tags,
				mode: 'insensitive'
			}
		},
		take: 5,
		orderBy: {
			articles: {
				_count: 'asc'
			}
		},
		select: {
			name: true,
			articles: {
				select: {
					_count: true
				}
			}
		}
	});

	return json({ data: fetchedTags });
}) satisfies RequestHandler;
