import { NextRequest } from "next/server";
import {
  GoogleGenAI,
  Modality,
} from "@google/genai";

const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY;

export async function GET(
  req: NextRequest,
) {
  if (!GEMINI_API_KEY) {
    return new Response(
      "Missing Gemini API key",
      {
        status: 500,
      },
    );
  }

  const upgrade =
    req.headers.get("upgrade");

  if (upgrade !== "websocket") {
    return new Response(
      "Expected websocket",
      {
        status: 426,
      },
    );
  }

  const ai =
    new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
    });

  const session =
    await ai.live.connect({
      model:
  process.env.GEMINI_LIVE_MODEL!,

      config: {
        responseModalities: [
  Modality.AUDIO,
],
      },

      callbacks: {
        onopen() {
          console.log(
            "Gemini Live connected",
          );
        },

        onmessage(message) {
          console.log(
            "Gemini message",
            message,
          );
        },

        onerror(error) {
          console.error(
            "Gemini Live error",
            error,
          );
        },

        onclose() {
          console.log(
            "Gemini Live closed",
          );
        },
      },
    });

  return new Response(
    JSON.stringify({
      connected: true,
    }),
    {
      headers: {
        "Content-Type":
          "application/json",
      },
    },
  );
}