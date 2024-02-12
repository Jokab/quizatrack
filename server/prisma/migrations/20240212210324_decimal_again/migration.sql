/*
  Warnings:

  - You are about to alter the column `points` on the `competitorAnswer` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Decimal`.
  - You are about to alter the column `points` on the `questionPart` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Decimal`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_competitorAnswer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "points" DECIMAL NOT NULL,
    "questionPartId" INTEGER NOT NULL,
    "competitorId" INTEGER NOT NULL,
    CONSTRAINT "competitorAnswer_questionPartId_fkey" FOREIGN KEY ("questionPartId") REFERENCES "questionPart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "competitorAnswer_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "competitor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_competitorAnswer" ("competitorId", "id", "points", "questionPartId", "text") SELECT "competitorId", "id", "points", "questionPartId", "text" FROM "competitorAnswer";
DROP TABLE "competitorAnswer";
ALTER TABLE "new_competitorAnswer" RENAME TO "competitorAnswer";
CREATE TABLE "new_questionPart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "index" INTEGER,
    "questionId" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "points" DECIMAL NOT NULL,
    CONSTRAINT "questionPart_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_questionPart" ("answer", "id", "index", "points", "questionId", "text") SELECT "answer", "id", "index", "points", "questionId", "text" FROM "questionPart";
DROP TABLE "questionPart";
ALTER TABLE "new_questionPart" RENAME TO "questionPart";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
