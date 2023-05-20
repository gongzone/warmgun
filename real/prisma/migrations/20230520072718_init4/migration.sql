-- CreateTable
CREATE TABLE "ProfileLinks" (
    "id" SERIAL NOT NULL,
    "website" TEXT NOT NULL DEFAULT '',
    "github" TEXT NOT NULL DEFAULT '',
    "instagram" TEXT NOT NULL DEFAULT '',
    "facebook" TEXT NOT NULL DEFAULT '',
    "twitter" TEXT NOT NULL DEFAULT '',
    "youtube" TEXT NOT NULL DEFAULT '',
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "ProfileLinks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfileLinks_profileId_key" ON "ProfileLinks"("profileId");

-- AddForeignKey
ALTER TABLE "ProfileLinks" ADD CONSTRAINT "ProfileLinks_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
