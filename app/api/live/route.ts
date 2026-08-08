import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const userId = session.user.id;

    const [goals, roadmap, reflections] =
      await Promise.all([
        prisma.goal.findMany({
          where: {
            userId,
          },
          include: {
            roadmap: {
              include: {
                nodes: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        }),

        prisma.roadmap.findFirst({
          where: {
            goal: {
              userId,
            },
          },
          include: {
            goal: true,
            nodes: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        }),

        prisma.reflectionSession.findMany({
          where: {
            userId,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        }),
      ]);

    const context = `
You are StudyOS Voice Companion.

Student:
${session.user.name}

Goals:
${JSON.stringify(goals)}

Roadmap:
${JSON.stringify(roadmap)}

Reflections:
${JSON.stringify(reflections)}

Help the student with:
- study planning
- learning guidance
- reflection
- productivity
- roadmap execution

Keep responses concise and practical.
`;

    return NextResponse.json({
      config: {
        responseModalities: [
          "AUDIO",
        ],

        systemInstruction: {
          parts: [
            {
              text: context,
            },
          ],
        },
      },
    });
  } catch (error) {
    console.error(
      "Live API route error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Failed to initialize voice companion",
      },
      {
        status: 500,
      },
    );
  }
}