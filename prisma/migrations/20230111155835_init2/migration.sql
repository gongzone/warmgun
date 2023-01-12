/*
  Warnings:

  - You are about to drop the column `path` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Title` table. All the data in the column will be lost.
  - Added the required column `location` to the `Avatar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Avatar` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Avatar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Avatar" DROP COLUMN "path",
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Title" DROP COLUMN "color";
