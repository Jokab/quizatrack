/*
  Warnings:

  - You are about to drop the `teams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `venues` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "teams";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "venues";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "venue" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "quiz" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "venueId" INTEGER NOT NULL,
    "hostId" INTEGER NOT NULL,
    CONSTRAINT "quiz_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venue" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "quiz_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "host" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "host" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "index" TEXT NOT NULL,
    "quizId" INTEGER NOT NULL,
    CONSTRAINT "question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quiz" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "questionPart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "index" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    CONSTRAINT "questionPart_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "answer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "questionPartId" INTEGER NOT NULL,
    "competitorId" INTEGER NOT NULL,
    CONSTRAINT "answer_questionPartId_fkey" FOREIGN KEY ("questionPartId") REFERENCES "questionPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "answer_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "competitor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "competitor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamId" INTEGER NOT NULL,
    "quizId" INTEGER NOT NULL,
    CONSTRAINT "competitor_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "competitor_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quiz" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "teamMember" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "competitorId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,
    CONSTRAINT "teamMember_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "competitor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "teamMember_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "person" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
