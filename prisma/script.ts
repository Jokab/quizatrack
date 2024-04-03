import fs from "node:fs";
import { Prisma, PrismaClient } from "@prisma/client";
import { parse } from "csv-parse/sync";

const prisma = new PrismaClient();

async function main() {
  const team = await prisma.team.create({
    data: {
      name: "Skruvkarbinerna",
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
      placement: 2,
    },
  });

  const __dirname = new URL(".", import.meta.url).pathname;

  const data = fs.readFileSync(`${__dirname}/questions.csv`, "utf8");
  const records = parse(data, {
    columns: true,
  });
  const questions = [];
  for (const q of records) {
    if (q.Text2 === "") {
      questions.push({
        text: q.Text1,
        answer: q.Answer1,
      });
    }
    else {
      questions.push({
        questionParts: [
          {
            text: q.Text1,
            answer: q.Answer1,
            index: 0,
            points: 0.2,
          },
          {
            text: q.Text2,
            answer: q.Answer2,
            index: 1,
            points: 0.5,
          },
        ],
      },
      );
    }
  }
  console.log(records);
  for (const [index, question] of questions.entries()) {
    const q = await prisma.question.create({
      data: {
        index,
        quiz: { connect: { id: venues.quizes[0].id } },
        questionParts: {
          create: question.questionParts
            ? question.questionParts.map(x =>
              ({
                text: x.text,
                answer: x.answer,
                points: new Prisma.Decimal(x.points),
              }))
            : [{
                text: question.text,
                answer: question.answer,
                points: new Prisma.Decimal(1),
              }],
        },
      },
      include: {
        questionParts: true,
      },
    });
    await prisma.competitorAnswer.create({
      data: {
        competitorId: competitors.id,
        questionPartId: q.id,
        points: new Prisma.Decimal(1),
        text: q.questionParts[0].answer,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    // eslint-disable-next-line node/prefer-global/process
    process.exit(1);
  });
