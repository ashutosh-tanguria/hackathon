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

  const user =
    await getCurrentUser();


  if (!user) {
    throw new Error(
      "Unauthorized"
    );
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
      (node) =>
        node.completed
    ).length ?? 0;



  const total =
    goal?.roadmap?.nodes.length ?? 0;



  const nextNode =
    goal?.roadmap?.nodes.find(
      (node) =>
        !node.completed
    );



  const reflectionContext =
    reflections
      .map(
        (reflection) =>
          reflection.summary
      )
      .filter(Boolean)
      .join("\n");



  const sessionCount =
    sessions.length;



  const prompt = `

Student Learning Context:


Current Goal:

${goal?.title ?? "No goal created"}


Category:

${goal?.category ?? "Unknown"}


Roadmap Progress:

${completed}/${total} completed


Next Learning Task:

${nextNode?.title ?? "No pending task"}


Recent Reflections:

${reflectionContext || "No reflections yet"}


Recent Study Sessions:

${sessionCount}



Generate one personalized insight.

Focus on:
- Progress
- Weak areas
- Consistency
- Next practical action

`;



  const result =
    await gemini.generateContent([

      INSIGHT_SYSTEM_PROMPT,

      prompt,

    ]);



  const text =
    result.response.text();



  return insightSchema.parse(
    JSON.parse(text)
  );

}