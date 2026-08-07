"use server";

import { prisma } from "@/lib/prisma";
import { gemini } from "@/lib/gemini";

import { ROADMAP_SYSTEM_PROMPT } from "./prompts";

import {
  roadmapSchema,
  AIRoadmap,
} from "./schema";

export async function generateRoadmap(
  assessment: unknown
) {
  const prompt = `
Assessment Result:

${JSON.stringify(
  assessment,
  null,
  2
)}

Generate a personalized learning roadmap.
`;

  const result =
    await gemini.generateContent([
      ROADMAP_SYSTEM_PROMPT,
      prompt,
    ]);

  const text =
    result.response.text();

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
      title: roadmap.title,

      estimatedWeeks:
        roadmap.estimatedWeeks,

      goalId,

      nodes: {
        create: roadmap.nodes.map(
          (node, index) => ({
            title: node.title,

            description:
              node.description,

            week: node.week,

            difficulty:
              node.difficulty,

            completed: false,

            position: index,
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