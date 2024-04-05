/*
  Warnings:

  - You are about to drop the column `category` on the `question` table. All the data in the column will be lost.
  - Added the required column `category` to the `questionPart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "question" DROP COLUMN "category";

-- AlterTable
ALTER TABLE "questionPart" ADD COLUMN     "category" TEXT NOT NULL;
