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
  return (
    <div className="space-y-4">
      {nodes.map((node) => (
        <div
          key={node.id}
          className="rounded-xl border bg-card p-5 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                Week {node.week} • {node.title}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {node.description}
              </p>
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