import { getReflections } from "../actions";
import type { ReflectionSession } from "@prisma/client";
export async function ReflectionHistory() {
  const reflections = await getReflections();

  if (reflections.length === 0) {
    return (
      <div className="rounded-xl border p-6">
        <h2 className="text-xl font-semibold">
          Reflection History
        </h2>

        <p className="mt-2 text-muted-foreground">
          No reflections yet. Complete your first reflection to start tracking your learning journey.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">
        Reflection History
      </h2>

      {reflections.map((reflection: ReflectionSession) => {
        let feedback: {
          strengths?: string[];
          improvements?: string[];
          nextAction?: string;
        } | null = null;

        if (reflection.aiFeedback) {
          try {
            feedback = JSON.parse(reflection.aiFeedback);
          } catch {
            feedback = null;
          }
        }

        return (
          <div
            key={reflection.id}
            className="rounded-xl border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {new Date(
                  reflection.createdAt
                ).toLocaleDateString()}
              </h3>

              <span className="text-sm text-muted-foreground">
                {new Date(
                  reflection.createdAt
                ).toLocaleTimeString()}
              </span>
            </div>

            <p className="mt-4">
              {reflection.summary}
            </p>

            {feedback?.nextAction && (
              <div className="mt-5 rounded-lg bg-muted p-4">
                <p className="font-medium">
                  Next Action
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {feedback.nextAction}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}