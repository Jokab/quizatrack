import { prisma } from "@/server/db";
import type { Quiz } from "~/types";

export default defineEventHandler(async (event: any) => {
  const body = await readBody<Quiz>(event);
  const q = {
    data: {
      date: body.date,
      venue: {
        create: {
          location: body.venue.location,
          name: "apa", // body.venue.name,
        },
      },
      host: {
        create: {
          name: body.host.name,
        },
      },
      questions: {
        create: body.questions.map(q => ({
          index: q.index,
          questionParts: {
            create: q.questionParts.map(qp => ({
              text: qp.text,
              answer: qp.answer,
              points: 1,
              index: 1,
            })),
          },
        })),
      },
    },
  };
  const quiz = await prisma.quiz.create(q);
  return quiz;
});
