"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { ReflectionService } from "./service";
import { AIReflection } from "./schema";

export function useReflection() {
  return useMutation({
    mutationFn: (reflection: string) =>
      ReflectionService.analyzeReflection(
        reflection
      ),
  });
}

export function useSaveReflection() {
  return useMutation({
    mutationFn: (
      reflection: AIReflection
    ) =>
      ReflectionService.saveReflection(
        reflection
      ),
  });
}

export function useReflections() {
  return useQuery({
    queryKey: ["reflections"],

    queryFn: () =>
      ReflectionService.getReflections(),
  });
}