import db from '$lib/server/db';

export async function findUserByUsername(username: string) {
	return await db.user.findUnique({
		where: {
			username
		}
	});
}
