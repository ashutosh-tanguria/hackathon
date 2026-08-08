"use client";

import {
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Volume2,
  Zap,
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap size={20} />
          StudyOS Voice Companion
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span>Connection</span>

            <span>
              {state.connected
                ? "Connected"
                : "Disconnected"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>Microphone</span>

            <span className="flex items-center gap-2">
              {state.listening ? (
                <>
                  <Mic size={16} />
                  Listening
                </>
              ) : (
                <>
                  <MicOff size={16} />
                  Off
                </>
              )}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>AI Voice</span>

            <span className="flex items-center gap-2">
              {state.speaking ? (
                <>
                  <Volume2 size={16} />
                  Speaking
                </>
              ) : (
                "Idle"
              )}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span>Interrupt</span>

            <span>
              {state.interrupted
                ? "Detected"
                : "None"}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          {!state.connected ? (
            <Button
              className="flex-1"
              onClick={start}
            >
              <Phone size={16} />
              Start Companion
            </Button>
          ) : (
            <Button
              variant="destructive"
              className="flex-1"
              onClick={stop}
            >
              <PhoneOff size={16} />
              Stop
            </Button>
          )}

          {state.speaking && (
            <Button
              variant="outline"
              onClick={interrupt}
            >
              Interrupt
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}