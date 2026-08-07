export interface LiveClientMessage {
  setup?: {
    model: string;
    generationConfig?: {
      responseModalities?: string[];
    };
    systemInstruction?: {
      parts: {
        text: string;
      }[];
    };
  };

  realtimeInput?: {
    mediaChunks?: {
      mimeType: string;
      data: string;
    }[];

    activityStart?: Record<string, never>;

    activityEnd?: Record<string, never>;
  };
}

export interface LiveServerMessage {
  serverContent?: {
    modelTurn?: {
      parts?: {
        text?: string;
        inlineData?: {
          mimeType: string;
          data: string;
        };
      }[];
    };

    audio?: {
      mimeType: string;
      data: string;
    };

    interrupted?: boolean;
  };

  setupComplete?: boolean;

  toolCall?: unknown;

  error?: {
    code: number;
    message: string;
  };
}

export interface VoiceSessionState {
  connected: boolean;
  listening: boolean;
  speaking: boolean;
  interrupted: boolean;
}

export interface VoiceAudioChunk {
  mimeType: string;
  data: string;
}

export interface VoiceCompanionContext {
  goals: unknown[];
  roadmap: unknown | null;
  reflections: unknown[];
}