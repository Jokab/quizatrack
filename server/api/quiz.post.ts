import { prisma } from "@/server/db";
import type { Quiz } from "~/types";

export default defineEventHandler(async (event: any) => {
  const body = await readBody<Quiz>(event);
  const quiz = await prisma.quiz.create({
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
              index: q.index,
            })),
          },
        })),
      },
    },
    include: {
      questions: {
        include: {
          questionParts: true,
        },
      },
    },
  });

  for (const c of body.competitors) {
    await prisma.competitor.create({
      data: {
        placement: c.placement,
        quiz: {
          connect: {
            id: quiz.id,
          },
        },
        team: {
          connect: {
            // TODO: hard coded
            id: 4,
          },
        },
        competitorAnswers: {
          create: c.competitorAnswers.map((a, i) => ({
            text: a.text,
            points: a.points,
            questionPart: {
              connect: {
                id: quiz.questions.flatMap(q => q.questionParts).find(qp => qp.index === i)!.id,
              },
            },
          })),
        },
      },
    });
  };

  return quiz;
});
