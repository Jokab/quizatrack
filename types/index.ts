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
    id: number;
    date: Date;
    host: Host;
    venue: Venue;
    questions: Question[];
}

export type Host = {
    name: string;
}

export type Question = {
    id: number;
    questionParts: QuestionPart[];
}
export type QuestionPart = {
    id: string;
    text: string;
    index: number;
    answer: string;
    points: number;
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