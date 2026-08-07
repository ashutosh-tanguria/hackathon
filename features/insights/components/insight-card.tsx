import { Sparkles } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { generateInsight } from "../actions";

export async function InsightCard() {
  const insight =
    await generateInsight();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />

          {insight.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="leading-7">
          {insight.insight}
        </p>

        <div className="mt-4 inline-flex rounded-full border px-3 py-1 text-xs">
          Priority: {insight.priority}
        </div>
      </CardContent>
    </Card>
  );
}