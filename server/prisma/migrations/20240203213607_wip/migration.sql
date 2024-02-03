/*
  Warnings:

  - The primary key for the `teamMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `teamMember` table. All the data in the column will be lost.
  - Added the required column `name` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `host` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_person" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_person" ("id") SELECT "id" FROM "person";
DROP TABLE "person";
ALTER TABLE "new_person" RENAME TO "person";
CREATE TABLE "new_teamMember" (
    "competitorId" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,

    PRIMARY KEY ("competitorId", "personId"),
    CONSTRAINT "teamMember_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "competitor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "teamMember_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_teamMember" ("competitorId", "personId") SELECT "competitorId", "personId" FROM "teamMember";
DROP TABLE "teamMember";
ALTER TABLE "new_teamMember" RENAME TO "teamMember";
CREATE TABLE "new_host" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_host" ("id") SELECT "id" FROM "host";
DROP TABLE "host";
ALTER TABLE "new_host" RENAME TO "host";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
