export interface PracticeQuestion {
  question: string;
  options: string[];
}


export interface PracticeQuestionsResponse {
  questions: PracticeQuestion[];
}


export interface PracticeSubmission {
  questions: PracticeQuestion[];
  answers: string[];
}


export interface PracticeResult {
  score: number;
  strengths: string[];
  improvements: string[];
  feedback: string;
}