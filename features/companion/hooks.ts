"use client";

import { useMutation } from "@tanstack/react-query";

import { CompanionService } from "./service";

export function useCompanion() {
  return useMutation({
    mutationFn: (message: string) =>
      CompanionService.askCompanion(
        message
      ),
  });
}