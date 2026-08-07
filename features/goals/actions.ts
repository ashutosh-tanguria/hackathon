"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

import { createGoalSchema } from "./schema";

export async function createGoal(data: unknown) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const validatedData = createGoalSchema.parse(data);

  return await prisma.goal.create({
    data: {
      title: validatedData.title,
      description: validatedData.description,
      category: validatedData.category,
      userId: user.id,
    },
  });
}

export async function getGoals() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return await prisma.goal.findMany({
    where: {
      userId: user.id,
    },

    include: {
      roadmap: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getGoal(goalId: string) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return await prisma.goal.findFirst({
    where: {
      id: goalId,
      userId: user.id,
    },

    include: {
      roadmap: {
        include: {
          nodes: true,
        },
      },
    },
  });
}

export async function deleteGoal(goalId: string) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await prisma.goal.deleteMany({
    where: {
      id: goalId,
      userId: user.id,
    },
  });

  return {
    success: true,
  };
}