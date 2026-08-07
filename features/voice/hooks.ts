"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  createVoiceSession,
  handleLiveMessage,
} from "./service";

import type {
  VoiceSessionState,
} from "./types";

import {
  GeminiLiveClient,
} from "@/lib/gemini-live";

function arrayBufferToBase64(
  buffer: ArrayBuffer,
) {
  let binary = "";

  const bytes =
    new Uint8Array(buffer);

  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(
      bytes[i],
    );
  }

  return btoa(binary);
}

export function useVoiceCompanion() {
  const clientRef =
    useRef<GeminiLiveClient | null>(null);

  const audioContextRef =
    useRef<AudioContext | null>(null);

  const processorRef =
    useRef<ScriptProcessorNode | null>(
      null,
    );

  const streamRef =
    useRef<MediaStream | null>(null);

  const [
    state,
    setState,
  ] = useState<VoiceSessionState>({
    connected: false,
    listening: false,
    speaking: false,
    interrupted: false,
  });

  const start = useCallback(
    async () => {
      const client =
        await createVoiceSession();

      clientRef.current = client;

      client.on(
        "connected",
        () => {
          setState((prev) => ({
            ...prev,
            connected: true,
          }));
        },
      );

      client.on(
        "message",
        (message) => {
          handleLiveMessage(
            message as never,
            {
              onAudio: () => {
                setState((prev) => ({
                  ...prev,
                  speaking: true,
                }));
              },

              onInterrupted: () => {
                setState((prev) => ({
                  ...prev,
                  speaking: false,
                  interrupted: true,
                }));
              },
            },
          );
        },
      );

      await client.connect();

      const stream =
        await navigator.mediaDevices.getUserMedia(
          {
            audio: true,
          },
        );

      streamRef.current = stream;

      const audioContext =
        new AudioContext({
          sampleRate: 16000,
        });

      audioContextRef.current =
        audioContext;

      const source =
        audioContext.createMediaStreamSource(
          stream,
        );

      const processor =
        audioContext.createScriptProcessor(
          4096,
          1,
          1,
        );

      processorRef.current =
        processor;

      processor.onaudioprocess =
        (event) => {
          const input =
            event.inputBuffer.getChannelData(
              0,
            );

          const pcm =
            new Int16Array(
              input.length,
            );

          for (
            let i = 0;
            i < input.length;
            i++
          ) {
            pcm[i] =
              Math.max(
                -1,
                Math.min(
                  1,
                  input[i],
                ),
              ) * 32767;
          }

          client.sendAudio(
            arrayBufferToBase64(
              pcm.buffer,
            ),
          );
        };

      source.connect(processor);

      processor.connect(
        audioContext.destination,
      );

      setState((prev) => ({
        ...prev,
        listening: true,
      }));
    },
    [],
  );

  const stop = useCallback(
    () => {
      processorRef.current?.disconnect();

      audioContextRef.current?.close();

      streamRef.current
        ?.getTracks()
        .forEach((track) =>
          track.stop(),
        );

      clientRef.current?.disconnect();

      clientRef.current = null;

      setState({
        connected: false,
        listening: false,
        speaking: false,
        interrupted: false,
      });
    },
    [],
  );

  const interrupt =
    useCallback(() => {
      clientRef.current?.interrupt();

      setState((prev) => ({
        ...prev,
        speaking: false,
        interrupted: true,
      }));
    }, []);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    state,
    start,
    stop,
    interrupt,
  };
}