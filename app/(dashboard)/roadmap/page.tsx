import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

export default async function RoadmapPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Unauthorized
        </h1>
      </div>
    );
  }

  const roadmap = await prisma.roadmap.findFirst({
    where: {
      goal: {
        userId: user.id,
      },
    },
    include: {
      goal: true,
      nodes: {
        orderBy: {
          position: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!roadmap) {
    return (
      <div className="p-6 space-y-2">
        <h1 className="text-3xl font-bold">
          Your Roadmap
        </h1>

        <p className="text-muted-foreground">
          No roadmap has been generated yet.
          Create a goal, complete the AI assessment,
          and generate your roadmap.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          {roadmap.title}
        </h1>

        <p className="text-muted-foreground">
          Goal: {roadmap.goal.title}
        </p>

        <p className="text-sm text-muted-foreground">
          Estimated Duration:{" "}
          {roadmap.estimatedWeeks} weeks
        </p>
      </div>

      <div className="space-y-4">
        {roadmap.nodes.map((node) => (
          <div
            key={node.id}
            className="rounded-lg border p-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Week {node.week}: {node.title}
              </h2>

              <span className="rounded bg-primary/10 px-3 py-1 text-sm">
                {node.difficulty}
              </span>
            </div>

            <p className="mt-2 text-muted-foreground">
              {node.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}