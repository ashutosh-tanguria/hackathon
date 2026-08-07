"use client";

import { GoalGrid } from "./goal-grid";
import { CreateGoalDialog } from "./create-goal-dialog";

import { useCreateGoal, useGoals } from "../hooks";

export function DashboardGoals() {
  const {
    data: goals = [],
    isLoading,
  } = useGoals();

  const createGoal = useCreateGoal();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <CreateGoalDialog
          onSubmit={async (values) => {
            await createGoal.mutateAsync(values);
          }}
        />
      </div>

      <GoalGrid goals={goals} />
    </div>
  );
}