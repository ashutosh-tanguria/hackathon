"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  useActiveLearningSession,
  useStartLearningSession,
  usePauseLearningSession,
  useResumeLearningSession,
  useEndLearningSession,
} from "../hooks";

import { SessionTimer } from "./session-timer";

export function SessionCard() {
  const {
    data: session,
    isLoading,
  } = useActiveLearningSession();

  const start =
    useStartLearningSession();

  const pause =
    usePauseLearningSession();

  const resume =
    useResumeLearningSession();

  const end =
    useEndLearningSession();

  const [title, setTitle] =
    useState("");

  async function handleStart() {
    if (!title.trim()) {
      toast.error(
        "Enter a session title."
      );
      return;
    }

    try {
      await start.mutateAsync(title);

      toast.success(
        "Study session started."
      );

      setTitle("");
    } catch {
      toast.error(
        "Failed to start session."
      );
    }
  }

  async function handlePause() {
    if (!session) return;

    await pause.mutateAsync(
      session.id
    );

    toast.success(
      "Session paused."
    );
  }

  async function handleResume() {
    if (!session) return;

    await resume.mutateAsync(
      session.id
    );

    toast.success(
      "Session resumed."
    );
  }

  async function handleEnd() {
    if (!session) return;

    await end.mutateAsync(
      session.id
    );

    toast.success(
      "Session completed."
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-xl border p-6">

      <h2 className="text-2xl font-bold">
        Study Session
      </h2>

      {!session && (
        <>
          <Input
            placeholder="Session title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <Button
            className="w-full"
            onClick={handleStart}
            disabled={
              start.isPending
            }
          >
            {start.isPending
              ? "Starting..."
              : "Start Session"}
          </Button>
        </>
      )}

      {session && (
        <>
          <div>

            <h3 className="text-lg font-semibold">
              {session.title}
            </h3>

            <p className="text-sm text-muted-foreground">
              Status:
              {" "}
              {session.status}
            </p>

          </div>

          <SessionTimer
            startedAt={
              session.startedAt
            }
            isRunning={
              session.status ===
              "ACTIVE"
            }
          />

          <div className="grid grid-cols-3 gap-3">

            {session.status ===
              "ACTIVE" && (
              <Button
                onClick={
                  handlePause
                }
              >
                Pause
              </Button>
            )}

            {session.status ===
              "PAUSED" && (
              <Button
                onClick={
                  handleResume
                }
              >
                Resume
              </Button>
            )}

            <Button
              variant="destructive"
              onClick={
                handleEnd
              }
            >
              End
            </Button>

          </div>
        </>
      )}

    </div>
  );
}