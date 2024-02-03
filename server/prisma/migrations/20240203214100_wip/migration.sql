/*
  Warnings:

  - You are about to drop the `answer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `answer` to the `questionPart` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "answer";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "competitorAnswer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "questionPartId" INTEGER NOT NULL,
    "competitorId" INTEGER NOT NULL,
    CONSTRAINT "competitorAnswer_questionPartId_fkey" FOREIGN KEY ("questionPartId") REFERENCES "questionPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "competitorAnswer_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "competitor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_questionPart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "index" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    CONSTRAINT "questionPart_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_questionPart" ("id", "index", "questionId", "text") SELECT "id", "index", "questionId", "text" FROM "questionPart";
DROP TABLE "questionPart";
ALTER TABLE "new_questionPart" RENAME TO "questionPart";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
