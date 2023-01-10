import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export const disconnectDB = async () => {
	await db.$disconnect();
};

export async function resetDB() {
	const tablenames = await db.$queryRaw<
		Array<{ tablename: string }>
	>`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

	for (const { tablename } of tablenames) {
		if (tablename !== '_prisma_migrations') {
			try {
				await db.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
			} catch (error) {
				console.log({ error });
			}
		}
	}
}

export default db;
