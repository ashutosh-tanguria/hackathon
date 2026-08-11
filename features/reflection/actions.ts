"use server";


import { prisma } from "@/lib/prisma";
import { gemini } from "@/lib/gemini";
import { getCurrentUser } from "@/lib/current-user";


import {
  REFLECTION_SYSTEM_PROMPT,
} from "./prompts";


import {
  reflectionSchema,
  AIReflection,
} from "./schema";





export async function analyzeReflection(
  data: {
    goalId: string;
    reflection: string;
  }
): Promise<AIReflection> {



  const fallback: AIReflection = {

    summary:
      "Your reflection has been recorded successfully.",


    strengths: [
      "You are actively tracking your learning progress.",
    ],


    improvements: [
      "Maintain consistency and continue working on your roadmap.",
    ],


    nextAction:
      "Complete your next planned learning task.",

  };





  try {


    const user =
      await getCurrentUser();



    if (!user) {

      throw new Error(
        "Unauthorized"
      );

    }





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
${goal.description ?? "None"}



Student Reflection:

${data.reflection}



Analyze this reflection according to the student's goal.


Identify:

- Progress
- Strengths
- Weak areas
- Practical next action


Return ONLY valid JSON.

`;






    const result =
      await gemini.generateContent([

        REFLECTION_SYSTEM_PROMPT,

        prompt,

      ]);





    const text =
      result.response.text();





    return reflectionSchema.parse(

      JSON.parse(text)

    );





  } catch(error) {


    console.error(
      "Reflection analysis failed:",
      error
    );



    return fallback;


  }

}








export async function saveReflection(
  reflection: AIReflection
) {



  const user =
    await getCurrentUser();





  if (!user) {

    throw new Error(
      "Unauthorized"
    );

  }






  const created =
    await prisma.reflectionSession.create({

      data: {


        summary:
          reflection.summary,



        aiFeedback:
          JSON.stringify({

            strengths:
              reflection.strengths,


            improvements:
              reflection.improvements,


            nextAction:
              reflection.nextAction,



            recommendation:

`Focus tomorrow on:
${reflection.nextAction}


Main improvement area:
${reflection.improvements.join(", ")}


Strengths:
${reflection.strengths.join(", ")}
`,


          }),



        userId:
          user.id,


      },

    });





  return {

    success: true,

    reflection: created,

  };


}








export async function getReflections() {



  const user =
    await getCurrentUser();





  if (!user) {

    throw new Error(
      "Unauthorized"
    );

  }





  const reflections =
    await prisma.reflectionSession.findMany({

      where: {

        userId:
          user.id,

      },


      orderBy: {

        createdAt:
          "desc",

      },

    });





  return reflections;


}