"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

export async function startLearningSession(
  title: string
) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const active =
    await prisma.learningSession.findFirst({
      where: {
        userId: user.id,
        status: "ACTIVE",
      },
    });

  if (active) {
    return active;
  }

  return prisma.learningSession.create({
    data: {
      title,
      userId: user.id,
      status: "ACTIVE",
    },
  });
}

export async function pauseLearningSession(
  sessionId: string
) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return prisma.learningSession.update({
    where: {
      id: sessionId,
    },

    data: {
      status: "PAUSED",
    },
  });
}

export async function resumeLearningSession(
  sessionId: string
) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return prisma.learningSession.update({
    where: {
      id: sessionId,
    },

    data: {
      status: "ACTIVE",
    },
  });
}

export async function endLearningSession(
  sessionId: string
) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const session =
    await prisma.learningSession.findUnique({
      where: {
        id: sessionId,
      },
    });

  if (!session) {
    throw new Error(
      "Session not found."
    );
  }

  const duration = Math.max(
    1,
    Math.round(
      (Date.now() -
        session.startedAt.getTime()) /
        60000
    )
  );

  return prisma.learningSession.update({
    where: {
      id: sessionId,
    },

    data: {
      endedAt: new Date(),
      duration,
      status: "COMPLETED",
    },
  });
}

export async function getLearningSessions() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return prisma.learningSession.findMany({
    where: {
      userId: user.id,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getActiveLearningSession() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return prisma.learningSession.findFirst({
    where: {
      userId: user.id,
      status: "ACTIVE",
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}