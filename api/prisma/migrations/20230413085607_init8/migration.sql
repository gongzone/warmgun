/*
  Warnings:

  - A unique constraint covering the columns `[id,authorId]` on the table `Article` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Article_authorId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Article_id_authorId_key" ON "Article"("id", "authorId");
