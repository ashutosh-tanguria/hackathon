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
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const goal = await prisma.goal.findFirst({
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
  });

  const reflection =
    await prisma.reflectionSession.findFirst({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  const completed =
    goal?.roadmap?.nodes.filter(
      (n) => n.completed
    ).length ?? 0;

  const total =
    goal?.roadmap?.nodes.length ?? 0;

  const nextNode =
    goal?.roadmap?.nodes.find(
      (n) => !n.completed
    );

  const prompt = `
Current Goal

${goal?.title}

Progress

${completed}/${total}

Next Topic

${nextNode?.title ?? "Completed"}

Reflection

${reflection?.summary ?? "No reflection"}

Generate one personalized study insight.
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