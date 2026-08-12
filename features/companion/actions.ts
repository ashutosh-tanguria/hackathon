"use server";


import { auth } from "@/lib/auth";
import { gemini } from "@/lib/gemini";
import { prisma } from "@/lib/prisma";


import {
  CompanionResponse,
  companionResponseSchema,
} from "./schema";


import {
  COMPANION_SYSTEM_PROMPT,
} from "./prompts";





export async function askCompanion(
  message: string
): Promise<CompanionResponse> {

  const fallback: CompanionResponse = {

    reply:
      "Keep focusing on your learning roadmap. Complete your next planned task and maintain consistency.",

  };




  try {


    const session =
      await auth.api.getSession({

        headers:
          await import(
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

          createdAt:
            "desc",

        },


        include: {

          roadmap: {

            include: {

              nodes: {

                orderBy: {

                  position:
                    "asc",

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

          createdAt:
            "desc",

        },

      });







    const completed =
      goal?.roadmap?.nodes.filter(
        (node) =>
          node.completed
      ) ?? [];





    const remaining =
      goal?.roadmap?.nodes.filter(
        (node) =>
          !node.completed
      ) ?? [];








    const prompt = `

Current Goal:

${goal?.title ?? "No goal created"}



Goal Description:

${goal?.description ?? "None"}



Completed Topics:

${completed
        .map((n) => n.title)
        .join(", ")
      || "None"
      }



Remaining Topics:

${remaining
        .map((n) => n.title)
        .join(", ")
      || "None"
      }



Latest Reflection:

${reflection?.summary ?? "No reflection"}



User Message:

${message}



Give practical coaching.

Keep answer short.

Recommend only ONE next action.

Return ONLY valid JSON.

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
                  COMPANION_SYSTEM_PROMPT +
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






    return companionResponseSchema.parse(

      JSON.parse(text)

    );





  } catch (error) {


    console.error(
      "Companion AI failed:",
      error
    );



    return fallback;


  }


}