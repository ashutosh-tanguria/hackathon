"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { GoalService } from "./lib/goal-service";
import { CreateGoalInput } from "./schema";

export function useGoals() {
  return useQuery({
    queryKey: ["goals"],
    queryFn: GoalService.getGoals,
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGoalInput) =>
      GoalService.createGoal(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });
    },
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goalId: string) =>
      GoalService.deleteGoal(goalId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["goals"],
      });
    },
  });
}