import * as dotenv from 'dotenv';
import { defineConfig } from '@mikro-orm/core';

dotenv.config();

export default defineConfig({
  type: 'postgresql',
  dbName: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  entities: ['./dist/entities/**/*.entity.js'],
  entitiesTs: ['./src/entities/**/*.entity.ts'],
});
