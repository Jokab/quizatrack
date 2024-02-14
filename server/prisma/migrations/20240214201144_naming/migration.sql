/*
  Warnings:

  - You are about to drop the column `placement` on the `competitor` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_competitor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamId" INTEGER NOT NULL,
    "quizId" INTEGER NOT NULL,
    CONSTRAINT "competitor_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "competitor_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quiz" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_competitor" ("id", "quizId", "teamId") SELECT "id", "quizId", "teamId" FROM "competitor";
DROP TABLE "competitor";
ALTER TABLE "new_competitor" RENAME TO "competitor";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
