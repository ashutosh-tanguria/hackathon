import { Card, CardContent } from "@/components/ui/card";

interface ReflectionResultProps {
  result: {
    summary: string;
    strengths: string[];
    improvements: string[];
    nextAction: string;
  };
}

export function ReflectionResult({
  result,
}: ReflectionResultProps) {
  return (
    <Card>
      <CardContent className="space-y-6 p-6">

        <div>
          <h2 className="text-2xl font-bold">
            AI Reflection Report
          </h2>

          <p className="mt-3 text-muted-foreground">
            {result.summary}
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold">
            Strengths
          </h3>

          <ul className="list-disc space-y-2 pl-5">
            {result.strengths.map((item) => (
              <li key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-semibold">
            Improvements
          </h3>

          <ul className="list-disc space-y-2 pl-5">
            {result.improvements.map((item) => (
              <li key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border bg-muted p-4">
          <h3 className="font-semibold">
            Recommended Next Step
          </h3>

          <p className="mt-2">
            {result.nextAction}
          </p>
        </div>

      </CardContent>
    </Card>
  );
}