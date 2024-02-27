-- DropForeignKey
ALTER TABLE "competitor" DROP CONSTRAINT "competitor_quizId_fkey";

-- DropForeignKey
ALTER TABLE "competitorAnswer" DROP CONSTRAINT "competitorAnswer_competitorId_fkey";

-- DropForeignKey
ALTER TABLE "competitorAnswer" DROP CONSTRAINT "competitorAnswer_questionPartId_fkey";

-- DropForeignKey
ALTER TABLE "question" DROP CONSTRAINT "question_quizId_fkey";

-- DropForeignKey
ALTER TABLE "questionPart" DROP CONSTRAINT "questionPart_questionId_fkey";

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questionPart" ADD CONSTRAINT "questionPart_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competitorAnswer" ADD CONSTRAINT "competitorAnswer_questionPartId_fkey" FOREIGN KEY ("questionPartId") REFERENCES "questionPart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competitorAnswer" ADD CONSTRAINT "competitorAnswer_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "competitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competitor" ADD CONSTRAINT "competitor_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
