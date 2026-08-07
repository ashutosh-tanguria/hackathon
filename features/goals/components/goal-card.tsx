"use client";

import Link from "next/link";
import { Trash2, Brain } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useDeleteGoal } from "../hooks";
import { Goal } from "../types";

interface GoalCardProps {
  goal: Goal;
}

export function GoalCard({
  goal,
}: GoalCardProps) {
  const deleteGoal = useDeleteGoal();

  async function handleDelete() {
    try {
      await deleteGoal.mutateAsync(goal.id);

      toast.success("Goal deleted successfully.");
    } catch {
      toast.error("Failed to delete goal.");
    }
  }

  return (
    <Card className="transition-all hover:shadow-lg">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              {goal.title}
            </h3>

            <Badge>{goal.category}</Badge>
          </div>

          <Button
            size="icon"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteGoal.isPending}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          {goal.description || "No description"}
        </p>
        <Link href={`/assessment?goalId=${goal.id}`}>
          <Button className="w-full">
            <Brain className="mr-2 h-4 w-4" />
            Start AI Assessment
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}