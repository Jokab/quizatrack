/*
  Warnings:

  - Added the required column `category` to the `question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "question" ADD COLUMN     "category" TEXT NOT NULL;
