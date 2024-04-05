import fs from "node:fs";
import { Prisma, PrismaClient } from "@prisma/client";
import { parse } from "csv-parse/sync";

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe("TRUNCATE public.venue CASCADE;");
  await prisma.$executeRawUnsafe("TRUNCATE public.quiz CASCADE;");
  await prisma.$executeRawUnsafe("TRUNCATE public.host CASCADE;");
  await prisma.$executeRawUnsafe("TRUNCATE public.team CASCADE;");
  await prisma.$executeRawUnsafe("TRUNCATE public.person CASCADE;");
  // Insert teams
  const team = await prisma.team.create({
    data: {
      name: "Skruvkarbinerna",
    },
  });

  // Insert persons
  const person1 = await prisma.person.create({ data: { name: "Jakob CG" } });
  const person2 = await prisma.person.create({ data: { name: "Linnea N" } });
  const person3 = await prisma.person.create({ data: { name: "Ellen W" } });
  const person4 = await prisma.person.create({ data: { name: "Peter E" } });

  // Insert venue and host
  const bambaVenue = await prisma.venue.create({
    data: {
      name: "Bamba",
      location: "Repslagaregatan 7, Göteborg",
    },
  });

  // Read questions from CSV
  const quizFileDates = ["2024-01-24", "2024-02-21", "2024-03-06"];
  const __dirname = new URL(".", import.meta.url).pathname;
  for (const date of quizFileDates) {
    // Insert quiz for date
    const quiz = await prisma.quiz.create({
      data: {
        date: new Date(date),
        venue: { connect: { id: bambaVenue.id } },
        host: {
          create: {
            name: "David",
          },
        },
      },
    });

    // Insert competitors for quiz
    const competitors = await prisma.competitor.create({
      data: {
        quizId: quiz.id,
        teamId: team.id,
        teamMembers: {
          create: [
            { person: { connect: { id: person1.id } } },
            { person: { connect: { id: person2.id } } },
            { person: { connect: { id: person3.id } } },
            { person: { connect: { id: person4.id } } },
          ],
        },
        placement: 1,
      },
    });
    await insertQuizAndAnswersFromFile(`${__dirname}/${date}.csv`, competitors.id, quiz.id);
  }
}

async function insertQuizAndAnswersFromFile(fileName: string, competitorId: number, quizId: number) {
  const data = fs.readFileSync(fileName, "utf8");
  const records = parse(data, {
    columns: true,
  });
  const questions = [];
  for (const q of records) {
    if (q.Text2 === "") {
      questions.push([
        {
          text: q.Text1,
          answer: q.Answer1,
          index: 0,
          points: 1,
          correct: q.Correct1,
          category: q.Category,
        },
      ]);
    }
    else {
      questions.push(
        [
          {
            text: q.Text1,
            answer: q.Answer1,
            index: 0,
            points: 0.5,
            correct: q.Correct1,
            category: q.Category,
          },
          {
            text: q.Text2,
            answer: q.Answer2,
            index: 1,
            points: 0.5,
            correct: q.Correct2,
            category: q.Category,
          },
        ],
      );
    }
  }

  // Insert questions and competitor answers
  for (const [index, questionParts] of questions.entries()) {
    const mappedParts = questionParts.map(x =>
      ({
        text: x.text,
        answer: x.correct,
        points: new Prisma.Decimal(x.points),
        category: x.category,
      }));
    const insertedQuestion = await prisma.question.create({
      data: {
        index,
        quiz: { connect: { id: quizId } },
        questionParts: {
          create: mappedParts,
        },
      },
      include: {
        questionParts: true,
      },
    });

    for (const [index, qp] of insertedQuestion.questionParts.entries()) {
      await prisma.competitorAnswer.create({
        data: {
          competitorId,
          questionPartId: qp.id,
          points: questionParts[index].answer === qp.answer ? qp.points : 0,
          text: questionParts[index].correct,
        },
      });
    }
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
