/*
  Warnings:

  - You are about to drop the column `equippedId` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `inventoryId` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Avatar` table. All the data in the column will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Equipped` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Inventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Title` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `characterId` to the `Avatar` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Avatar" DROP CONSTRAINT "Avatar_equippedId_fkey";

-- DropForeignKey
ALTER TABLE "Avatar" DROP CONSTRAINT "Avatar_inventoryId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_characterId_fkey";

-- DropForeignKey
ALTER TABLE "Equipped" DROP CONSTRAINT "Equipped_characterId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_characterId_fkey";

-- DropForeignKey
ALTER TABLE "Title" DROP CONSTRAINT "Title_equippedId_fkey";

-- DropForeignKey
ALTER TABLE "Title" DROP CONSTRAINT "Title_inventoryId_fkey";

-- DropIndex
DROP INDEX "Avatar_equippedId_key";

-- AlterTable
ALTER TABLE "Avatar" DROP COLUMN "equippedId",
DROP COLUMN "inventoryId",
DROP COLUMN "location",
ADD COLUMN     "characterId" INTEGER NOT NULL,
ADD COLUMN     "equipped" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "Equipped";

-- DropTable
DROP TABLE "Inventory";

-- DropTable
DROP TABLE "Title";

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
