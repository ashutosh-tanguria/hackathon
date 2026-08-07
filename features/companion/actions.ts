"use server";

import { auth } from "@/lib/auth";
import { gemini } from "@/lib/gemini";
import { prisma } from "@/lib/prisma";

import {
  CompanionResponse,
  companionResponseSchema,
} from "./schema";

import { COMPANION_SYSTEM_PROMPT } from "./prompts";

export async function askCompanion(
  message: string
): Promise<CompanionResponse> {
  const session =
    await auth.api.getSession({
      headers: await import(
        "next/headers"
      ).then(({ headers }) =>
        headers()
      ),
    });

  if (!session) {
    throw new Error(
      "Unauthorized"
    );
  }

  const goal =
    await prisma.goal.findFirst({
      where: {
        userId:
          session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        roadmap: {
          include: {
            nodes: {
              orderBy: {
                position: "asc",
              },
            },
          },
        },
      },
    });

  const reflection =
    await prisma.reflectionSession.findFirst({
      where: {
        userId:
          session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  const completed =
    goal?.roadmap?.nodes.filter(
      (node) => node.completed
    ) ?? [];

  const remaining =
    goal?.roadmap?.nodes.filter(
      (node) => !node.completed
    ) ?? [];

  const prompt = `
Current Goal

${goal?.title}

Goal Description

${goal?.description}

Completed Topics

${completed
  .map((n) => n.title)
  .join(", ")}

Remaining Topics

${remaining
  .map((n) => n.title)
  .join(", ")}

Latest Reflection

${reflection?.summary ?? "No reflection"}

User Message

${message}

Give practical coaching.
Keep the answer short.
Recommend only ONE next action.
`;

  const result =
    await gemini.generateContent([
      COMPANION_SYSTEM_PROMPT,
      prompt,
    ]);

  const text =
    result.response.text();

  return companionResponseSchema.parse(
    JSON.parse(text)
  );
}