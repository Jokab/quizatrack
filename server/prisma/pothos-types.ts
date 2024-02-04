/* eslint-disable */
import type { Prisma, venue, quiz, host, question, questionPart, competitorAnswer, competitor, teamMember, person, team } from "@prisma/client";
export default interface PrismaTypes {
    venue: {
        Name: "venue";
        Shape: venue;
        Include: Prisma.venueInclude;
        Select: Prisma.venueSelect;
        OrderBy: Prisma.venueOrderByWithRelationInput;
        WhereUnique: Prisma.venueWhereUniqueInput;
        Where: Prisma.venueWhereInput;
        Create: {};
        Update: {};
        RelationName: "quizes";
        ListRelations: "quizes";
        Relations: {
            quizes: {
                Shape: quiz[];
                Name: "quiz";
            };
        };
    };
    quiz: {
        Name: "quiz";
        Shape: quiz;
        Include: Prisma.quizInclude;
        Select: Prisma.quizSelect;
        OrderBy: Prisma.quizOrderByWithRelationInput;
        WhereUnique: Prisma.quizWhereUniqueInput;
        Where: Prisma.quizWhereInput;
        Create: {};
        Update: {};
        RelationName: "venue" | "host" | "questions" | "competitors";
        ListRelations: "questions" | "competitors";
        Relations: {
            venue: {
                Shape: venue;
                Name: "venue";
            };
            host: {
                Shape: host;
                Name: "host";
            };
            questions: {
                Shape: question[];
                Name: "question";
            };
            competitors: {
                Shape: competitor[];
                Name: "competitor";
            };
        };
    };
    host: {
        Name: "host";
        Shape: host;
        Include: Prisma.hostInclude;
        Select: Prisma.hostSelect;
        OrderBy: Prisma.hostOrderByWithRelationInput;
        WhereUnique: Prisma.hostWhereUniqueInput;
        Where: Prisma.hostWhereInput;
        Create: {};
        Update: {};
        RelationName: "quizes";
        ListRelations: "quizes";
        Relations: {
            quizes: {
                Shape: quiz[];
                Name: "quiz";
            };
        };
    };
    question: {
        Name: "question";
        Shape: question;
        Include: Prisma.questionInclude;
        Select: Prisma.questionSelect;
        OrderBy: Prisma.questionOrderByWithRelationInput;
        WhereUnique: Prisma.questionWhereUniqueInput;
        Where: Prisma.questionWhereInput;
        Create: {};
        Update: {};
        RelationName: "quiz" | "questionParts";
        ListRelations: "questionParts";
        Relations: {
            quiz: {
                Shape: quiz;
                Name: "quiz";
            };
            questionParts: {
                Shape: questionPart[];
                Name: "questionPart";
            };
        };
    };
    questionPart: {
        Name: "questionPart";
        Shape: questionPart;
        Include: Prisma.questionPartInclude;
        Select: Prisma.questionPartSelect;
        OrderBy: Prisma.questionPartOrderByWithRelationInput;
        WhereUnique: Prisma.questionPartWhereUniqueInput;
        Where: Prisma.questionPartWhereInput;
        Create: {};
        Update: {};
        RelationName: "question" | "competitorAnswers";
        ListRelations: "competitorAnswers";
        Relations: {
            question: {
                Shape: question;
                Name: "question";
            };
            competitorAnswers: {
                Shape: competitorAnswer[];
                Name: "competitorAnswer";
            };
        };
    };
    competitorAnswer: {
        Name: "competitorAnswer";
        Shape: competitorAnswer;
        Include: Prisma.competitorAnswerInclude;
        Select: Prisma.competitorAnswerSelect;
        OrderBy: Prisma.competitorAnswerOrderByWithRelationInput;
        WhereUnique: Prisma.competitorAnswerWhereUniqueInput;
        Where: Prisma.competitorAnswerWhereInput;
        Create: {};
        Update: {};
        RelationName: "questionPart" | "competitor";
        ListRelations: never;
        Relations: {
            questionPart: {
                Shape: questionPart;
                Name: "questionPart";
            };
            competitor: {
                Shape: competitor;
                Name: "competitor";
            };
        };
    };
    competitor: {
        Name: "competitor";
        Shape: competitor;
        Include: Prisma.competitorInclude;
        Select: Prisma.competitorSelect;
        OrderBy: Prisma.competitorOrderByWithRelationInput;
        WhereUnique: Prisma.competitorWhereUniqueInput;
        Where: Prisma.competitorWhereInput;
        Create: {};
        Update: {};
        RelationName: "team" | "quiz" | "teamMembers" | "competitorAnswer";
        ListRelations: "teamMembers" | "competitorAnswer";
        Relations: {
            team: {
                Shape: team;
                Name: "team";
            };
            quiz: {
                Shape: quiz;
                Name: "quiz";
            };
            teamMembers: {
                Shape: teamMember[];
                Name: "teamMember";
            };
            competitorAnswer: {
                Shape: competitorAnswer[];
                Name: "competitorAnswer";
            };
        };
    };
    teamMember: {
        Name: "teamMember";
        Shape: teamMember;
        Include: Prisma.teamMemberInclude;
        Select: Prisma.teamMemberSelect;
        OrderBy: Prisma.teamMemberOrderByWithRelationInput;
        WhereUnique: Prisma.teamMemberWhereUniqueInput;
        Where: Prisma.teamMemberWhereInput;
        Create: {};
        Update: {};
        RelationName: "competitor" | "person";
        ListRelations: never;
        Relations: {
            competitor: {
                Shape: competitor;
                Name: "competitor";
            };
            person: {
                Shape: person;
                Name: "person";
            };
        };
    };
    person: {
        Name: "person";
        Shape: person;
        Include: Prisma.personInclude;
        Select: Prisma.personSelect;
        OrderBy: Prisma.personOrderByWithRelationInput;
        WhereUnique: Prisma.personWhereUniqueInput;
        Where: Prisma.personWhereInput;
        Create: {};
        Update: {};
        RelationName: "teamMembers";
        ListRelations: "teamMembers";
        Relations: {
            teamMembers: {
                Shape: teamMember[];
                Name: "teamMember";
            };
        };
    };
    team: {
        Name: "team";
        Shape: team;
        Include: Prisma.teamInclude;
        Select: Prisma.teamSelect;
        OrderBy: Prisma.teamOrderByWithRelationInput;
        WhereUnique: Prisma.teamWhereUniqueInput;
        Where: Prisma.teamWhereInput;
        Create: {};
        Update: {};
        RelationName: "competitors";
        ListRelations: "competitors";
        Relations: {
            competitors: {
                Shape: competitor[];
                Name: "competitor";
            };
        };
    };
}