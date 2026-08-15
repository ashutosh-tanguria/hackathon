"use client";

import {
  useCallback,
  useRef,
  useState,
} from "react";

import {
  GeminiLiveClient,
} from "@/lib/gemini-live";


const INPUT_SAMPLE_RATE = 16000;
const OUTPUT_SAMPLE_RATE = 24000;

const WORKLET_URL =
  "/worklets/pcm-recorder-processor.js";


function arrayBufferToBase64(
  buffer: ArrayBuffer,
) {
  let binary = "";

  const bytes =
    new Uint8Array(buffer);

  for (
    let i = 0;
    i < bytes.length;
    i++
  ) {
    binary += String.fromCharCode(
      bytes[i],
    );
  }

  return btoa(binary);
}



function base64ToInt16(
  base64: string,
) {
  const binary =
    atob(base64);

  const bytes =
    new Uint8Array(
      binary.length,
    );

  for (
    let i = 0;
    i < binary.length;
    i++
  ) {
    bytes[i] =
      binary.charCodeAt(i);
  }

  return new Int16Array(
    bytes.buffer,
  );
}



export function useVoiceCompanion() {

  const [state, setState] =
    useState({
      connected: false,
      listening: false,
      speaking: false,
      interrupted: false,
    });



  const clientRef =
    useRef<GeminiLiveClient | null>(
      null,
    );


  const streamRef =
    useRef<MediaStream | null>(
      null,
    );


  const inputContextRef =
    useRef<AudioContext | null>(
      null,
    );


  const outputContextRef =
    useRef<AudioContext | null>(
      null,
    );


  const workletRef =
    useRef<AudioWorkletNode | null>(
      null,
    );


  const nextPlayTimeRef =
    useRef(0);



  const playAudio =
    useCallback(
      (
        base64: string,
      ) => {

        const context =
          outputContextRef.current;


        if (!context) {
          return;
        }


        const pcm =
          base64ToInt16(
            base64,
          );


        const float32 =
          new Float32Array(
            pcm.length,
          );


        for (
          let i = 0;
          i < pcm.length;
          i++
        ) {

          float32[i] =
            pcm[i] / 32768;

        }



        const buffer =
          context.createBuffer(
            1,
            float32.length,
            OUTPUT_SAMPLE_RATE,
          );


        buffer
          .getChannelData(0)
          .set(float32);



        const source =
          context.createBufferSource();


        source.buffer =
          buffer;


        source.connect(
          context.destination,
        );



        const startTime =
          Math.max(
            context.currentTime,
            nextPlayTimeRef.current,
          );


        source.start(
          startTime,
        );


        nextPlayTimeRef.current =
          startTime +
          buffer.duration;



        setState((prev) => ({
          ...prev,
          speaking: true,
        }));


        source.onended =
          () => {

            setState((prev) => ({
              ...prev,
              speaking: false,
            }));

          };


      },
      [],
    );





  const start =
    useCallback(
      async () => {
        if (clientRef.current) {
  return;
}

        try {


          const outputContext =
            new AudioContext({
              sampleRate:
                OUTPUT_SAMPLE_RATE,
            });


          outputContextRef.current =
            outputContext;



          const client =
            new GeminiLiveClient({

              onAudio(
                data,
              ) {

                playAudio(
                  data,
                );

              },


              onInterrupted() {

                setState((prev) => ({
                  ...prev,
                  speaking: false,
                  interrupted: true,
                }));

              },


              onError(error) {

                console.error(
                  "Gemini error",
                  error,
                );

              },


              onClose() {

                setState((prev) => ({
                  ...prev,
                  connected: false,
                  listening: false,
                }));

              },

            });



         clientRef.current =
  client;


await client.connect();


const context =
  await fetch(
    "/api/voice/context"
  ).then(
    res => res.json()
  );


client.sendText(
`
You are StudyOS Voice Companion.

Here is the student's learning context:

Goals:
${JSON.stringify(context.goals, null, 2)}

Reflections:
${JSON.stringify(context.reflections, null, 2)}

Use this information naturally.
Refer to previous goals, progress and reflections when answering.
Do not say you don't know the student's history.
`
);


          const stream =
            await navigator.mediaDevices.getUserMedia(
              {
                audio: {
                  echoCancellation: true,
                  noiseSuppression: true,
                  channelCount: 1,
                },
              },
            );


          streamRef.current =
            stream;



          const inputContext =
            new AudioContext({
              sampleRate:
                INPUT_SAMPLE_RATE,
            });


          inputContextRef.current =
            inputContext;



          await inputContext.audioWorklet.addModule(
            WORKLET_URL,
          );



          const source =
            inputContext.createMediaStreamSource(
              stream,
            );



          const worklet =
            new AudioWorkletNode(
              inputContext,
              "pcm-recorder-processor",
            );


          workletRef.current =
            worklet;



          worklet.port.onmessage =
            (
              event: MessageEvent<ArrayBuffer>,
            ) => {


              client.sendAudio(
                arrayBufferToBase64(
                  event.data,
                ),
              );


            };



          source.connect(
            worklet,
          );



          setState({
            connected: true,
            listening: true,
            speaking: false,
            interrupted: false,
          });



        } catch(error) {


          console.error(
            "Voice start failed",
            error,
          );


        }

      },
      [
        playAudio,
      ],
    );





  const interrupt =
    useCallback(
      () => {

        clientRef.current?.interrupt();

        setState((prev) => ({
          ...prev,
          speaking: false,
          interrupted: true,
        }));

      },
      [],
    );





  const stop =
    useCallback(
      () => {
console.log("Voice stop called");

        workletRef.current?.disconnect();


        inputContextRef.current?.close();


        outputContextRef.current?.close();



        streamRef.current
          ?.getTracks()
          .forEach(
            (track) =>
              track.stop(),
          );



        clientRef.current?.close();


        setState({
          connected: false,
          listening: false,
          speaking: false,
          interrupted: false,
        });


      },
      [],
    );





  return {
    state,
    start,
    stop,
    interrupt,
  };

}