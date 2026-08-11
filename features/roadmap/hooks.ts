"use client";

import { useMutation } from "@tanstack/react-query";

import { RoadmapService } from "./service";
import { AIRoadmap } from "./schema";

export function useGenerateRoadmap() {
  return useMutation({
    mutationFn: (input: {
      goalId: string;
      assessment: unknown;
    }) =>
      RoadmapService.generateRoadmap(
        input
      ),
  });
}

export function useSaveRoadmap() {
  return useMutation({
    mutationFn: ({
      goalId,
      roadmap,
    }: {
      goalId: string;
      roadmap: AIRoadmap;
    }) =>
      RoadmapService.saveRoadmap(
        goalId,
        roadmap
      ),
  });
}

export function useToggleRoadmapNode() {
  return useMutation({
    mutationFn: (nodeId: string) =>
      RoadmapService.toggleRoadmapNode(
        nodeId
      ),
  });
}