import { z } from "zod";

export const assessmentSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.number(),
      answer: z.string().min(1),
    })
  ),
});

export type AssessmentInput =
  z.infer<typeof assessmentSchema>;