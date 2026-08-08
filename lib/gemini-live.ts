"use client";

export type GeminiLiveCallbacks = {
  onOpen?: () => void;

  onAudio?: (
    data: string,
    mimeType: string,
  ) => void;

  onText?: (
    text: string,
  ) => void;

  onInterrupted?: () => void;

  onTurnComplete?: () => void;

  onSetupComplete?: () => void;

  onMessage?: (
    data: unknown,
  ) => void;

  onError?: (
    error: unknown,
  ) => void;

  onClose?: (
    event: CloseEvent,
  ) => void;
};


type GeminiPart = {
  text?: string;

  inlineData?: {
    data?: string;
    mimeType?: string;
  };
};


type GeminiMessage = {
  setupComplete?: unknown;

  serverContent?: {
    interrupted?: boolean;

    turnComplete?: boolean;

    modelTurn?: {
      parts?: GeminiPart[];
    };
  };
};


const DEFAULT_WS_URL =
  process.env.NEXT_PUBLIC_LIVE_WS_URL ??
  "ws://localhost:8000";



export class GeminiLiveClient {

  private socket:
    WebSocket | null = null;


  private callbacks:
    GeminiLiveCallbacks;


  private url:
    string;



  constructor(
    callbacks: GeminiLiveCallbacks = {},
    url: string = DEFAULT_WS_URL,
  ) {

    this.callbacks =
      callbacks;

    this.url =
      url;

  }



  connect() {

    return new Promise<void>(
      (
        resolve,
        reject,
      ) => {


        const socket =
          new WebSocket(
            this.url,
          );


        this.socket =
          socket;



        socket.onopen =
          () => {

            console.log(
              "Gemini Live connected",
            );


            this.callbacks.onOpen?.();


            resolve();

          };



        socket.onmessage =
          (
            event,
          ) => {


            let data:
              GeminiMessage;


            try {

              data =
                JSON.parse(
                  event.data as string,
                ) as GeminiMessage;


            } catch {

              this.callbacks.onMessage?.(
                event.data,
              );

              return;

            }



            this.callbacks.onMessage?.(
              data,
            );



            if (
              data.setupComplete
            ) {

              this.callbacks
                .onSetupComplete
                ?.();

            }



            if (
              data.serverContent
                ?.interrupted
            ) {

              this.callbacks
                .onInterrupted
                ?.();

            }



            const parts =
              data
                .serverContent
                ?.modelTurn
                ?.parts;



            if (
              parts
            ) {


              parts.forEach(
                (
                  part: GeminiPart,
                ) => {


                  if (
                    part.text
                  ) {

                    this.callbacks
                      .onText
                      ?.(
                        part.text,
                      );

                  }



                  if (
                    part.inlineData?.data
                  ) {

                    this.callbacks
                      .onAudio
                      ?.(
                        part.inlineData.data,

                        part.inlineData.mimeType ??
                        "audio/pcm;rate=24000",
                      );

                  }


                },
              );

            }



            if (
              data.serverContent
                ?.turnComplete
            ) {

              this.callbacks
                .onTurnComplete
                ?.();

            }


          };



        socket.onerror =
          (
            error,
          ) => {

            this.callbacks
              .onError
              ?.(
                error,
              );


            reject(error);

          };



        socket.onclose =
  (
    event,
  ) => {

    console.log(
      "WebSocket closed",
      {
        code: event.code,
        reason: event.reason,
        wasClean: event.wasClean,
      },
    );


            this.callbacks
              .onClose
              ?.(
                event,
              );

          };


      },
    );

  }





  sendAudio(
    data: string,
    mimeType =
      "audio/pcm;rate=16000",
  ) {

    if (
      !this.socket ||
      this.socket.readyState !==
      WebSocket.OPEN
    ) {
      return;
    }



    this.socket.send(
      JSON.stringify(
        {
          realtimeInput: {
            audio: {
              data,
              mimeType,
            },
          },
        },
      ),
    );

  }





  sendText(
    text: string,
  ) {

    if (
      !this.socket ||
      this.socket.readyState !==
      WebSocket.OPEN
    ) {
      return;
    }



    this.socket.send(
      JSON.stringify(
        {
          realtimeInput: {
            text,
          },
        },
      ),
    );

  }





  sendAudioStreamEnd() {

    if (
      !this.socket ||
      this.socket.readyState !==
      WebSocket.OPEN
    ) {
      return;
    }



    this.socket.send(
      JSON.stringify(
        {
          realtimeInput: {
            audioStreamEnd: true,
          },
        },
      ),
    );

  }





  interrupt() {

    this.callbacks
      .onInterrupted
      ?.();

  }





  close() {

    this.socket?.close();

    this.socket =
      null;

  }

}