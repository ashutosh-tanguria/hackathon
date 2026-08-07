import { BookOpen } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center">
      <BookOpen className="mb-4 h-14 w-14 text-muted-foreground" />

      <h2 className="text-2xl font-semibold">
        No Goals Yet
      </h2>

      <p className="mt-2 max-w-sm text-muted-foreground">
        Create your first learning goal and let StudyOS build a personalized AI roadmap.
      </p>
    </div>
  );
}