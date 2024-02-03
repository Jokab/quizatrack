import { prisma } from "@/server/db";

export default defineEventHandler(async (_) => {
  const quizes = await prisma.quiz.findMany({
    include: { questions: { include: { questionParts: {} } } },
  });
  return quizes;
});
