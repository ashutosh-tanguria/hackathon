import { z } from "zod";

export const createGoalSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),

  category: z.enum([
    "SCHOOL",
    "JEE",
    "NEET",
    "UPSC",
    "PROGRAMMING",
    "AI_ML",
    "CUSTOM",
  ]),
});

export type CreateGoalInput = z.infer<typeof createGoalSchema>;