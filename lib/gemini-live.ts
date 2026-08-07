import type {
  LiveServerMessage,
  LiveClientMessage,
} from "@/features/voice/types";

const GEMINI_LIVE_WS_URL =
  "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent";

export class GeminiLiveClient {
  private socket: WebSocket | null = null;

  private token: string;

  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  private listeners = new Map<
    string,
    Set<(data: unknown) => void>
  >();

  constructor(token: string) {
    this.token = token;
  }

  connect() {
    return new Promise<void>((resolve, reject) => {
      try {
        this.socket = new WebSocket(
          `${GEMINI_LIVE_WS_URL}?access_token=${this.token}`,
        );

        this.socket.binaryType = "arraybuffer";

        this.socket.onopen = () => {
          this.reconnectAttempts = 0;

          this.emit("connected", null);

          resolve();
        };

        this.socket.onmessage = (event) => {
          this.handleMessage(event.data);
        };

        this.socket.onerror = (error) => {
          this.emit("error", error);

          reject(error);
        };

        this.socket.onclose = () => {
          this.emit("disconnected", null);

          this.handleReconnect();
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  send(message: LiveClientMessage) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      return;
    }

    this.socket.send(JSON.stringify(message));
  }

  sendAudio(audioBase64: string) {
    this.send({
      realtimeInput: {
        mediaChunks: [
          {
            mimeType: "audio/pcm",
            data: audioBase64,
          },
        ],
      },
    });
  }

  interrupt() {
    this.send({
      realtimeInput: {
        activityStart: {},
      },
    });
  }

  disconnect() {
    this.socket?.close();

    this.socket = null;
  }

  on(
    event: string,
    callback: (data: unknown) => void,
  ) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners
      .get(event)!
      .add(callback);
  }

  off(
    event: string,
    callback: (data: unknown) => void,
  ) {
    this.listeners
      .get(event)
      ?.delete(callback);
  }

  private emit(event: string, data: unknown) {
    this.listeners
      .get(event)
      ?.forEach((callback) => {
        callback(data);
      });
  }

  private handleMessage(data: string | ArrayBuffer) {
    try {
      const message: LiveServerMessage =
        typeof data === "string"
          ? JSON.parse(data)
          : JSON.parse(
              new TextDecoder().decode(data),
            );

      this.emit("message", message);

      if (message.serverContent?.audio) {
        this.emit(
          "audio",
          message.serverContent.audio,
        );
      }

      if (
        message.serverContent?.interrupted
      ) {
        this.emit("interrupted", null);
      }
    } catch (error) {
      this.emit("error", error);
    }
  }

  private async handleReconnect() {
    if (
      this.reconnectAttempts >=
      this.maxReconnectAttempts
    ) {
      return;
    }

    this.reconnectAttempts++;

    const delay =
      1000 *
      Math.pow(
        2,
        this.reconnectAttempts,
      );

    await new Promise((resolve) =>
      setTimeout(resolve, delay),
    );

    this.connect().catch(() => {});
  }
}