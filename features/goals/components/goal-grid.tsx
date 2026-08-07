import { Goal } from "../types";
import { GoalCard } from "./goal-card";
import { EmptyState } from "./empty-state";

interface GoalGridProps {
  goals: Goal[];
}

export function GoalGrid({
  goals,
}: GoalGridProps) {
  if (goals.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
        />
      ))}
    </div>
  );
}