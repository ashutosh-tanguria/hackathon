import { z } from "zod";

export const reflectionSchema = z.object({
  summary: z.string(),

  strengths: z.array(
    z.string()
  ),

  improvements: z.array(
    z.string()
  ),

  nextAction: z.string(),
});

export type AIReflection =
  z.infer<
    typeof reflectionSchema
  >;