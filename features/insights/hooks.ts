"use client";

import { useMutation } from "@tanstack/react-query";

import { InsightService } from "./service";

export function useInsight() {
  return useMutation({
    mutationFn: () =>
      InsightService.generateInsight(),
  });
}