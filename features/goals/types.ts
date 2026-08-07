export interface Goal {
  id: string;

  title: string;

  description: string | null;

  category:
    | "SCHOOL"
    | "JEE"
    | "NEET"
    | "UPSC"
    | "PROGRAMMING"
    | "AI_ML"
    | "CUSTOM";

  createdAt: Date;

  roadmap?: {
    id: string;
  } | null;
}