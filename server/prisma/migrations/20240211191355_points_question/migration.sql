/*
  Warnings:

  - Added the required column `points` to the `questionPart` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_questionPart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "index" INTEGER,
    "questionId" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    CONSTRAINT "questionPart_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_questionPart" ("answer", "id", "index", "questionId", "text") SELECT "answer", "id", "index", "questionId", "text" FROM "questionPart";
DROP TABLE "questionPart";
ALTER TABLE "new_questionPart" RENAME TO "questionPart";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
