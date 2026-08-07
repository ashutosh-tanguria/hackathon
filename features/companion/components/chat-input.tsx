"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  loading?: boolean;
}

export function ChatInput({
  onSend,
  loading,
}: ChatInputProps) {
  const [message, setMessage] =
    useState("");

  function handleSend() {
    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  }

  return (
    <div className="space-y-3">
      <Textarea
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        placeholder="Ask your AI Companion..."
      />

      <Button
        className="w-full"
        onClick={handleSend}
        disabled={loading}
      >
        {loading
          ? "Thinking..."
          : "Send"}
      </Button>
    </div>
  );
}