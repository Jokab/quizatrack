import { prisma } from "../../db";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const team = await prisma.team.findFirst({
    where: { id: Number(id) },
    select: {
      id: true,
      name: true,
      competitors: {
        select: {
          id: true,
          placement: true,
          teamMembers: {
            select: {
              person: {
                select: {
                  name: true
                }
              }
            }
          },
          competitorAnswer: {
            select: {
              text: true,
              points: true
            }
          },
          quiz: {
            select: {
              id: true,
              date: true,
              host: {
                select: {
                  name: true
                }
              },
              venue: {
                select: {
                  name: true
                }
              },
              questions: {
                select: {
                  questionParts: {
                    select: {
                      id: true,
                      text: true,
                      answer: true,
                      points: true
                    }
                  },
                  index: true
                }
              }
            }
          }
        }
      },
    }
  });

  // const totalPoints = team?.competitors.forEach(x => {
  //   x.quiz = aa
  // });

  // const quizCompetitors = await prisma.competitor.findMany({
  //   where: {
  //     quizId: {
  //       in: team?.competitors.map(x => x.quiz.id)
  //     }
  //   },
  //   select: {
  //     id: true,
  //     competitorAnswer: {
  //       select: {
  //         text: true,
  //         points: true
  //       }
  //     },
  //   }
  // })

  // const result = team as unknown as Team;
  // result.competitors.forEach(comp => {
  //   const sortedPoints = quizCompetitors.flatMap(x => ({
  //     points: x.competitorAnswer.map(y => y.points).reduce((x, y) => x + y),
  //     id: x.id
  //   })).sort(x => x.points).reverse()
  //   comp.placement = sortedPoints.map(y => y.id).indexOf(comp.id) + 1;
  // });
  return team;
});
