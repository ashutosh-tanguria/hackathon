import { z } from "zod";

export const companionResponseSchema =
  z.object({
    reply: z.string(),
  });

export type CompanionResponse =
  z.infer<
    typeof companionResponseSchema
  >;