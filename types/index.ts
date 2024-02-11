export type Team = {
    id: number;
    name: string;
    competitors: Competitor[]
}

export type Venue = {
    id: number;
    name: string;
    location: string;
    quizes: Quiz[];
}

export type Quiz = {
    date: Date;
    host: Host[];
    venue: Venue;
    questions: Question[];
}

export type Host = {
    name: string;
}

export type Question = {
    questionParts: QuestionPart[];
}
export type QuestionPart = {
    text: string;
    index: number;
    answer: string;
    question: Question;
}
export type Competitor = {
    id: number;
    team: Team;
    quiz: Quiz;
    teamMembers: TeamMember[];
    competitorAnswer: CompetitorAnswer[];
    placement: number;
}
export type CompetitorAnswer = {
    text: string;
    points: number;
    question: QuestionPart;
    competitor: Competitor;
}
export type TeamMember = {
    competitor: Competitor;
    person: Person;
}
export type Person = {
    name: string;
}