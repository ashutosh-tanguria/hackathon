export type SkillLevel =
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED";

export interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
}

export interface AssessmentAnswer {
  questionId: number;
  answer: string;
}

export interface AssessmentResult {
  level: SkillLevel;
  strengths: string[];
  weaknesses: string[];
}