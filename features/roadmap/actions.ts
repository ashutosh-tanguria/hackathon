"use server";

import { prisma } from "@/lib/prisma";
import { gemini } from "@/lib/gemini";

import {
  ROADMAP_SYSTEM_PROMPT,
} from "./prompts";

import {
  roadmapSchema,
  AIRoadmap,
} from "./schema";

import { Difficulty } from "@prisma/client";

export async function generateRoadmap(
  input: {
    goalId: string;
    assessment: unknown;
  }
) {


  const goal =
    await prisma.goal.findUnique({
      where: {
        id: input.goalId,
      },
    });



  if (!goal) {
    throw new Error(
      "Goal not found."
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


Assessment Result:

${JSON.stringify(
    input.assessment,
    null,
    2
  )}


Generate a personalized learning roadmap based ONLY on this goal.

Do not assume programming.

The roadmap domain must match the goal.
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
                ROADMAP_SYSTEM_PROMPT +
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

  return roadmapSchema.parse(
    JSON.parse(text)
  );

}




export async function saveRoadmap(
  goalId: string,
  roadmap: AIRoadmap
) {


  await prisma.roadmap.deleteMany({
    where: {
      goalId,
    },
  });



  return prisma.roadmap.create({

    data: {

      title:
        roadmap.title,


      estimatedWeeks:
        roadmap.estimatedWeeks,


      goalId,


      nodes: {

        create:
          roadmap.nodes.map(
  (
    node: {
      title: string;
      description: string;
      week: number;
      difficulty: Difficulty;
    },
    index: number
  ) => ({

              title:
                node.title,


              description:
                node.description,


              week:
                node.week,


              difficulty:
                node.difficulty,


              completed:
                false,


              position:
                index,

            })
          ),

      },

    },


    include: {

      nodes: true,

      goal: true,

    },

  });

}




export async function toggleRoadmapNode(
  nodeId: string
) {


  const node =
    await prisma.roadmapNode.findUnique({

      where: {
        id: nodeId,
      },

    });



  if (!node) {

    throw new Error(
      "Roadmap node not found."
    );

  }



  return prisma.roadmapNode.update({

    where: {
      id: nodeId,
    },


    data: {

      completed:
        !node.completed,

    },

  });

}