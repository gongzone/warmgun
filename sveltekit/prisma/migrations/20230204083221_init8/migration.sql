/*
  Warnings:

  - You are about to drop the column `description` on the `Draft` table. All the data in the column will be lost.
  - Added the required column `description` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Draft" DROP COLUMN "description",
ADD COLUMN     "subTitle" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "description" TEXT NOT NULL;
