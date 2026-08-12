"use server";


import { gemini } from "@/lib/gemini";

import {
  assessmentSchema,
} from "./schema";


import {
  SYSTEM_PROMPT,
} from "./prompts";


import {
  prisma,
} from "@/lib/prisma";





export async function evaluateAssessment(
  data: {
    goalId: string;
    answers: unknown;
  }
) {


  const fallback = {

    level:
      "Beginner",

    strengths: [
      "You have started evaluating your learning path.",
    ],

    weaknesses: [
      "Continue building practical foundations.",
    ],

    recommendations: [
      "Follow your personalized roadmap consistently.",
    ],

  };





  try {



    const validated =
      assessmentSchema.parse({

        answers:
          data.answers,

      });






    const goal =
      await prisma.goal.findUnique({

        where: {

          id:
            data.goalId,

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

- Current understanding
- Practical ability
- Missing foundations
- Next learning requirements


Return ONLY valid JSON.

`;






    const result =
      await gemini.models.generateContent({

        model: "gemini-3.6-flash",

        contents: [
          {
            role: "user",
            parts: [
              {
                text:
                  SYSTEM_PROMPT + "\n" + prompt,
              },
            ],
          },
        ],

      });


    const text = result.text;

    if (!text) {
      throw new Error(
        "Empty Gemini response"
      );
    }

    return JSON.parse(text);

  } catch (error) {


    console.error(
      "Assessment evaluation failed:",
      error
    );



    return fallback;


  }

}