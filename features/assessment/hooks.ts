"use client";

import { useMutation } from "@tanstack/react-query";

import { AssessmentService } from "./lib/assessment-service";

export function useAssessment() {
  return useMutation({
    mutationFn:
      AssessmentService.evaluateAssessment,
  });
}