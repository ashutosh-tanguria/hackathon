import { z } from "zod";

export const roadmapNodeSchema = z.object({
  title: z.string(),
  description: z.string(),
  week: z.number(),
  difficulty: z.enum([
    "BEGINNER",
    "INTERMEDIATE",
    "ADVANCED",
  ]),
});

export const roadmapSchema = z.object({
  title: z.string(),
  estimatedWeeks: z.number(),
  nodes: z.array(roadmapNodeSchema),
});

export type AIRoadmap = z.infer<typeof roadmapSchema>;