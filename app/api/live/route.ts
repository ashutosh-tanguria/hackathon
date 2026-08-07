import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const GEMINI_LIVE_TOKEN_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1alpha/auth_tokens";

export async function POST() {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "Gemini API key is not configured",
        },
        {
          status: 500,
        },
      );
    }

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

    const context = {
      user: {
        name: session.user.name,
      },
      goals,
      roadmap,
      reflections,
    };

    const response = await fetch(
      GEMINI_LIVE_TOKEN_ENDPOINT,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GEMINI_API_KEY}`,
        },
        body: JSON.stringify({
          uses: {
            generateContent: true,
            bidiGenerateContent: true,
          },
          liveSession: {
            model:
              "models/gemini-2.0-flash-live-001",

            config: {
              responseModalities: [
                "AUDIO",
              ],

              systemInstruction: {
                parts: [
                  {
                    text: `
You are StudyOS Voice Companion.

Help the student with:
- learning guidance
- study planning
- reflection
- productivity
- roadmap execution

Use the following student context:

${JSON.stringify(context, null, 2)}

Be concise, motivating, and practical.
                    `,
                  },
                ],
              },
            },
          },
        }),
      },
    );

    if (!response.ok) {
      const error =
        await response.text();

      console.error(
        "Gemini token error:",
        error,
      );

      return NextResponse.json(
        {
          error:
            "Failed to create Gemini Live token",
        },
        {
          status: 500,
        },
      );
    }

    const tokenData =
      await response.json();

    return NextResponse.json({
      token: tokenData.name,
      expiresAt:
        tokenData.expireTime,
    });
  } catch (error) {
    console.error(
      "Live API route error:",
      error,
    );

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}