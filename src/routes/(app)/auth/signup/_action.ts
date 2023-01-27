import db from '$lib/server/db';

export async function findUserByUsernameOrEmail(username: string, email: string) {
	return await db.user.findFirst({
		where: {
			OR: [{ username }, { email }]
		}
	});
}

export async function createNewUser(username: string, hashedPassword: string, email: string) {
	return await db.user.create({
		data: {
			username,
			password: hashedPassword,
			email,
			character: {
				create: {
					name: username
				}
			},
			blog: {
				create: {
					name: `${username}님의 블로그`,
					url: `/@${username}`
				}
			},
			drafts: {
				create: {}
			}
		}
	});
}
