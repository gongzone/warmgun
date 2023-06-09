-- CreateTable
CREATE TABLE "TagLike" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TagLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TagLike_userId_tagId_key" ON "TagLike"("userId", "tagId");

-- AddForeignKey
ALTER TABLE "TagLike" ADD CONSTRAINT "TagLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagLike" ADD CONSTRAINT "TagLike_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
