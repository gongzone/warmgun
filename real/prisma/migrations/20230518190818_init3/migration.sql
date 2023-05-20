-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('FRONTEND', 'BAKCEND', 'DEVOPS', 'MOBILE', 'DATA_SCIENCE', 'GAME', 'ETC');

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "genre" "Genre" NOT NULL DEFAULT 'ETC';
