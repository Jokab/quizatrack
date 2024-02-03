/*
  Warnings:

  - You are about to alter the column `index` on the `question` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `index` on the `questionPart` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "index" INTEGER NOT NULL,
    "quizId" INTEGER NOT NULL,
    CONSTRAINT "question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quiz" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_question" ("id", "index", "quizId") SELECT "id", "index", "quizId" FROM "question";
DROP TABLE "question";
ALTER TABLE "new_question" RENAME TO "question";
CREATE TABLE "new_questionPart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    CONSTRAINT "questionPart_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_questionPart" ("answer", "id", "index", "questionId", "text") SELECT "answer", "id", "index", "questionId", "text" FROM "questionPart";
DROP TABLE "questionPart";
ALTER TABLE "new_questionPart" RENAME TO "questionPart";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
