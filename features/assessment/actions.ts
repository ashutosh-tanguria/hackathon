"use server";

import { gemini } from "@/lib/gemini";

import { assessmentSchema } from "./schema";
import { SYSTEM_PROMPT } from "./prompts";

export async function evaluateAssessment(
  data: unknown
) {
  const validated = assessmentSchema.parse(data);

  const prompt = `
Student Answers:

${JSON.stringify(validated.answers, null, 2)}

Evaluate the student.

Return ONLY valid JSON.
`;

  const result = await gemini.generateContent([
    SYSTEM_PROMPT,
    prompt,
  ]);

  const response = result.response.text();

  return JSON.parse(response);
}