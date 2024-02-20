export interface Team {
  id: number;
  name: string;
  competitors: Competitor[];
};

export interface Venue {
  id: number;
  name: string;
  location: string;
  quizes: Quiz[];
};

export interface Quiz {
  id: number;
  date: Date;
  host: Host;
  venue: Venue;
  questions: Question[];
  competitors: Competitor[];
};

export interface Host {
  name: string;
};

export interface Question {
  id: number;
  index: number;
  questionParts: QuestionPart[];
};
export interface QuestionPart {
  id: number;
  text: string;
  index: number;
  answer: string;
  points: number;
  // question: Question;
};
export interface CreateQuestionPart {
  text: string;
  index: number;
  answer: string;
  points: number;
};
export interface Competitor {
  id: number;
  team: Team;
  quiz: Quiz;
  teamMembers: TeamMember[];
  competitorAnswers: CompetitorAnswer[];
  placement: number;
};
export interface CompetitorAnswer {
  text: string;
  points: number;
  question: QuestionPart;
  competitor: Competitor;
};
export interface CreateCompetitorAnswer {
  text: string;
  points: number;
};
export interface TeamMember {
  competitor: Competitor;
  person: Person;
};
export interface Person {
  name: string;
}

export interface PastQuizesRow {
  id: number;
  date: string;
  maxPoints: number;
  receivedPoints: number;
  placement: number;
}
