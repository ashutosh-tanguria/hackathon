"use server";


import { prisma } from "@/lib/prisma";
import { gemini } from "@/lib/gemini";
import { getCurrentUser } from "@/lib/current-user";


import { INSIGHT_SYSTEM_PROMPT } from "./prompts";

import {
  AIInsight,
  insightSchema,
} from "./schema";



export async function generateInsight(): Promise<AIInsight> {


  const fallback: AIInsight = {

    title:
      "Keep building consistency",

    insight:
      "Complete your roadmap tasks and maintain regular study sessions to improve your progress.",

    priority:
      "MEDIUM",

  };



  try {


    const user =
      await getCurrentUser();



    if (!user) {

      return fallback;

    }




    const [
      goal,
      reflections,
      sessions,
    ] =
      await Promise.all([


        prisma.goal.findFirst({

          where: {
            userId: user.id,
          },


          orderBy: {
            createdAt: "desc",
          },


          include: {

            roadmap: {

              include: {
                nodes: true,
              },

            },

          },

        }),




        prisma.reflectionSession.findMany({

          where: {
            userId: user.id,
          },


          orderBy: {
            createdAt: "desc",
          },


          take: 3,

        }),




        prisma.learningSession.findMany({

          where: {
            userId: user.id,
          },


          orderBy: {
            createdAt: "desc",
          },


          take: 5,

        }),


      ]);






   const completed =
  goal?.roadmap?.nodes.filter(
    (node: { completed: boolean }) =>
      node.completed
  ).length ?? 0;



    const total =
      goal?.roadmap?.nodes.length ?? 0;



    const nextNode =
  goal?.roadmap?.nodes.find(
    (node: { completed: boolean }) =>
      !node.completed
  );





    const reflectionContext =
  reflections
    .map(
      (reflection: { summary: string | null }) =>
        reflection.summary
    )
    .filter(Boolean)
    .join("\n");






    const prompt = `

Student Learning Context:

Goal:
${goal?.title ?? "No goal"}

Category:
${goal?.category ?? "Unknown"}

Roadmap:
${completed}/${total} completed

Next Task:
${nextNode?.title ?? "None"}

Recent Reflections:
${reflectionContext || "None"}

Study Sessions:
${sessions.length}



Generate one personalized insight.

Focus:
- Progress
- Weak areas
- Consistency
- Next action

Return ONLY valid JSON.

`;





    const result =
      await gemini.models.generateContent({

        model: "gemini-3.5-flash-lite",

        contents: [
          {
            role: "user",
            parts: [
              {
                text:
                  INSIGHT_SYSTEM_PROMPT +
                  "\n" +
                  prompt,
              },
            ],
          },
        ],

      });


    const text =
      result.text;


    if (!text) {
      throw new Error(
        "Empty Gemini response"
      );
    }



    return insightSchema.parse(
      JSON.parse(text)
    );



  } catch (error) {


    console.error(
      "Insight generation failed:",
      error
    );


    return fallback;


  }


}