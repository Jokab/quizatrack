import { prisma } from "../../db";

// interface Competitor {
//   quizId: number;

// }

// interface TeamMember {
//   name: string;
//   competitorId: string;
// }

// interface Team {
//   id: string;
//   name: string;
//   competitors: Competitor[]
// }

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const team = await prisma.team.findFirst({
    where: { id: Number(id) },
    select: {
      id: true,
      name: true,
      competitors: {
        select: {
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
                      text: true,
                      answer: true
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
  return team;
});
