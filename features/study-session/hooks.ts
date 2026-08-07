"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { StudySessionService } from "./service";

export function useLearningSessions() {
  return useQuery({
    queryKey: ["learning-sessions"],

    queryFn: () =>
      StudySessionService.getLearningSessions(),
  });
}

export function useActiveLearningSession() {
  return useQuery({
    queryKey: ["active-learning-session"],

    queryFn: () =>
      StudySessionService.getActiveLearningSession(),
  });
}

export function useStartLearningSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title: string) =>
      StudySessionService.startLearningSession(
        title
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["learning-sessions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["active-learning-session"],
      });
    },
  });
}

export function usePauseLearningSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) =>
      StudySessionService.pauseLearningSession(
        sessionId
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["learning-sessions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["active-learning-session"],
      });
    },
  });
}

export function useResumeLearningSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) =>
      StudySessionService.resumeLearningSession(
        sessionId
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["learning-sessions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["active-learning-session"],
      });
    },
  });
}

export function useEndLearningSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) =>
      StudySessionService.endLearningSession(
        sessionId
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["learning-sessions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["active-learning-session"],
      });
    },
  });
}