import "dotenv/config";

import type { IncomingMessage } from "node:http";

import {
  WebSocketServer,
  WebSocket,
} from "ws";

import {
  GoogleGenAI,
  Modality,
} from "@google/genai";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


const PORT =
  Number(process.env.LIVE_WS_PORT ?? 8000);


const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY;


if (!GEMINI_API_KEY) {
  throw new Error(
    "Missing GEMINI_API_KEY",
  );
}


const LIVE_MODEL =
  "gemini-2.5-flash-native-audio-preview-09-2025";


const ai =
  new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  });



const wss =
  new WebSocketServer({
    port: PORT,
    host: "localhost",
  });



console.log(
  `Live WebSocket server running on ${PORT}`,
);



async function getSessionUser(
  request: IncomingMessage,
) {

  const headers =
    new Headers();


  if (request.headers.cookie) {
    headers.set(
      "cookie",
      request.headers.cookie,
    );
  }


  const session =
    await auth.api.getSession({
      headers,
    });


  return session?.user ?? null;

}




async function buildSystemInstruction(
  userId: string,
  userName: string,
) {

  const [
    goals,
    roadmap,
    reflections,
  ] =
    await Promise.all([

      prisma.goal.findMany({
        where: {
          userId,
        },
        select: {
          title: true,
          description: true,
          category: true,
        },
        take: 3,
      }),


      prisma.roadmap.findFirst({
        where: {
          goal: {
            userId,
          },
        },
        select: {
          title: true,
          estimatedWeeks: true,
          goal: {
            select: {
              title: true,
            },
          },
        },
      }),


      prisma.reflectionSession.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 2,
      }),

    ]);



  const goalContext =
    goals
      .map(
        (goal) =>
          `- ${goal.title} (${goal.category})${
            goal.description
              ? `: ${goal.description}`
              : ""
          }`,
      )
      .join("\n");



  const roadmapContext =
    roadmap
      ? `
Current Roadmap:
${roadmap.title}

Related Goal:
${roadmap.goal.title}

Duration:
${roadmap.estimatedWeeks} weeks
`
      : "No active roadmap";



  const reflectionContext =
    reflections
      .map(
        (reflection) =>
          `- ${reflection.summary}`,
      )
      .join("\n");



  return `
You are StudyOS Voice Companion.

Student:
${userName}


Goals:
${goalContext}


${roadmapContext}


Recent Reflections:
${reflectionContext}


Rules:
- Act as a personal AI study mentor.
- Use student context when relevant.
- Keep answers concise.
- Give practical next steps.
`;
}





wss.on(
  "connection",
  async (
    socket: WebSocket,
    request: IncomingMessage,
  ) => {


    console.log(
      "Browser connected",
    );



    const user =
      await getSessionUser(
        request,
      );



    if (!user) {

      socket.close(
        4401,
        "Unauthorized",
      );

      return;

    }



    let gemini:
      Awaited<
        ReturnType<
          typeof ai.live.connect
        >
      > | undefined;



    try {


      const systemInstruction =
        await buildSystemInstruction(
          user.id,
          user.name ?? "Student",
        );



      gemini =
        await ai.live.connect({

          model: LIVE_MODEL,


          config: {

            responseModalities: [
              Modality.AUDIO,
            ],


            realtimeInputConfig: {

              automaticActivityDetection: {

                disabled: false,


                startOfSpeechSensitivity:
                  "START_SENSITIVITY_HIGH" as never,


                endOfSpeechSensitivity:
                  "END_SENSITIVITY_HIGH" as never,

              },

            },



            systemInstruction: {

              parts: [
                {
                  text: systemInstruction,
                },
              ],

            },

          },



          callbacks: {


            onopen() {

              console.log(
                "Gemini Live connected",
              );

            },



            onmessage(
              message,
            ) {


              if (
                socket.readyState ===
                WebSocket.OPEN
              ) {

                socket.send(
                  JSON.stringify(
                    message,
                  ),
                );

              }

            },



            onerror(
              error,
            ) {

              console.error(
                "Gemini error:",
                error,
              );

            },



            onclose(
              event,
            ) {

              console.log(
                "Gemini closed:",
                {
                  code:
                    event.code,
                  reason:
                    event.reason,
                },
              );



              if (
                socket.readyState ===
                WebSocket.OPEN
              ) {

                socket.close();

              }

            },

          },

        });



    } catch(error) {


      console.error(
        "Gemini connection failed",
        error,
      );


      socket.close();

      return;

    }





    socket.on(
      "message",
      async (
        raw: Buffer,
      ) => {


        try {


          const data =
            JSON.parse(
              raw.toString(),
            );



          if (
            data.realtimeInput?.audio
          ) {


            await gemini?.sendRealtimeInput(
              {
                audio:
                  data.realtimeInput.audio,
              },
            );


          }



          if (
            data.realtimeInput?.text
          ) {


            await gemini?.sendRealtimeInput(
              {
                text:
                  data.realtimeInput.text,
              },
            );


          }



          if (
            data.realtimeInput?.audioStreamEnd
          ) {


            await gemini?.sendRealtimeInput(
              {
                audioStreamEnd: true,
              },
            );


          }



        } catch(error) {


          console.error(
            "Message error:",
            error,
          );

        }

      },
    );




    socket.on(
      "close",
      () => {

        console.log(
          "Browser disconnected",
        );


        gemini?.close();

      },
    );


  },
);