/*
  Warnings:

  - The values [BAKCEND] on the enum `Genre` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Genre_new" AS ENUM ('FRONTEND', 'BACKEND', 'DEVOPS', 'MOBILE', 'DATA_SCIENCE', 'GAME', 'ETC');
ALTER TABLE "Article" ALTER COLUMN "genre" DROP DEFAULT;
ALTER TABLE "Article" ALTER COLUMN "genre" TYPE "Genre_new" USING ("genre"::text::"Genre_new");
ALTER TYPE "Genre" RENAME TO "Genre_old";
ALTER TYPE "Genre_new" RENAME TO "Genre";
DROP TYPE "Genre_old";
ALTER TABLE "Article" ALTER COLUMN "genre" SET DEFAULT 'ETC';
COMMIT;
