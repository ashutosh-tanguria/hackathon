"use client";

import { useEffect, useState } from "react";

interface SessionTimerProps {
  startedAt: Date | string;
  isRunning: boolean;
}

export function SessionTimer({
  startedAt,
  isRunning,
}: SessionTimerProps) {
  const [seconds, setSeconds] =
    useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const start =
      new Date(startedAt).getTime();

    const update = () => {
      setSeconds(
        Math.floor(
          (Date.now() - start) / 1000
        )
      );
    };

    update();

    const interval =
      setInterval(update, 1000);

    return () =>
      clearInterval(interval);
  }, [startedAt, isRunning]);

  const hours = Math.floor(
    seconds / 3600
  );

  const minutes = Math.floor(
    (seconds % 3600) / 60
  );

  const secs = seconds % 60;

  return (
    <div className="rounded-xl border bg-card p-6 text-center">
      <h2 className="text-lg font-semibold">
        Study Timer
      </h2>

      <div className="mt-6 text-5xl font-bold tabular-nums">
        {String(hours).padStart(2, "0")}:
        {String(minutes).padStart(2, "0")}:
        {String(secs).padStart(2, "0")}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {isRunning
          ? "Session is running..."
          : "Session paused"}
      </p>
    </div>
  );
}