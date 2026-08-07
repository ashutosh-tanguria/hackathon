"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

import { Progress } from "@/components/ui/progress";

import { useToggleRoadmapNode } from "../hooks";

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  week: number;
  difficulty: string;
  completed: boolean;
}

interface RoadmapListProps {
  nodes: RoadmapNode[];
}

export function RoadmapList({
  nodes,
}: RoadmapListProps) {
  const router = useRouter();

  const toggleNode =
    useToggleRoadmapNode();

  const completed =
    nodes.filter((node) => node.completed)
      .length;

  const progress =
    nodes.length === 0
      ? 0
      : Math.round(
          (completed / nodes.length) * 100
        );

  async function handleToggle(
    nodeId: string
  ) {
    await toggleNode.mutateAsync(nodeId);

    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Progress
          </h2>

          <span className="text-sm font-medium">
            {progress}%
          </span>
        </div>

        <Progress value={progress} />
      </div>

      {nodes.map((node) => (
        <div
          key={node.id}
          className="rounded-xl border p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <button
                onClick={() =>
                  handleToggle(node.id)
                }
                disabled={
                  toggleNode.isPending
                }
                className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full border transition ${
                  node.completed
                    ? "bg-green-600 text-white"
                    : "hover:bg-muted"
                }`}
              >
                {node.completed && (
                  <Check className="h-4 w-4" />
                )}
              </button>

              <div>
                <h3 className="font-semibold">
                  Week {node.week} •{" "}
                  {node.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {node.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="rounded-md border px-3 py-1 text-xs font-medium">
                {node.difficulty}
              </span>

              <span
                className={`rounded-md px-3 py-1 text-xs font-medium ${
                  node.completed
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {node.completed
                  ? "Completed"
                  : "Pending"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}