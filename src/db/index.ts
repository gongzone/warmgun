import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import * as schema from "./schema"

const databaseUrl = process.env.DATABASE_URL ?? "" // TODO: ERROR 처리

export const queryClient = postgres(databaseUrl, {
  max: 1,
})

export const db = drizzle(queryClient, { schema })
