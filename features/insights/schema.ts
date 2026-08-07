import { z } from "zod";

export const insightSchema = z.object({
  title: z.string(),
  insight: z.string(),
  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
  ]),
});

export type AIInsight =
  z.infer<typeof insightSchema>;