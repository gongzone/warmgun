/*
  Warnings:

  - A unique constraint covering the columns `[authorId]` on the table `Article` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Article_authorId_key" ON "Article"("authorId");
