import { GeminiLiveClient } from "@/lib/gemini-live";
import type {
  LiveServerMessage,
  VoiceAudioChunk,
} from "./types";

export async function createVoiceSession() {
  const response = await fetch("/api/live", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(
      "Failed to create voice session",
    );
  }

  const data = await response.json();

  if (!data.token) {
    throw new Error(
      "Gemini Live token missing",
    );
  }

  return new GeminiLiveClient(data.token);
}

export function handleLiveMessage(
  message: LiveServerMessage,
  handlers: {
    onAudio?: (chunk: VoiceAudioChunk) => void;
    onText?: (text: string) => void;
    onInterrupted?: () => void;
    onError?: (error: unknown) => void;
  },
) {
  try {
    if (
      message.serverContent?.audio
    ) {
      handlers.onAudio?.(
        message.serverContent.audio,
      );
    }

    const parts =
      message.serverContent
        ?.modelTurn
        ?.parts;

    if (parts) {
      for (const part of parts) {
        if (part.text) {
          handlers.onText?.(
            part.text,
          );
        }
      }
    }

    if (
      message.serverContent?.interrupted
    ) {
      handlers.onInterrupted?.();
    }

    if (message.error) {
      handlers.onError?.(
        message.error,
      );
    }
  } catch (error) {
    handlers.onError?.(error);
  }
}