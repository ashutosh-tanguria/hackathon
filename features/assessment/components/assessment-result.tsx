"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AssessmentResultProps {
  result: {
    level: string;
    strengths: string[];
    weaknesses: string[];
  };
}

export function AssessmentResult({
  result,
}: AssessmentResultProps) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          AI Assessment Result

          <Badge>{result.level}</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="mb-2 font-semibold">
            Strengths
          </h3>

          <ul className="list-disc space-y-1 pl-5">
            {result.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-semibold">
            Weaknesses
          </h3>

          <ul className="list-disc space-y-1 pl-5">
            {result.weaknesses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}