"use client";

import { useState } from "react";

import { ChatInput } from "./chat-input";
import { ChatMessage } from "./chat-message";
import { SuggestionCard } from "./suggestion-card";

import { ChatMessage as ChatMessageType } from "../types";
import { useCompanion } from "../hooks";

const DEFAULT_SUGGESTIONS = [
  "What should I study today?",
  "What are my weak areas?",
  "Summarize my learning progress.",
  "Motivate me to study.",
];

export function CompanionChat() {
  const companion = useCompanion();

  const loading = companion.isPending;

  const [messages, setMessages] = useState<
    ChatMessageType[]
  >([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI Study Companion. Ask me anything about your learning journey.",
      createdAt: new Date(),
    },
  ]);

  async function sendMessage(
    message: string
  ) {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: message,
        createdAt: new Date(),
      },
    ]);

    try {
      const response =
        await companion.mutateAsync(
          message
        );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.reply,
          createdAt: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong while contacting the AI Companion.",
          createdAt: new Date(),
        },
      ]);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 md:grid-cols-2">
        {DEFAULT_SUGGESTIONS.map(
          (suggestion) => (
            <SuggestionCard
              key={suggestion}
              title={suggestion}
              onClick={() =>
                sendMessage(
                  suggestion
                )
              }
            />
          )
        )}
      </div>

      <div className="flex h-[500px] flex-col gap-4 overflow-y-auto rounded-xl border p-4">
        {messages.map(
          (message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
            />
          )
        )}
      </div>

      <ChatInput
        loading={loading}
        onSend={sendMessage}
      />
    </div>
  );
}