import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const team = await prisma.team.create({
    data: {
      name: "Skruvkarbinerna",
    },
  });
  const team2 = await prisma.team.create({
    data: {
      name: "Bräckeskolan",
    },
  });

  const person1 = await prisma.person.create({ data: { name: "Jakob CG" } });
  const person2 = await prisma.person.create({ data: { name: "Linnea N" } });
  const person3 = await prisma.person.create({ data: { name: "Ellen W" } });
  const person4 = await prisma.person.create({ data: { name: "Peter E" } });

  const venues = await prisma.venue.create({
    data: {
      name: "Bamba",
      location: "Repslagaregatan 7, Göteborg",
      quizes: {
        create: [
          {
            date: new Date(),
            host: {
              create: {
                name: "David",
              },
            },
          },
        ],
      },
    },
    include: {
      quizes: true,
    },
  });

  const competitors = await prisma.competitor.create({
    data: {
      quizId: venues.quizes[0].id,
      teamId: team.id,
      teamMembers: {
        create: [
          { person: { connect: { id: person1.id } } },
          { person: { connect: { id: person2.id } } },
          { person: { connect: { id: person3.id } } },
          { person: { connect: { id: person4.id } } },
        ],
      },
    },
  });

  const competitors2 = await prisma.competitor.create({
    data: {
      quizId: venues.quizes[0].id,
      teamId: team2.id,
      teamMembers: {
        create: [
          { person: { connect: { id: person1.id } } },
          { person: { connect: { id: person2.id } } },
          { person: { connect: { id: person3.id } } },
          { person: { connect: { id: person4.id } } },
        ],
      },
    },
  });

  const question1 = await prisma.question.create({
    data: {
      index: 1,
      quiz: { connect: { id: venues.quizes[0].id } },
      questionParts: {
        create: [
          {
            text: "Var bor Jakob och Linnea?",
            answer: "Masthugget",
          },
        ],
      },
    },
  });
  const question2 = await prisma.question.create({
    data: {
      index: 2,
      quiz: { connect: { id: venues.quizes[0].id } },
      questionParts: {
        create: [
          {
            text: "Huvudstaden i Sverige?",
            answer: "Stockholm",
          },
        ],
      },
    },
  });

  await prisma.competitorAnswer.create({
    data: {
      competitorId: competitors.id,
      questionPartId: question1.id,
      points: 1,
      text: "Masthugget",
    },
  });
  await prisma.competitorAnswer.create({
    data: {
      competitorId: competitors.id,
      questionPartId: question2.id,
      points: 1,
      text: "Stockholm",
    },
  });

  await prisma.competitorAnswer.create({
    data: {
      competitorId: competitors2.id,
      questionPartId: question1.id,
      points: 2,
      text: "Ruddalen",
    },
  });
  await prisma.competitorAnswer.create({
    data: {
      competitorId: competitors2.id,
      questionPartId: question2.id,
      points: 1,
      text: "Stockholm",
    },
  });

  console.group(team2, venues);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
