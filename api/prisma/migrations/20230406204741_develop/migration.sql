/*
  Warnings:

  - You are about to drop the column `favouriteMatches` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[password]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "favouriteMatches",
ADD COLUMN     "password" TEXT;

-- CreateTable
CREATE TABLE "Fixture" (
    "id" SERIAL NOT NULL,
    "apiId" INTEGER NOT NULL,
    "referee" TEXT,
    "timezone" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "venueId" INTEGER NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "homeTeamId" INTEGER NOT NULL,
    "awayTeamId" INTEGER NOT NULL,
    "goalsId" INTEGER,
    "scoreId" INTEGER,
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "Fixture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "city" TEXT,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "long" TEXT NOT NULL,
    "short" TEXT NOT NULL,
    "elapsed" INTEGER,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "League" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "flag" TEXT,
    "season" INTEGER NOT NULL,
    "round" TEXT NOT NULL,

    CONSTRAINT "League_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "winner" BOOLEAN,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goals" (
    "id" SERIAL NOT NULL,
    "home" INTEGER,
    "away" INTEGER,

    CONSTRAINT "Goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "halftimeHome" INTEGER,
    "halftimeAway" INTEGER,
    "fulltimeHome" INTEGER,
    "fulltimeAway" INTEGER,
    "extratimeHome" INTEGER,
    "extratimeAway" INTEGER,
    "penaltyHome" INTEGER,
    "penaltyAway" INTEGER,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FixturePrediction" (
    "id" SERIAL NOT NULL,
    "fixtureId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "teamAScore" INTEGER NOT NULL,
    "teamBScore" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FixturePrediction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favourites" (
    "id" TEXT NOT NULL,
    "matchId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Favourites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fixture_apiId_key" ON "Fixture"("apiId");

-- CreateIndex
CREATE UNIQUE INDEX "Fixture_goalsId_key" ON "Fixture"("goalsId");

-- CreateIndex
CREATE UNIQUE INDEX "Fixture_scoreId_key" ON "Fixture"("scoreId");

-- CreateIndex
CREATE UNIQUE INDEX "FixturePrediction_fixtureId_userId_key" ON "FixturePrediction"("fixtureId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- AddForeignKey
ALTER TABLE "Fixture" ADD CONSTRAINT "Fixture_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixture" ADD CONSTRAINT "Fixture_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixture" ADD CONSTRAINT "Fixture_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixture" ADD CONSTRAINT "Fixture_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixture" ADD CONSTRAINT "Fixture_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixture" ADD CONSTRAINT "Fixture_goalsId_fkey" FOREIGN KEY ("goalsId") REFERENCES "Goals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixture" ADD CONSTRAINT "Fixture_scoreId_fkey" FOREIGN KEY ("scoreId") REFERENCES "Score"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixturePrediction" ADD CONSTRAINT "FixturePrediction_fixtureId_fkey" FOREIGN KEY ("fixtureId") REFERENCES "Fixture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixturePrediction" ADD CONSTRAINT "FixturePrediction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
