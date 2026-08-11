"use client";

import {
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import {
  analyzeReflection,
  getReflections,
} from "./actions";


export function useReflection() {

  return useMutation({

    mutationFn: (
      data: {
        goalId: string;
        reflection: string;
      }
    ) =>
      analyzeReflection(
        data
      ),

  });

}


export function useReflections() {

  return useQuery({

    queryKey: [
      "reflections",
    ],

    queryFn:
      getReflections,

  });

}