"use server";

import { prisma } from "@/lib/prisma";
import { gemini } from "@/lib/gemini";
import { getCurrentUser } from "@/lib/current-user";

import { REFLECTION_SYSTEM_PROMPT } from "./prompts";
import {
  reflectionSchema,
  AIReflection,
} from "./schema";

export async function analyzeReflection(
  reflection: string
) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const prompt = `
Student Reflection:

${reflection}

Analyze this reflection.
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
}

export async function saveReflection(
  reflection: AIReflection
) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const created =
    await prisma.reflectionSession.create({
      data: {
        summary: reflection.summary,

        aiFeedback: JSON.stringify({
          strengths:
            reflection.strengths,

          improvements:
            reflection.improvements,

          nextAction:
            reflection.nextAction,

          recommendation: `
Focus tomorrow on:
${reflection.nextAction}

Main improvement area:
${reflection.improvements.join(", ")}

Strengths:
${reflection.strengths.join(", ")}
`,
        }),

        userId: user.id,
      },
    });

  return {
  success: true,
  reflection: created,
};
}

export async function getReflections() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const reflections =
    await prisma.reflectionSession.findMany({
      where: {
        userId: user.id,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return reflections;
}