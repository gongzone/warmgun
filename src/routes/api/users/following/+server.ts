import type { RequestHandler } from './$types';
import { z } from 'zod';
import { error, json, redirect } from '@sveltejs/kit';

import { prisma } from '$lib/server/db';
import { validate } from '$lib/server/validation';
import { buildInfinityData } from '$lib/utils/infinity-data';
import { blogUserSelect } from '$lib/types/user';

export const GET = (async ({ locals, url, params }) => {
	if (!locals.user) {
		throw redirect(302, '/auth/login');
	}

	const validated = validate(url.searchParams, getUsersSchema());

	if (!validated.success) {
		throw error(400, validated.errorMessage);
	}

	const { take, cursor } = {
		take: +validated.data.take,
		cursor: +validated.data.cursor
	};

	const users = await findFollowingUser(locals.user.id, take, cursor);

	return json(buildInfinityData(users, take, cursor));
}) satisfies RequestHandler;

async function findFollowingUser(userId: number, take: number, cursor: number) {
	const users = await prisma.user.findMany({
		take,
		skip: take * cursor,
		where: {
			followedBy: {
				some: {
					followerId: userId
				}
			}
		},
		select: blogUserSelect
	});

	return users;
}

function getUsersSchema() {
	return z.object({
		take: z.string({ required_error: '필수 값입니다.' }),
		cursor: z.string({ required_error: '필수 값입니다.' })
	});
}
