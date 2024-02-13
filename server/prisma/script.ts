import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const questions = [
  {
    text: "Vem gör låten som spelas?",
    answer: "Scooter",
  },
  {
    text: "Var är Max hamburgare grundat?",
    answer: "Gällivare",
  },
  {
    text: "Nånting 2021",
    answer: "2021",
  },
  {
    text: "Vad heter gorillan i Mario-spelen?",
    answer: "Donkey Kong",
  },
  {
    text: "Invasiv art som finns i norra Sverige, från Asien?",
    answer: "Mårdhund",
  },
  {
    text: "Vilken frukt säljer Chiquita förutom Ananas?",
    answer: "Banan",
  },
  {
    text: "Vad säger Gandalf för att öppna porten till Moria?",
    answer: "Mellon",
  },
  {
    text: "Vad är Nya Zeelands nationalfågel?",
    answer: "Kiwi",
  },
  {
    text: "Vad heter Fool's Gardens låt?",
    answer: "Lemon Tree",
  },
  {
    text: "Vad heter SVT:s spel-app?",
    answer: "Duo",
  },
  {
    text: "Vad sökes på fråga 1-10?",
    answer: "Hooja",
  },
  {
    text: "Vem vann jerringpriset?",
    answer: "Ebba Andersson",
  },
  {
    text: "Vem gör de fyra låtarna i pausen?",
    answer: "The Animals",
  },
  {
    text: "Vad är anagramet 'bilda om ål'?",
    answer: "Mobillåda",
  },
  {
    text: "Varifrån kommer citatet 'There is something rotten in the state of Denmark'?",
    answer: "Hamlet",
  },
  {
    text: "Vad heter Bamses farmor?",
    answer: "Augusta Beata",
  },
  {
    text: "Var heter stället där farmor bor?",
    answer: "Höga berget",
  },
  {
    text: "Vad skämtade Ralf Edström att den albanske läkaren hette?",
    answer: "Doktor Alban",
  },
  {
    text: "Vilken dokumentärfilmare släppte nyss en dokumentär om sig själv?",
    answer: "Tom Ahland",
  },
  {
    questionParts: [
      {
        text: "Vad heter Markus Lantz projekt?",
        answer: "Munin",
        index: 0,
        points: 0.5,
      },
      {
        text: "Vad heter laboratoriet Lantz jobbar i?",
        answer: "Columbus",
        index: 1,
        points: 0.5,
      },
    ],
  },
  {
    text: "Vad heter huvudstaden i Uruguay?",
    answer: "Montevideo",
  },
  {
    text: "Vilket lag vann herrarnas handbolls-EM?",
    answer: "Frankrike",
  },
  {
    questionParts: [
      {
        text: "Vilket killnamn var vanligast i Sverige 2023?",
        answer: "Hugo",
        index: 0,
        points: 0.5,
      },
      {
        text: "Vilket tjejnamn var vanligast i Sverige 2023?",
        answer: "Elsa",
        index: 1,
        points: 0.5,
      },
    ],
  },
  {
    questionParts: [
      {
        text: "Vilket land kommer Luis Figo från?",
        answer: "Portugal",
        index: 0,
        points: 0.5,
      },
      {
        text: "Vilket bilmärke har modellen Sedan?",
        answer: "Ford",
        index: 1,
        points: 0.5,
      },
    ],
  },
  {
    questionParts: [
      {
        text: "Vilket programmeringsspråk är lika svårt att läsa som att skriva, jättesvårt?",
        answer: "Brainfuck",
        index: 0,
        points: 0.5,
      },
      {
        text: "Vilket är det giftigaste programmeringsspråket?",
        answer: "Python",
        index: 1,
        points: 0.5,
      },
    ],
  },
  {
    text: "Vilken sorts möbel är Stockholm hos IKEA?",
    answer: "Säng",
  },
];

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
