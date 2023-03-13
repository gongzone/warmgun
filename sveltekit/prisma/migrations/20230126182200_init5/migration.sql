/*
  Warnings:

  - Made the column `title` on table `Draft` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Draft` required. This step will fail if there are existing NULL values in that column.
  - Made the column `body` on table `Draft` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Draft" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "title" SET DEFAULT '',
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "body" SET NOT NULL,
ALTER COLUMN "body" SET DEFAULT '';
