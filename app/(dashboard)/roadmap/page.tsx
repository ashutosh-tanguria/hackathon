import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import { RoadmapList } from "@/features/roadmap/components/roadmap-list";

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

      <RoadmapList
  nodes={roadmap.nodes}
/>
    </div>
  );
}