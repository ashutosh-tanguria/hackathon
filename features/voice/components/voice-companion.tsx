"use client";

import {
  Mic,
  MicOff,
  PhoneOff,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  useVoiceCompanion,
} from "../hooks";

export function VoiceCompanion() {
  const {
    state,
    start,
    stop,
    interrupt,
  } = useVoiceCompanion();

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>
          StudyOS Voice Companion
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            Connection:
            <span className="ml-2 font-medium">
              {state.connected
                ? "Connected"
                : "Disconnected"}
            </span>
          </div>

          <div>
            Microphone:
            <span className="ml-2 font-medium">
              {state.listening
                ? "Active"
                : "Inactive"}
            </span>
          </div>

          <div>
            AI:
            <span className="ml-2 font-medium">
              {state.speaking
                ? "Speaking"
                : "Idle"}
            </span>
          </div>

          <div>
            Status:
            <span className="ml-2 font-medium">
              {state.interrupted
                ? "Interrupted"
                : "Normal"}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          {!state.connected ? (
            <Button
              onClick={start}
            >
              <Mic className="mr-2 h-4 w-4" />
              Start Companion
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={interrupt}
              >
                <MicOff className="mr-2 h-4 w-4" />
                Interrupt
              </Button>

              <Button
                variant="destructive"
                onClick={stop}
              >
                <PhoneOff className="mr-2 h-4 w-4" />
                End Session
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}