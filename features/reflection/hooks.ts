"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ReflectionService } from "./service";
import { AIReflection } from "./schema";

export function useReflection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      reflection: string
    ) => {
      const result =
        await ReflectionService.analyzeReflection(
          reflection
        );

      await ReflectionService.saveReflection(
        result
      );

      await queryClient.invalidateQueries({
        queryKey: ["reflections"],
      });

      return result;
    },
  });
}

export function useSaveReflection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      reflection: AIReflection
    ) =>
      ReflectionService.saveReflection(
        reflection
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reflections"],
      });
    },
  });
}

export function useReflections() {
  return useQuery({
    queryKey: ["reflections"],

    queryFn: () =>
      ReflectionService.getReflections(),
  });
}