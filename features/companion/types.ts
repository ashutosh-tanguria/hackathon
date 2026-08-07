export interface ChatMessage {
  role: "user" | "assistant";

  content: string;

  createdAt: Date;
}

export interface CompanionResponse {
  reply: string;

  suggestions: string[];
}