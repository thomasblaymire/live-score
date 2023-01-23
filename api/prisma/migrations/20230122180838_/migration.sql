/*
  Warnings:

  - You are about to drop the column `favouriteMatches` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "favouriteMatches";

-- CreateTable
CREATE TABLE "Favourites" (
    "id" TEXT NOT NULL,
    "matchId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Favourites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favourites_userId_key" ON "Favourites"("userId");
