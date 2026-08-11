"use server";

import { gemini } from "@/lib/gemini";

import { assessmentSchema } from "./schema";
import { SYSTEM_PROMPT } from "./prompts";

import { prisma } from "@/lib/prisma";


export async function evaluateAssessment(
  data: {
    goalId: string;
    answers: unknown;
  }
) {


  const validated =
    assessmentSchema.parse({
      answers: data.answers,
    });



  const goal =
    await prisma.goal.findUnique({

      where: {
        id: data.goalId,
      },

    });



  if (!goal) {

    throw new Error(
      "Goal not found"
    );

  }




  const prompt = `

Student Goal:

Title:
${goal.title}


Category:
${goal.category}


Description:
${goal.description ?? "No description provided"}



Student Answers:

${JSON.stringify(
  validated.answers,
  null,
  2
)}



Evaluate the student specifically for this goal.


Consider:
- Current understanding of this domain
- Practical ability
- Missing foundations
- Next learning requirements


Return ONLY valid JSON.

`;



  const result =
    await gemini.generateContent([

      SYSTEM_PROMPT,

      prompt,

    ]);



  const response =
    result.response.text();



  return JSON.parse(
    response
  );

}