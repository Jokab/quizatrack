import { prisma } from "../../db";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const quiz = await prisma.quiz.findFirst({
    include: {
      questions: {
        include: {
          questionParts: {},
        },
      },
      venue: true,
      host: true,
    },
    where: { id: Number(id) },
  });
  return quiz;
});
