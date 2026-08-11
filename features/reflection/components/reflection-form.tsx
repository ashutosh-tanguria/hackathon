"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  useReflection,
} from "../hooks";

import { ReflectionResult } from "./reflection-result";


interface ReflectionResponse {
  summary: string;
  strengths: string[];
  improvements: string[];
  nextAction: string;
}


interface ReflectionFormProps {
  goalId?: string;
}


export function ReflectionForm({
  goalId,
}: ReflectionFormProps) {

  const reflection =
    useReflection();


  const [text, setText] =
    useState("");


  const [result, setResult] =
    useState<ReflectionResponse | null>(
      null
    );



  async function handleAnalyze() {

    if (!goalId) {

      toast.error(
        "Goal not found. Start reflection from a goal."
      );

      return;

    }



    if (!text.trim()) {

      toast.error(
        "Please write your reflection."
      );

      return;

    }



    try {

      const response =
        await reflection.mutateAsync({

          goalId,

          reflection:
            text,

        });



      setResult(response);


      setText("");


      toast.success(
        "Reflection analyzed successfully."
      );


    } catch (error) {

      console.error(error);


      toast.error(
        "Failed to analyze reflection."
      );

    }

  }



  return (

    <div className="space-y-6">

      <Textarea

        rows={10}

        placeholder="Write what you studied today, what you understood, where you struggled, and how confident you feel..."

        value={text}

        onChange={(e) =>
          setText(
            e.target.value
          )
        }

      />


      <Button

        className="w-full"

        onClick={handleAnalyze}

        disabled={
          reflection.isPending
        }

      >

        {reflection.isPending
          ? "Analyzing..."
          : "Analyze Reflection"}

      </Button>



      {result && (

        <ReflectionResult

          result={result}

        />

      )}


    </div>

  );

}