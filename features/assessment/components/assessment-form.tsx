"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useAssessment } from "../hooks";
import { AssessmentResult } from "./assessment-result";

import {
  useGenerateRoadmap,
  useSaveRoadmap,
} from "@/features/roadmap/hooks";

const QUESTIONS = [
  {
    id: 1,
    question:
      "What is your current experience level with this goal?",
    options: [
      "Complete beginner",
      "Basic understanding",
      "Intermediate",
      "Advanced",
    ],
  },

  {
    id: 2,
    question:
      "How comfortable are you applying this knowledge practically?",
    options: [
      "I need guidance",
      "I can do basic tasks",
      "I can solve problems independently",
      "I can build advanced solutions",
    ],
  },

  {
    id: 3,
    question:
      "What best describes your previous practice in this domain?",
    options: [
      "No practical experience",
      "Small practice attempts",
      "Multiple projects/practice",
      "Real-world experience",
    ],
  },
];

interface AIResult {
  level: string;
  strengths: string[];
  weaknesses: string[];
}

interface AssessmentFormProps {
  goalId?: string;
}

export function AssessmentForm({
  goalId,
}: AssessmentFormProps) {
  const router = useRouter();

  const assessment = useAssessment();
  const generateRoadmap = useGenerateRoadmap();
  const saveRoadmap = useSaveRoadmap();

  const [answers, setAnswers] = useState<
    Record<number, string>
  >({});

  const [result, setResult] =
    useState<AIResult | null>(null);

async function handleSubmit() {
  if (!goalId) {
    toast.error(
      "Goal not found. Please start assessment from a goal."
    );
    return;
  }

  if (
    Object.keys(answers).length !==
    QUESTIONS.length
  ) {
    toast.error("Answer all questions.");
    return;
  }

  try {
    const response =
      await assessment.mutateAsync({
        goalId,

        answers: Object.entries(
          answers
        ).map(([id, answer]) => ({
          questionId: Number(id),
          answer,
        })),
      });

    setResult(response);

    toast.success(
      "Assessment completed."
    );

  } catch (error) {
    console.error(error);

    toast.error(
      "Assessment failed."
    );
  }
}

  async function handleGenerateRoadmap() {
    if (!result) return;

    if (!goalId) {
      toast.error(
        "Goal not found. Please start the assessment from a goal."
      );
      return;
    }

    try {
     const roadmap =
  await generateRoadmap.mutateAsync({

    goalId,

    assessment:
      result,

  });

      await saveRoadmap.mutateAsync({
        goalId,
        roadmap,
      });

      toast.success(
        "Roadmap generated successfully."
      );

      router.push("/roadmap");
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to generate roadmap."
      );
    }
  }

  return (
    <div className="space-y-8">
      {QUESTIONS.map((q) => (
        <div
          key={q.id}
          className="space-y-3"
        >
          <h3 className="font-medium">
            {q.question}
          </h3>

          <div className="flex flex-wrap gap-2">
            {q.options.map((option) => (
              <Button
                key={option}
                type="button"
                variant={
                  answers[q.id] === option
                    ? "default"
                    : "outline"
                }
                onClick={() =>
                  setAnswers((prev) => ({
                    ...prev,
                    [q.id]: option,
                  }))
                }
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      ))}

      <Button
        onClick={handleSubmit}
        disabled={assessment.isPending}
      >
        {assessment.isPending
          ? "Analyzing..."
          : "Analyze with AI"}
      </Button>

      {result && (
        <>
          <AssessmentResult
            result={result}
          />

          <Button
            className="w-full"
            size="lg"
            onClick={handleGenerateRoadmap}
            disabled={
              generateRoadmap.isPending ||
              saveRoadmap.isPending
            }
          >
            {generateRoadmap.isPending ||
            saveRoadmap.isPending
              ? "Generating..."
              : "Generate AI Roadmap"}
          </Button>
        </>
      )}
    </div>
  );
}