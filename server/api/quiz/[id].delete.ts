import { prisma } from "../../db";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  await prisma.quiz.delete({
    where: {
      id: Number(id),
    },
  });
});
