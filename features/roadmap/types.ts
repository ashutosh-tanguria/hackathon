export interface RoadmapNodeAI {
  title: string;

  description: string;

  week: number;

  difficulty:
    | "BEGINNER"
    | "INTERMEDIATE"
    | "ADVANCED";
}

export interface AIRoadmap {
  title: string;

  estimatedWeeks: number;

  nodes: RoadmapNodeAI[];
}