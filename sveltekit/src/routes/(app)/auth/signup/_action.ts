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
			profile: {
				create: {
					nickname: username,
					description: `${username}입니다.`
				}
			},
			drafts: {
				create: {}
			}
		}
	});
}
