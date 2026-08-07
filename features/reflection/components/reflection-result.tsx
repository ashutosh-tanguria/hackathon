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
          <h2 className="mb-2 text-xl font-semibold">
            AI Summary
          </h2>

          <p className="text-muted-foreground">
            {result.summary}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">
            Strengths
          </h2>

          <ul className="list-disc space-y-1 pl-5">
            {result.strengths.map(
              (item) => (
                <li key={item}>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">
            Improvements
          </h2>

          <ul className="list-disc space-y-1 pl-5">
            {result.improvements.map(
              (item) => (
                <li key={item}>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="mb-2 text-lg font-semibold">
            Next Action
          </h2>

          <p>
            {result.nextAction}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}